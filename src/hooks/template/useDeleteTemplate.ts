import { template } from "@/api/template";
import { TemplateIdField } from "@/type/_field";
import { Result } from "@/type/response/_default";
import { TemplateDeleteResponse } from "@/type/response/_template";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

/**
 * @description 템플릿 삭제 쿼리
 */
export const useDeleteTemplate = () => {
  return useMutation<
    Result<TemplateDeleteResponse>,
    AxiosError<Result<null>>,
    TemplateIdField
  >({
    mutationFn: (request: TemplateIdField) => template.deleteTemplate(request),
  });
};
