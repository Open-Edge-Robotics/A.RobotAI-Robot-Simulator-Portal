import { template } from "@/api/template";
import { TemplateListResponse } from "@/type/response/_template";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useGetTemplateList = (options?: { enabled?: boolean }) => {
  return useQuery<AxiosResponse<TemplateListResponse>>({
    queryKey: ["templateList"],
    queryFn: () => template.getTemplateList(),
    ...options,
  });
};
