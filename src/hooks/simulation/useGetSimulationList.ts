import { simulation } from "@/api/simulation";
import { useQuery } from "@tanstack/react-query";

/**
 * @description 시뮬레이션 목록 조회 쿼리
 */
export const useGetSimulationList = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["simulationList"],
    queryFn: () => simulation.getSimulationList(),
    ...options,
  });
};
