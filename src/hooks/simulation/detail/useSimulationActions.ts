import { useNavigate } from "react-router-dom";

import type { SimulationActionHandler, SimulationActionType } from "@/types/simulation/domain";

import { useStartSimulation } from "./useStartSimulation";
import { useStopSimulation } from "./useStopSimulation";
import { useDeleteSimulation } from "../core/useDeleteSimulation";

export function useSimulationActions(): {
  actionHandlers: SimulationActionHandler[];
  loadingStates: Record<SimulationActionType, boolean>;
} {
  // 각 액션별 mutation
  const startMutation = useStartSimulation();
  const stopMutation = useStopSimulation();
  const editNavigation = useNavigate();
  const deleteMutation = useDeleteSimulation();

  // 액션 핸들러들을 배열로 반환
  const actionHandlers: SimulationActionHandler[] = [
    { type: "start", handler: (id: number) => startMutation.mutate(id) },
    { type: "stop", handler: (id: number) => stopMutation.mutate(id) },
    { type: "edit", handler: (id: number) => editNavigation(`/simulation/${id}/edit`) },
    {
      type: "delete",
      handler: (id: number) => {
        const confirmed = confirm("정말로 시뮬레이션을 삭제하시겠습니까? 삭제된 시뮬레이션은 복구할 수 없습니다.");
        if (confirmed) {
          return deleteMutation.mutate(id);
        }
      },
    },
  ];

  // 개별 로딩 상태 객체
  const loadingStates = {
    start: startMutation.isPending,
    stop: stopMutation.isPending,
    edit: false, // 편집은 즉시 네비게이션이므로 로딩 없음
    delete: deleteMutation.isPending,
  };

  return {
    actionHandlers,
    loadingStates,
  };
}
