import { useQuery } from "@tanstack/react-query";
import { instance } from "@/api/instance";
import { InstanceIdParam } from "@/type/request/_instance";

/**
 * @description 인스턴스 상세 조회 쿼리
 */
export const useGetInstanceDetail = (
  request: InstanceIdParam,
  options?: {
    enabled?: boolean;
  },
) => {
  return useQuery({
    queryKey: ["instanceDetail"],
    queryFn: () => instance.getInstanceDetail(request),
    ...options,
  });
};
