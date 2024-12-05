import { simulation } from "@/api/simulation";
import { SimulationListResponse } from "@/type/response/_simulation";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

/**
 * @description 시뮬레이션 목록 조회 쿼리
 */
export const useGetSimulationList = () => {
  return useQuery<AxiosResponse<SimulationListResponse>>({
    queryKey: ["simulationList"],
    queryFn: () => simulation.getSimulationList(),
  });
};
