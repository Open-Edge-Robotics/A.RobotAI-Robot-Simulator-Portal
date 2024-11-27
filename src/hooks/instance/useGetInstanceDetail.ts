import { useQuery } from "@tanstack/react-query";
import { instance } from "@/api/instance";
import { InstanceIdField } from "@/type/_field";
import { AxiosResponse } from "axios";
import { InstanceDetailResponse } from "@/type/response/_instance";

/**
 * @description 인스턴스 상세 조회 쿼리
 */
export const useGetInstanceDetail = (
  request: InstanceIdField,
  options?: {
    enabled?: boolean;
  },
) => {
  return useQuery<AxiosResponse<InstanceDetailResponse>>({
    queryKey: ["instanceDetail", request.instanceId],
    queryFn: () => instance.getInstanceDetail(request),
    ...options,
  });
};
