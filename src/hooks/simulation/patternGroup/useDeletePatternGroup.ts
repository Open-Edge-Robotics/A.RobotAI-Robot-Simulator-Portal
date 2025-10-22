import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { simulationAPI } from "@/apis/simulation";

import { QUERY_KEYS } from "@/constants/api";

import type { DeletePatternGroupRequest } from "@/types/simulation/api";

import { successToast } from "@/utils/common/toast";

interface UseDeletePatternGroupOptions {
  onSuccessCallback?: () => void;
}

export function useDeletePatternGroup(simulationId: number, options?: UseDeletePatternGroupOptions) {
  const queryClient = useQueryClient();
  const { onSuccessCallback } = options || {};
  const [deletingGroupId, setDeletingGroupId] = useState<number | null>(null);

  const mutation = useMutation({
    mutationFn: (data: DeletePatternGroupRequest) => {
      // 삭제 시작 시 해당 그룹 ID 설정
      const groupId = "step" in data ? data.step.stepOrder : data.group.groupId;
      setDeletingGroupId(groupId);

      return simulationAPI.deletePatternGroup(simulationId, data);
      // return simulationAPI.deleteMockPatternGroup(simulationId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.simulation.all });
      successToast("패턴 그룹을 삭제했습니다.");
      onSuccessCallback?.();
    },
    onSettled: () => {
      // 성공/실패 관계없이 삭제 상태 리셋
      setDeletingGroupId(null);
    },
  });

  return {
    ...mutation,
    isDeleting: (groupId: number) => deletingGroupId === groupId,
  };
}
