import { useQuery } from "@tanstack/react-query";
import { instance } from "@/api/instance";
import { AxiosResponse } from "axios";
import { InstanceListResponse } from "@/type/response/_instance";
import { SimulationIdField } from "@/type/_field";

/**
 * @description 인스턴스 목록 조회 쿼리
 */
export const useGetInstanceList = (simulationId: SimulationIdField) => {
  return useQuery<AxiosResponse<InstanceListResponse>>({
    queryKey: ["instanceList", simulationId],
    queryFn: () => instance.getInstanceList(simulationId),
  });
};
