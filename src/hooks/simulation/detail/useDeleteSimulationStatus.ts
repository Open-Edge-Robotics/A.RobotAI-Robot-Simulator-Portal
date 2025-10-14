import { useQuery } from "@tanstack/react-query";

import { simulationAPI } from "@/apis/simulation";

import { QUERY_KEYS } from "@/constants/api";
import { SIMULATION_REFETCH_INTERVAL_SHORT } from "@/constants/simulation";

export function useDeleteSimulationStatus(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.simulation.bySimulationId(id, "deletion"),
    queryFn: () => simulationAPI.getSimulationDeletionStatus(id),
    refetchInterval: (query) => {
      const data = query.state.data;

      if (query.state.error) return false;

      // 데이터가 없으면 polling 계속
      if (!data) return SIMULATION_REFETCH_INTERVAL_SHORT;

      const status = data.data.status;

      // COMPLETED, FAILED 상태면 polling 중지
      if (status === "COMPLETED" || status === "FAILED") {
        return false;
      }

      // PENDING, RUNNING 상태면 지정한 간격으로 polling
      return SIMULATION_REFETCH_INTERVAL_SHORT;
    },
    retry: (failureCount) => {
      // 2회까지 재시도
      return failureCount < 2;
    },
  });
}
