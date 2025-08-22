import StatusBadge from "@/components/common/Badge/StatusBadge";
import Container from "@/components/common/Container.tsx";
import LabeledValue from "@/components/common/LabeledValue";
import Title from "@/components/common/Title";

import { PATTERN_CONFIG } from "../simulation/constants";

import type { SimulationDetailData } from "./SimulationDetail";

interface SimulationInformationProps {
  simulation: SimulationDetailData;
}

export default function SimulationInformation({ simulation }: SimulationInformationProps) {
  return (
    <Container padding="p-6" shadow grow>
      <Title title="시뮬레이션 정보" fontSize="text-xl" fontWeight="font-medium" margin="mb-2.5" />
      <div className="space-y-2">
        <LabeledValue label="상태:" justifyContent="justify-between">
          <StatusBadge status={simulation.status} />
        </LabeledValue>
        <LabeledValue
          label="패턴 유형:"
          value={PATTERN_CONFIG[simulation.patternType].title}
          justifyContent="justify-between"
        />
        <LabeledValue
          label="총 실행 시간:"
          value={`${simulation.totalExecutionTime}초`}
          justifyContent="justify-between"
        />
        <LabeledValue
          label="자율행동체 수:"
          value={`${simulation.agentCount.toString()}대`}
          justifyContent="justify-between"
        />
      </div>
    </Container>
  );
}
