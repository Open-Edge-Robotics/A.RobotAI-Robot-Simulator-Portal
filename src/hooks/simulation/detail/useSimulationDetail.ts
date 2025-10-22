import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { simulationAPI } from "@/apis/simulation";

import { QUERY_KEYS } from "@/constants/api";
import { POLLING_REQUIRED_STATUSES, SIMULATION_REFETCH_INTERVAL_LONG } from "@/constants/simulation";

import type { APIResponse } from "@/types/api";
import type { GetSimulationStaticResponse } from "@/types/simulation/api";

export function useSimulationDetail(id: number, enablePolling: boolean = false) {
  const queryClient = useQueryClient();

  return useQuery<APIResponse<GetSimulationStaticResponse>, AxiosError>({
    queryKey: QUERY_KEYS.simulation.bySimulationId(id, "detail"),
    queryFn: async () => {
      console.log("Fetching simulation detail for simulationId:", id);

      // 이전 상태 데이터 가져오기
      const previousData = queryClient.getQueryData<APIResponse<GetSimulationStaticResponse>>(
        QUERY_KEYS.simulation.bySimulationId(id, "detail"),
      );

      // 새 상태 데이터 fetch
      const newData = await simulationAPI.getSimulation(id);

      // 상태 변화 감지 및 캐시 무효화
      if (previousData && newData) {
        const previousStatus = previousData.data.latestExecutionStatus.status;
        const newStatus = newData.data.latestExecutionStatus.status;

        // 다른 상태 -> RUNNING으로 변경되었으면 관련 데이터 갱신
        if (!POLLING_REQUIRED_STATUSES.includes(previousStatus) && POLLING_REQUIRED_STATUSES.includes(newStatus)) {
          queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.simulation.bySimulationId(id, "history"),
          });
        }
      }

      return newData;
    },
    refetchInterval: (query) => {
      if (!enablePolling) return false;

      const data = query.state.data;

      // 데이터가 없으면 polling 계속
      if (!data) return SIMULATION_REFETCH_INTERVAL_LONG;

      const status = data.data.latestExecutionStatus.status;

      // RUNNING 상태면 1분마다 polling
      if (POLLING_REQUIRED_STATUSES.includes(status)) {
        return SIMULATION_REFETCH_INTERVAL_LONG;
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
