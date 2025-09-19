import { useMutation, useQueryClient } from "@tanstack/react-query";

import { templateAPI } from "@/apis/template";

import { QUERY_KEYS } from "@/constants/api";

import { successToast } from "@/utils/common/toast";

export function useDeleteTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => templateAPI.deleteMockTemplate(id),
    onSuccess: () => {
      successToast("템플릿을 삭제했습니다.");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.template.all });
    },
  });
}
