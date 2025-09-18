import { useQuery } from "@tanstack/react-query";

import { simulationAPI } from "@/apis/simulation";

import { QUERY_KEYS } from "@/constants/api";
import { SIMULATION_STATUS_REFETCH_INTERVAL_MS } from "@/constants/simulation";

export function useDeleteSimulationStatus(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.simulation.byId(id, "deletion"),
    queryFn: () => simulationAPI.getSimulationDeletionStatus(id),
    refetchInterval: (query) => {
      const data = query.state.data;

      if (query.state.error) return false;

      // 데이터가 없으면 polling 계속
      if (!data) return SIMULATION_STATUS_REFETCH_INTERVAL_MS;

      const status = data.data.status;

      // SUCCESS, FAILED 상태면 polling 중지
      if (status === "SUCCESS" || status === "FAILED") {
        return false;
      }

      // PENDING, RUNNING 상태면 지정한 간격으로 polling
      return SIMULATION_STATUS_REFETCH_INTERVAL_MS;
    },
    retry: (failureCount) => {
      // 2회까지 재시도
      return failureCount < 2;
    },
  });
}
