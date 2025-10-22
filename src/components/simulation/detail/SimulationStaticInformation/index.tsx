import { Button } from "innogrid-ui";

import StatusBadge from "@/components/common/Badge/StatusBadge";
import Container from "@/components/common/Container.tsx";
import Divider from "@/components/common/Divider";
import Title from "@/components/common/Title";

import { ALLOWED_ACTIONS_BY_STATUS } from "@/constants/simulation";

import { useDeleteSimulation } from "@/hooks/simulation/core/useDeleteSimulation";
import { useStartSimulation } from "@/hooks/simulation/detail/useStartSimulation";

import type { GetSimulationStaticResponse } from "@/types/simulation/api";

import { getExecutionOverview } from "@/utils/simulation/data";
import { executionPlanToGroupDetail } from "@/utils/simulation/mappers";

import ExecutionConfiguration from "./ExecutionConfiguration";
import GroupDetailConfiguration from "./GroupDetailConfiguration";
import SimulationInformation from "./SimulationInformation";
import { DeleteButton, StartButton } from "../../shared/SimulationActionButtons";

interface SimulationSpecificationProps {
  simulation: GetSimulationStaticResponse;
  editMode: boolean;
  toggleEditMode: () => void;
}

export default function SimulationStaticInformation({
  simulation,
  editMode,
  toggleEditMode,
}: SimulationSpecificationProps) {
  const executionOverviewInformation = getExecutionOverview(simulation);
  const executionPlanInformation = executionPlanToGroupDetail(simulation);

  return (
    <Container className="p-6">
      <Header simulation={simulation} editMode={editMode} toggleEditMode={toggleEditMode} />

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
  simulation: GetSimulationStaticResponse;
  editMode: boolean;
  toggleEditMode: () => void;
}

function Header({ simulation, editMode, toggleEditMode }: HeaderProps) {
  const { mutate: startSimulation, isPending: isStarting } = useStartSimulation();
  const { mutate: deleteSimulation, isPending: isDeleting } = useDeleteSimulation();

  const allowedActions = ALLOWED_ACTIONS_BY_STATUS[simulation.latestExecutionStatus.status];

  return (
    <div className="mb-6 flex items-start justify-between">
      <div>
        {/* 제목 */}
        <div className="mb-2 flex items-center gap-3">
          <Title title={simulation.simulationName} fontSize="text-xl" />
          <StatusBadge status={simulation.latestExecutionStatus.status} />
        </div>
        {/* 설명 */}
        <p className="mb-2.5 text-gray-600">{simulation.simulationDescription}</p>
      </div>

      {/* 액션 버튼들 */}
      <div className="flex items-center gap-3">
        {!editMode && (
          <>
            <StartButton
              isPending={isStarting}
              onClick={() => startSimulation(simulation.simulationId)}
              disabled={!allowedActions.includes("start") || isStarting || isDeleting}
            />
            <DeleteButton
              isPending={isDeleting}
              onClick={() => {
                const isConfirmed = window.confirm("정말로 시뮬레이션을 삭제하시겠습니까?");
                if (isConfirmed) deleteSimulation(simulation.simulationId);
              }}
              disabled={!allowedActions.includes("delete") || isStarting || isDeleting}
            />
          </>
        )}
        <Button
          color="tertiary"
          onClick={toggleEditMode}
          disabled={!allowedActions.includes("edit") || isStarting || isDeleting}
        >
          {editMode ? "편집 종료" : "편집 모드"}
        </Button>
      </div>
    </div>
  );
}
