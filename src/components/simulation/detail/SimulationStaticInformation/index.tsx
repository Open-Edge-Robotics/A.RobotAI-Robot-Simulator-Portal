import { Button } from "innogrid-ui";

import StatusBadge from "@/components/common/Badge/StatusBadge";
import Container from "@/components/common/Container.tsx";
import Divider from "@/components/common/Divider";
import Title from "@/components/common/Title";

import { SIMULATION_ACTION_TYPES } from "@/constants/simulation";

import { useSimulationActions } from "@/hooks/simulation/detail/useSimulationActions";

import type { GetSimulationStaticResult } from "@/types/simulation/api";
import type { SimulationActionHandler, SimulationActionType } from "@/types/simulation/domain";

import { getAllowedActions, getExecutionOverview } from "@/utils/simulation/data";
import { executionPlanToGroupDetail } from "@/utils/simulation/mappers";

import ExecutionConfiguration from "./ExecutionConfiguration";
import GroupDetailConfiguration from "./GroupDetailConfiguration";
import SimulationInformation from "./SimulationInformation";
import ActionButtons from "../../SimulationActionButtons";

interface SimulationSpecificationProps {
  simulation: GetSimulationStaticResult;
  editMode: boolean;
  toggleEditMode: () => void;
}

export default function SimulationStaticInformation({
  simulation,
  editMode,
  toggleEditMode,
}: SimulationSpecificationProps) {
  const { actionHandlers, loadingStates } = useSimulationActions();

  const executionOverviewInformation = getExecutionOverview(simulation);
  const executionPlanInformation = executionPlanToGroupDetail(simulation);

  return (
    <Container className="p-6">
      <Header
        simulation={simulation}
        actionHandlers={actionHandlers}
        loadingStates={loadingStates}
        editMode={editMode}
        toggleEditMode={toggleEditMode}
      />

      {/* 시뮬레이션 기본 정보 */}
      <SimulationInformation
        id={simulation.simulationId}
        namespace={simulation.namespace}
        mecId={simulation.mecId}
        createdAt={simulation.createdAt}
      />

      {/* 실행 설정 정보 */}
      <ExecutionConfiguration executionInformation={executionOverviewInformation} />

      <Divider className="my-6" />

      {/* 그룹별 설정 정보 */}
      <GroupDetailConfiguration
        executionPlan={executionPlanInformation}
        patternType={simulation.patternType}
        isGlobalEditMode={editMode}
      />
    </Container>
  );
}

interface HeaderProps {
  simulation: GetSimulationStaticResult;
  actionHandlers: SimulationActionHandler[];
  loadingStates: Record<SimulationActionType, boolean>;
  editMode: boolean;
  toggleEditMode: () => void;
}

function Header({ simulation, actionHandlers, loadingStates, editMode, toggleEditMode }: HeaderProps) {
  const actions = SIMULATION_ACTION_TYPES.filter((action) => action !== "edit");
  const allowedActions = getAllowedActions(simulation.currentStatus.status, "detail");

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
      <div className="flex items-center gap-3">
        {!editMode && (
          <ActionButtons
            actions={actions} // 타입 에러 해결하기 위해 readonly 타입 mutable로 변경
            disableButton={(actionType) => !allowedActions.includes(actionType)}
            simulationId={simulation.simulationId}
            actionHandlers={actionHandlers}
            loadingStates={loadingStates}
          />
        )}
        <Button color="tertiary" onClick={toggleEditMode} disabled={!allowedActions.includes("edit")}>
          {editMode ? "편집 종료" : "편집 모드"}
        </Button>
      </div>
    </div>
  );
}
