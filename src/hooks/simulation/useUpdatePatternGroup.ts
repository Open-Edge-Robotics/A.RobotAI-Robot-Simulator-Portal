import { useMutation, useQueryClient } from "@tanstack/react-query";

import { simulationAPI } from "@/apis/simulation";

import { QUERY_KEYS } from "@/constants/api";

import type { UpdatePatternGroupRequest } from "@/types/simulation/api";

import { successToast } from "@/utils/toast";

interface UseUpdatePatternGroupOptions {
  onSuccessCallback?: () => void;
}

export function useUpdatePatternGroup(simulationId: number, options?: UseUpdatePatternGroupOptions) {
  const queryClient = useQueryClient();
  const { onSuccessCallback } = options || {};

  return useMutation({
    mutationFn: (newPatternGroup: UpdatePatternGroupRequest) => {
      return simulationAPI.updatePatternGroup(simulationId, newPatternGroup);
      // return simulationAPI.updateMockPatternGroup(simulationId, newPatternGroup);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.simulation.all });
      successToast("패턴그룹을 수정했습니다.");
      onSuccessCallback?.();
    },
  });
}
