import { useQueries } from "@tanstack/react-query";

import { dashboardAPI } from "@/apis/dashboard";
import { simulationAPI } from "@/apis/simulation";
import { QUERY_KEYS } from "@/constants/api";

const REFETCH_INTERVAL_MS = 60000; // 1분

export function useDashboard() {
  return useQueries({
    queries: [
      {
        queryKey: [...QUERY_KEYS.dashboard, "system-overview"],
        queryFn: () => dashboardAPI.getSystemOverview(),
        refetchInterval: REFETCH_INTERVAL_MS,
      },
      {
        queryKey: [...QUERY_KEYS.simulation, "list"],
        queryFn: () => {
          const searchParams = new URLSearchParams();
          searchParams.set("page", "1");
          return simulationAPI.getSimulations(searchParams);
        },
        refetchInterval: REFETCH_INTERVAL_MS,
      },
    ],
  });
}
