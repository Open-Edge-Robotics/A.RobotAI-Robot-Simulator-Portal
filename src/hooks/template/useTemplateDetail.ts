import { useQuery } from "@tanstack/react-query";

import { templateAPI } from "@/apis/template";

import { QUERY_KEYS } from "@/constants/api";

// 아직 서버 api 없음
export function useTemplateDetail(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.template.byId(id),
    queryFn: () => templateAPI.getMockTemplate(id),
  });
}
