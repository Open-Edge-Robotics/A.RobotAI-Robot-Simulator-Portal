import { useReducer } from "react";

import Container from "@/components/common/Container.tsx";
import InformationFallback from "@/components/common/Fallback/InformationFallback";
import Title from "@/components/common/Title";

import { PATTERN_CONFIGS } from "@/constants/simulation";

import type { PatternType } from "@/types/simulation/domain";
import type { GroupDetail } from "@/types/simulation/simulationDetail";

import type { GetStatusResponseFinal } from "@/types/simulation/status";

import { formatDateTime } from "@/utils/formatting";

import GroupBody from "./GroupBody";
import GroupHeader from "./GroupHeader";

interface StepMonitoringProps {
  result: GetStatusResponseFinal;
}

export default function StepMonitoring({ result }: StepMonitoringProps) {
  const unit = PATTERN_CONFIGS[result.patternType].unit;

  if (result.currentStatus.status === "INITIATING" || result.currentStatus.status === "PENDING") {
    return (
      <Container className="p-6">
        <StepMonitoringTitle unit={unit} />
        <InformationFallback
          message={result.currentStatus.message}
          subMessage={`마지막 업데이트: ${formatDateTime(result.currentStatus.timestamps.lastUpdated)}`}
          removeBorder
        />
      </Container>
    );
  }

  const { patternType, currentStatus } = result;

  return (
    <Container className="p-6">
      <StepMonitoringTitle unit={unit} />
      <div className="space-y-4">
        {patternType === "sequential"
          ? currentStatus.stepDetails.map((step) => (
              <GroupDetailContent
                key={step.stepOrder}
                patternType={patternType}
                id={step.stepOrder}
                group={step}
                lastUpdatedAt={currentStatus.timestamps.lastUpdated}
              />
            ))
          : currentStatus.groupDetails.map((group) => (
              <GroupDetailContent
                key={group.groupId}
                patternType={patternType}
                id={group.groupId}
                group={group}
                lastUpdatedAt={currentStatus.timestamps.lastUpdated}
              />
            ))}
      </div>
    </Container>
  );
}

function StepMonitoringTitle({ unit }: { unit: string }) {
  return <Title title={`${unit}별 진행 상황`} fontSize="text-xl" margin="mb-4" />;
}

interface GroupDetailProps {
  id: number;
  group: GroupDetail;
  lastUpdatedAt: string;
  patternType: PatternType;
}

function GroupDetailContent({ id, group, lastUpdatedAt, patternType }: GroupDetailProps) {
  const [isOpen, toggleCard] = useReducer((x) => !x, false);

  return (
    <Container className="overflow-hidden" key={id}>
      <GroupHeader id={id} patternType={patternType} group={group} isOpen={isOpen} toggleCard={toggleCard} />
      {isOpen && <GroupBody group={group} lastUpdatedAt={lastUpdatedAt} />}
    </Container>
  );
}
