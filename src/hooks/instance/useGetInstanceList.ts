import { useQuery } from "@tanstack/react-query";
import { instance } from "@/api/instance";
import { AxiosResponse } from "axios";
import { InstanceListResponse } from "@/type/response/_instance";
import { GetInstanceListRequest } from "@/type/request/_instance";

/**
 * @description 인스턴스 목록 조회 쿼리
 */
export const useGetInstanceList = (simulationId: GetInstanceListRequest) => {
  return useQuery<AxiosResponse<InstanceListResponse>>({
    queryKey: ["instanceList", simulationId ?? simulationId],
    queryFn: () => instance.getInstanceList(simulationId),
  });
};
