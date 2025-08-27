import { useMutation, useQueryClient } from "@tanstack/react-query";

import { simulationAPI } from "@/apis/simulation";

import { QUERY_KEYS } from "@/constants/api";

import { successToast, warnToast } from "@/utils/toast";

export function useDeleteSimulation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => simulationAPI.deleteSimulation(id),
    onSuccess: () => {
      successToast("시뮬레이션을 삭제했습니다.");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.simulation });
    },
    onMutate: () => {
      warnToast("개발 중입니다.");
    },
  });
}
