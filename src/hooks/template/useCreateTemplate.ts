import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { templateAPI } from "@/apis/template";

import { QUERY_KEYS } from "@/constants/api";
import { SEGMENTS } from "@/constants/navigation";

import type { CreateTemplateRequest } from "@/types/template/api";

import { successToast } from "@/utils/common/toast";

export function useCreateTemplate() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (newTemplate: CreateTemplateRequest) => {
      return templateAPI.createTemplate(newTemplate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.template.all });
      successToast("템플릿을 생성했습니다.");
      navigate(SEGMENTS.absolute.template);
    },
  });
}
