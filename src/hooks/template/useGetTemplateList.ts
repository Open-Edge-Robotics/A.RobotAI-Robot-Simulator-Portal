import { template } from "@/api/template";
import { useQuery } from "@tanstack/react-query";

export const useGetTemplateList = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["templateList"],
    queryFn: () => template.getTemplateList(),
    ...options,
  });
};
