import { useQueries } from "@tanstack/react-query";

import { dashboardAPI } from "@/apis/dashboard";
import { simulationAPI } from "@/apis/simulation";

import { QUERY_KEYS } from "@/constants/api";
import { DASHBOARD_REFETCH_INTERVAL } from "@/constants/dashboard";

export function useDashboard() {
  return useQueries({
    queries: [
      {
        queryKey: QUERY_KEYS.dashboard.all,
        queryFn: () => dashboardAPI.getSystemOverview(),
        refetchInterval: DASHBOARD_REFETCH_INTERVAL,
      },
      {
        queryKey: QUERY_KEYS.simulation.list("lite"),
        queryFn: () => {
          return simulationAPI.getSimulationsLite();
        },
        refetchInterval: DASHBOARD_REFETCH_INTERVAL,
      },
    ],
  });
}
