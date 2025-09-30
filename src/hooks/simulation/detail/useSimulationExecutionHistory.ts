import { useQuery } from "@tanstack/react-query";

import { simulationAPI } from "@/apis/simulation";

import { QUERY_KEYS } from "@/constants/api";

export function useSimulationExecutionHistory(id: number, searchParams: URLSearchParams) {
  return useQuery({
    queryKey: QUERY_KEYS.simulation.bySimulationId(id, "history", searchParams),
    queryFn: async () => simulationAPI.getSimulationExecutionHistory(id, searchParams),
  });
}
