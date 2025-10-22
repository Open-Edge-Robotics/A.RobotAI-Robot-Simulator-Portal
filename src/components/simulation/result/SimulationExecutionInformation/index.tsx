import Container from "@/components/common/Container.tsx";
import { CustomVerticalLabeledValue } from "@/components/common/LabeledValue";
import Title from "@/components/common/Title";

import type { GetExecutionRecordResponse } from "@/types/simulation/executionRecord";

import { executionPlanToGroupDetail } from "@/utils/simulation/mappers";

import GroupDetailConfiguration from "../../detail/SimulationStaticInformation/GroupDetailConfiguration";

interface SimulationExecutionInformationProps {
  result: GetExecutionRecordResponse["execution"];
}

export default function SimulationExecutionInformation({ result }: SimulationExecutionInformationProps) {
  const executionPlanInformation = executionPlanToGroupDetail(result);

  return (
    <Container className="p-6">
      <Title fontSize="text-xl" margin="mb-4">
        시뮬레이션 실행 정보
      </Title>
      <div className="mb-6 grid grid-cols-2 gap-6 lg:grid-cols-4">
        <CustomVerticalLabeledValue label="시뮬레이션 ID" value={result.simulationId.toString()} />
        <CustomVerticalLabeledValue label="실행 ID" value={result.executionId.toString()} />
        <CustomVerticalLabeledValue label="패턴 타입" value={result.patternType} />
      </div>
      <GroupDetailConfiguration
        executionPlan={executionPlanInformation}
        patternType={result.patternType}
        isGlobalEditMode={false}
      />
    </Container>
  );
}
