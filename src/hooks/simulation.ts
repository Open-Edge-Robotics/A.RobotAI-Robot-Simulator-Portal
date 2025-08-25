import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { simulationAPI } from "@/apis/simulation";
import { QUERY_KEYS } from "@/constants/api";
import type { SimulationActionHandler } from "@/types/simulation/domain";
import { successToast, warnToast } from "@/utils/toast";

export function useSimulationActions(): {
  actionHandlers: SimulationActionHandler[];
  isLoading: boolean;
} {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // 각 액션별 mutation 정의
  const startMutation = useMutation({
    mutationFn: (id: number) => simulationAPI.startSimulation(id),
    onSuccess: () => {
      successToast("시뮬레이션을 시작했습니다.");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.simulation });
    },
  });

  const stopMutation = useMutation({
    mutationFn: (id: number) => simulationAPI.stopSimulation(id),
    onSuccess: () => {
      successToast("시뮬레이션을 정지했습니다.");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.simulation });
    },
    onMutate: () => {
      warnToast("개발 중입니다.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => simulationAPI.deleteSimulation(id),
    onSuccess: () => {
      successToast("시뮬레이션을 삭제했습니다.");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.simulation });
    },
    onMutate: () => {
      warnToast("개발 중입니다.");
    },
  });

  const isLoading = [startMutation.isPending, stopMutation.isPending, deleteMutation.isPending].some(Boolean);

  // 액션 핸들러들을 배열로 반환
  const actionHandlers: SimulationActionHandler[] = [
    { type: "start", handler: (id: number) => startMutation.mutate(id) },
    { type: "stop", handler: (id: number) => stopMutation.mutate(id) },
    { type: "delete", handler: (id: number) => deleteMutation.mutate(id) },
    { type: "view", handler: (id: number) => navigate(`/simulation/${id}`) },
  ];

  return {
    actionHandlers,
    isLoading,
  };
}
