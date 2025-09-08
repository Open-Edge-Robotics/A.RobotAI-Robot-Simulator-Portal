import { useMutation, useQueryClient } from "@tanstack/react-query";

import { simulationAPI } from "@/apis/simulation";

import { QUERY_KEYS } from "@/constants/api";

import { errorToast, successToast } from "@/utils/toast";

export function useStopSimulation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => simulationAPI.stopMockSimulation(id),
    onSuccess: () => {
      successToast("시뮬레이션을 중지했습니다.");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.simulation.all });
    },

    onError: (e: { response: object }) => {
      errorToast("시뮬레이션을 중지하지 못했습니다.");
      console.log(e.response);
    },
  });
}
