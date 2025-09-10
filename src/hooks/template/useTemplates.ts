import { useQuery } from "@tanstack/react-query";

import { templateAPI } from "@/apis/template";

import { QUERY_KEYS } from "@/constants/api";

export function useTemplates() {
  return useQuery({
    queryKey: QUERY_KEYS.template.all,
    queryFn: () => templateAPI.getMockTemplates(),
  });
}
