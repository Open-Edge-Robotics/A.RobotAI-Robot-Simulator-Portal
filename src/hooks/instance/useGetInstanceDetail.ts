import { useQuery } from "@tanstack/react-query";
import { instance } from "@/api/instance";
import { InstanceIdField } from "@/type/_field";

/**
 * @description 인스턴스 상세 조회 쿼리
 */
export const useGetInstanceDetail = (
  request: InstanceIdField,
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
