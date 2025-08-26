import { useQuery } from "@tanstack/react-query";

import { dashboardAPI } from "@/apis/dashboard";
import { QUERY_KEYS } from "@/constants/api";

const REFETCH_INTERVAL_MS = 60000; // 1분

export function useSimulationSimple(selectedSimulationId: number) {
  return useQuery({
    queryKey: [...QUERY_KEYS.simulation, selectedSimulationId],
    queryFn: () => dashboardAPI.getMockSimulation(selectedSimulationId!),
    enabled: selectedSimulationId !== null,
    refetchInterval: (query) => {
      // simulationId가 있고 에러 상태가 아닐 때만 1분(60000ms) 간격으로 polling
      return selectedSimulationId !== null && query.state.status !== "error" ? REFETCH_INTERVAL_MS : false;
    },
  });
}
