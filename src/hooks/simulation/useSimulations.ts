import { useQuery } from "@tanstack/react-query";

import { simulationAPI } from "@/apis/simulation";

import { QUERY_KEYS } from "@/constants/api";

const REFETCH_INTERVAL_MS = 30000; // 30초

export function useSimulations(searchParams: URLSearchParams) {
  // URLSearchParams를 객체로 변환
  const params = {
    status: searchParams.get("status") || undefined,
    pattern_type: searchParams.get("pattern_type") || undefined,
    page: searchParams.get("page") ? Number(searchParams.get("page")) : undefined,
    size: searchParams.get("size") ? Number(searchParams.get("size")) : undefined,
  };

  const cleanParams = Object.fromEntries(Object.entries(params).filter(([_, value]) => value !== undefined)) as {
    status?: string;
    pattern_type?: string;
    page?: number;
    size?: number;
  };

  return useQuery({
    queryKey: QUERY_KEYS.simulation.list("full", Object.keys(cleanParams).length > 0 ? cleanParams : undefined),
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
