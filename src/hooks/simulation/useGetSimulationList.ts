import { simulation } from "@/api/simulation";
import { SimulationListResponse } from "@/type/response/_simulation";
import { useQuery } from "@tanstack/react-query";

/**
 * @description 시뮬레이션 목록 조회 쿼리
 */
export const useGetSimulationList = () => {
  return useQuery<SimulationListResponse>({
    queryKey: ["simulationList"],
    queryFn: () => simulation.getSimulationList(),
  });
};
