import { useQuery } from "@tanstack/react-query";

import { simulationAPI } from "@/apis/simulation";
import { QUERY_KEYS } from "@/constants/api";

const REFETCH_INTERVAL_MS = 30000; // 30초

export function useSimulations(searchParams: URLSearchParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.simulation, searchParams.toString()],
    queryFn: () => {
      const paramsWithDefaultValue = new URLSearchParams(searchParams);
      if (!searchParams.get("page")) {
        paramsWithDefaultValue.set("page", "1");
      }
      return simulationAPI.getSimulations(paramsWithDefaultValue);
    },
    refetchInterval: REFETCH_INTERVAL_MS,
  });
}
