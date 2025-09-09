import { useMutation, useQueryClient } from "@tanstack/react-query";

import { simulationAPI } from "@/apis/simulation";

import { QUERY_KEYS } from "@/constants/api";

import { successToast } from "@/utils/toast";

export function useStopSimulation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => simulationAPI.stopSimulation(id),
    onSuccess: () => {
      successToast("시뮬레이션을 중지했습니다.");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.simulation.all });
    },
  });
}
