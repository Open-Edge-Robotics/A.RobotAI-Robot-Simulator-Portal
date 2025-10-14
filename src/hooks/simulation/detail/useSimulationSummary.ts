import { useQuery } from "@tanstack/react-query";

import { simulationAPI } from "@/apis/simulation";

import { QUERY_KEYS } from "@/constants/api";
import { SIMULATION_REFETCH_INTERVAL_LONG, SIMULATION_REFETCH_INTERVAL_SHORT } from "@/constants/simulation";

export function useSimulationSummary(selectedSimulationId: number) {
  return useQuery({
    queryKey: QUERY_KEYS.simulation.bySimulationId(selectedSimulationId, "summary"),
    queryFn: () => simulationAPI.getSimulationSummary(selectedSimulationId),
    // queryFn: () => simulationAPI.getMockSimulationSummary(selectedSimulationId),
    enabled: selectedSimulationId !== null,
    refetchInterval: (query) => {
      if (selectedSimulationId === null || query.state.status === "error") return false;

      const data = query.state.data;
      if (data?.data.latestExecutionStatus === "RUNNING") return SIMULATION_REFETCH_INTERVAL_SHORT;
      return SIMULATION_REFETCH_INTERVAL_LONG;
    },
  });
}
