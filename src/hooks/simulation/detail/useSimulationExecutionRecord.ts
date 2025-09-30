import { useQuery, useQueryClient } from "@tanstack/react-query";

import { simulationAPI } from "@/apis/simulation";

import { QUERY_KEYS } from "@/constants/api";
import { POLLING_REQUIRED_STATUSES, SIMULATION_STATUS_REFETCH_INTERVAL_MS } from "@/constants/simulation";

import type { APIResponse } from "@/types/api";
import type { GetStatusResponseFinal } from "@/types/simulation/statusResult";

export function useSimulationExecutionRecord(simulationId: number, executionId: number, enabled: boolean = true) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: QUERY_KEYS.simulation.byExecutionId(simulationId, executionId),
    queryFn: async () => {
      // 이전 상태 데이터 가져오기
      const previousData = queryClient.getQueryData<APIResponse<GetStatusResponseFinal>>(
        QUERY_KEYS.simulation.byExecutionId(simulationId, executionId),
      );

      // 새 상태 데이터 fetch
      const newData = await simulationAPI.getSimulationExecutionRecord(simulationId, executionId);

      // 상태 변화 감지 및 캐시 무효화
      if (previousData && newData) {
        const previousStatus = previousData.data.execution.currentStatus.status;
        const newStatus = newData.data.execution.currentStatus.status;

        // RUNNING -> 다른 상태로 변경되었으면 관련 데이터 갱신
        if (POLLING_REQUIRED_STATUSES.includes(previousStatus) && !POLLING_REQUIRED_STATUSES.includes(newStatus)) {
          queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.simulation.bySimulationId(simulationId, "history"),
          });

          queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.simulation.bySimulationId(simulationId, "detail"),
          });
        }
      }

      return newData;
    },
    enabled,
    refetchInterval: (query) => {
      const data = query.state.data;

      if (query.state.error) return false;

      // 데이터가 없으면 polling 계속
      if (!data) return SIMULATION_STATUS_REFETCH_INTERVAL_MS;

      const status = data.data.execution.currentStatus.status;

      // polling이 필요한 상태라면 지정한 간격으로 polling
      if (POLLING_REQUIRED_STATUSES.includes(status)) {
        return SIMULATION_STATUS_REFETCH_INTERVAL_MS;
      }

      return false;
    },
    retry: (failureCount) => {
      // 2회까지 재시도
      return failureCount < 2;
    },
  });
}
