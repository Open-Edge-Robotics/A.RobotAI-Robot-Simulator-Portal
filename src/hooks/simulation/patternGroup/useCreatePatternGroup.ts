import { useMutation, useQueryClient } from "@tanstack/react-query";

import { simulationAPI } from "@/apis/simulation";

import { QUERY_KEYS } from "@/constants/api";

import type { CreatePatternGroupRequest } from "@/types/simulation/api";

import { successToast } from "@/utils/toast";

interface UseCreatePatternGroupOptions {
  onSuccessCallback?: () => void;
}

export function useCreatePatternGroup(simulationId: number, options?: UseCreatePatternGroupOptions) {
  const queryClient = useQueryClient();
  const { onSuccessCallback } = options || {};

  return useMutation({
    mutationFn: (newPatternGroup: CreatePatternGroupRequest) => {
      return simulationAPI.createPatternGroup(simulationId, newPatternGroup);
      // return simulationAPI.createMockPatternGroup(simulationId, newPatternGroup);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.simulation.all });
      successToast("패턴그룹을 추가했습니다.");
      onSuccessCallback?.();
    },
  });
}
