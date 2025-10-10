import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { simulationAPI } from "@/apis/simulation";

import { QUERY_KEYS } from "@/constants/api";
import { POLLING_REQUIRED_STATUSES, SIMULATION_REFETCH_INTERVAL_MS } from "@/constants/simulation";

import type { APIResponse } from "@/types/api";
import type { GetSimulationStaticResponse } from "@/types/simulation/api";

export function useSimulationDetail(id: number, enablePolling: boolean = false) {
  return useQuery<APIResponse<GetSimulationStaticResponse>, AxiosError>({
    queryKey: QUERY_KEYS.simulation.bySimulationId(id, "detail"),
    queryFn: () => simulationAPI.getSimulation(id),
    // queryFn: () => simulationAPI.getMockSimulation(id),
    refetchInterval: (query) => {
      if (!enablePolling) return false;

      const data = query.state.data;

      // 데이터가 없으면 polling 계속
      if (!data) return SIMULATION_REFETCH_INTERVAL_MS;

      const status = data.data.latestExecutionStatus.status;

      // PENDING, RUNNING 상태면 1분마다 polling
      if (POLLING_REQUIRED_STATUSES.includes(status)) {
        return SIMULATION_REFETCH_INTERVAL_MS;
      }

      return false;
    },
    retry: (failureCount, error: AxiosError) => {
      // 404 에러는 재시도하지 않음
      if (error.response?.status === 404) {
        return false;
      }

      // 5xx 서버 에러나 네트워크 에러는 최대 3번 재시도 (기본값)
      return failureCount < 3;
    },
  });
}
