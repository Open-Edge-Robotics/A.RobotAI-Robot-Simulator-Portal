import { instance } from "@/api/instance";
import { InstanceListStatusCheckPostRequest } from "@/type/request/_instance";
import { InstanceListStatusCheckPostResponse } from "@/type/response/_instance";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

/**
 * @description 인스턴스 목록 실행 상태 조회 쿼리
 */
export const usePostInstanceListStatusCheck = (
  request: InstanceListStatusCheckPostRequest,
  options?: {
    enabled: boolean;
  },
) => {
  return useQuery<AxiosResponse<InstanceListStatusCheckPostResponse>>({
    queryKey: ["instanceStatus", request.instanceIds],
    queryFn: () => instance.postInstanceListStatusCheck(request),
    ...options,
  });
};
