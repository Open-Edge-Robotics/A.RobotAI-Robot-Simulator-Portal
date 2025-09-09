import StatusBadge from "@/components/common/Badge/StatusBadge";
import Container from "@/components/common/Container.tsx";
import Title from "@/components/common/Title";

import { ALLOWED_ACTIONS_BY_STATUS, PATTERN_CONFIGS, SIMULATION_ACTION_TYPES } from "@/constants/simulation";

import { useSimulationActions } from "@/hooks/simulation/useSimulationActions";
import type { GetSimulationStaticResult } from "@/types/simulation/api";

import type { SimulationActionHandler, SimulationActionType } from "@/types/simulation/domain";

import { calculateTotalExecutionTime } from "@/utils/simulation/calculate";

import ExecutionConfiguration from "./ExecutionConfiguration";
import SimulationInformation from "./SimulationInformation";
import ActionButtons from "../../SimulationActionButtons";

interface SimulationSpecificationProps {
  simulation: GetSimulationStaticResult;
}

export default function SimulationStaticInformation({ simulation }: SimulationSpecificationProps) {
  const { actionHandlers, isLoading, loadingStates } = useSimulationActions();

  const executionInformation = getExecutionInformationByPatternType(simulation);

  return (
    <Container className="p-6">
      <Header
        simulation={simulation}
        actionHandlers={actionHandlers}
        isLoading={isLoading}
        loadingStates={loadingStates}
      />

      {/* 시뮬레이션 기본 정보 */}
      <SimulationInformation
        id={simulation.simulationId}
        namespace={simulation.namespace}
        mecId={simulation.mecId}
        createdAt={simulation.createdAt}
      />

      {/* 실행 설정 정보 */}
      <ExecutionConfiguration executionInformation={executionInformation} />
    </Container>
  );
}

interface HeaderProps {
  simulation: GetSimulationStaticResult;
  actionHandlers: SimulationActionHandler[];
  isLoading: boolean;
  loadingStates: Record<SimulationActionType, boolean>;
}

function Header({ simulation, actionHandlers, isLoading, loadingStates }: HeaderProps) {
  const allowedActions = ALLOWED_ACTIONS_BY_STATUS[simulation.currentStatus.status];

  return (
    <div className="mb-6 flex items-start justify-between">
      <div>
        {/* 제목 */}
        <div className="mb-2 flex items-center gap-3">
          <Title title={simulation.simulationName} fontSize="text-xl" />
          <StatusBadge status={simulation.currentStatus.status} />
        </div>
        {/* 설명 */}
        <p className="mb-2.5 text-gray-600">{simulation.simulationDescription}</p>
      </div>

      {/* 액션 버튼들 */}
      <ActionButtons
        actions={[...SIMULATION_ACTION_TYPES]} // 타입 에러 해결하기 위해 readonly 타입 mutable로 변경
        disableButton={(actionType) => !allowedActions.includes(actionType)}
        simulationId={simulation.simulationId}
        actionHandlers={actionHandlers}
        isLoading={isLoading}
        loadingStates={loadingStates}
      />
    </div>
  );
}

const getExecutionInformationByPatternType = (simulation: GetSimulationStaticResult) => {
  switch (simulation.patternType) {
    case "sequential":
      return {
        pattern: PATTERN_CONFIGS[simulation.patternType].title,
        totalGroups: simulation.executionPlan.steps.length,
        totalAgent: simulation.executionPlan.steps.reduce((acc, step) => acc + step.autonomousAgentCount, 0),
        totalExecutionTime: calculateTotalExecutionTime({
          type: "sequential",
          agentGroups: simulation.executionPlan.steps,
        }),
      };
    case "parallel":
      return {
        pattern: PATTERN_CONFIGS[simulation.patternType].title,
        totalGroups: simulation.executionPlan.groups.length,
        totalAgent: simulation.executionPlan.groups.reduce((acc, group) => acc + group.autonomousAgentCount, 0),
        totalExecutionTime: calculateTotalExecutionTime({
          type: "parallel",
          agentGroups: simulation.executionPlan.groups,
        }),
      };
    default:
      throw new Error("Unknown pattern type");
  }
};
