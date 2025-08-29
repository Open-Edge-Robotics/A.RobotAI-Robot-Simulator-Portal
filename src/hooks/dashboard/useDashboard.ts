import { useQueries } from "@tanstack/react-query";

import { dashboardAPI } from "@/apis/dashboard";

import { simulationAPI } from "@/apis/simulation";
import { QUERY_KEYS } from "@/constants/api";

const REFETCH_INTERVAL_MS = 60000; // 1분

export function useDashboard() {
  return useQueries({
    queries: [
      {
        queryKey: QUERY_KEYS.dashboard,
        queryFn: () => dashboardAPI.getSystemOverview(),
        refetchInterval: REFETCH_INTERVAL_MS,
      },
      {
        queryKey: QUERY_KEYS.simulation,
        queryFn: () => {
          return simulationAPI.getSimulationsLite();
        },
        refetchInterval: REFETCH_INTERVAL_MS,
      },
    ],
  });
}
