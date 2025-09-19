import { useMutation, useQueryClient } from "@tanstack/react-query";

import { simulationAPI } from "@/apis/simulation";

import { QUERY_KEYS } from "@/constants/api";

import { successToast } from "@/utils/common/toast";

export function useDeleteSimulation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => simulationAPI.deleteSimulation(id),
    onSuccess: () => {
      successToast("시뮬레이션 삭제를 진행합니다.");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.simulation.all });
    },
  });
}
