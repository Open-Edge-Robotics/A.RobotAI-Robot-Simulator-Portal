import { useMutation, useQueryClient } from "@tanstack/react-query";

import { simulationAPI } from "@/apis/simulation";

import { QUERY_KEYS } from "@/constants/api";

import { successToast } from "@/utils/common/toast";

export function useStartSimulation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => simulationAPI.startSimulation(id),
    onSuccess: () => {
      successToast("시뮬레이션을 시작했습니다.");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.simulation.all });
    },
  });
}
