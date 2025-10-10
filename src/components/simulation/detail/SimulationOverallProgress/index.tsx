import StatusBadge from "@/components/common/Badge/StatusBadge";
import Container from "@/components/common/Container.tsx";
import Divider from "@/components/common/Divider";
import InformationFallback from "@/components/common/Fallback/InformationFallback";
import Title from "@/components/common/Title";

import { useStopSimulation } from "@/hooks/simulation/detail/useStopSimulation";

import type { SimulationStatus } from "@/types/simulation/domain";
import type { GetStatusResponse } from "@/types/simulation/statusResult";

import { formatDateTime } from "@/utils/common/formatting";

import ProgressIndicator from "./ProgressIndicator";
import ProgressOverview from "./ProgressOverview";
import TimeInformation from "./TimeInformation";
import { StopButton } from "../../SimulationActionButtons";

interface SimulationOverallProgressProps {
  result: GetStatusResponse["execution"];
}

export default function SimulationOverallProgress({ result }: SimulationOverallProgressProps) {
  if (result.currentStatus.status === "INITIATING") {
    return (
      <Container className="p-6">
        <SimulationOverallProgressHeader
          simulationId={result.simulationId}
          status={result.currentStatus.status}
          message={result.currentStatus.message}
          executionId={result.executionId}
        />
        <InformationFallback
          message={result.currentStatus.message}
          subMessage={`마지막 업데이트: ${formatDateTime(result.currentStatus.timestamps.lastUpdated)}`}
          removeBorder
        />
      </Container>
    );
  }

  const progressData =
    result.patternType === "sequential"
      ? {
          patternType: "sequential" as const,
          progress: result.currentStatus.progress,
        }
      : {
          patternType: "parallel" as const,
          progress: result.currentStatus.progress,
        };

  return (
    <Container className="p-6">
      <SimulationOverallProgressHeader
        simulationId={result.simulationId}
        executionId={result.executionId}
        status={result.currentStatus.status}
        message={result.currentStatus.message}
      />

      {/* 진행 상황 개요 */}
      <ProgressOverview progressData={progressData} />

      {/* 진행률 바 */}
      <ProgressIndicator progressData={progressData} status={result.currentStatus.status} />

      <Divider className="my-6" />

      {/* 실행 시간 정보 */}
      <TimeInformation status={result.currentStatus.status} timestamps={result.currentStatus.timestamps} />
    </Container>
  );
}

interface SimulationOverallProgressHeaderProps {
  simulationId: number;
  status: SimulationStatus;
  message?: string;
  executionId: number;
}

function SimulationOverallProgressHeader({
  simulationId,
  status,
  message,
  executionId,
}: SimulationOverallProgressHeaderProps) {
  const { mutate, isPending } = useStopSimulation();

  return (
    <Title fontSize="text-xl" margin="mb-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span>전체 진행 상황</span>
            <StatusBadge status={status} />
          </div>
          <span className="text-sm font-medium text-gray-600">{message}</span>
        </div>
        {status === "RUNNING" && (
          <StopButton
            onClick={() => mutate({ simulationId, executionId })}
            disabled={isPending}
            isPending={isPending}
          />
        )}
      </div>
    </Title>
  );
}
