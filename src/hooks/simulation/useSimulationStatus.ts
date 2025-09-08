import { useQuery, useQueryClient } from "@tanstack/react-query";

import { simulationAPI } from "@/apis/simulation";

import { QUERY_KEYS } from "@/constants/api";
import { SIMULATION_STATUS_REFETCH_INTERVAL_MS } from "@/constants/simulation";
import type { APIResponse } from "@/types/api";

import type { GetStatusResponseFinal } from "@/types/simulation/status";

export function useSimulationStatus(id: number) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: QUERY_KEYS.simulation.byId(id, "status"),
    queryFn: async () => {
      // 이전 상태 데이터 가져오기
      const previousStatus = queryClient.getQueryData<APIResponse<GetStatusResponseFinal>>(
        QUERY_KEYS.simulation.byId(id, "status"),
      );

      // 새 상태 데이터 fetch
      const newStatus = await simulationAPI.getSimulationStatus(id);

      // 상태 변화 감지 및 detail 쿼리 invalidate
      const isStatusChanged =
        previousStatus && newStatus && previousStatus.data.currentStatus.status !== newStatus.data.currentStatus.status;
      if (isStatusChanged) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.simulation.byId(id, "detail"),
        });
      }

      return newStatus;
    },
    refetchInterval: (query) => {
      const data = query.state.data;

      // 데이터가 없으면 polling 계속
      if (!data) return SIMULATION_STATUS_REFETCH_INTERVAL_MS;

      const status = data.data.currentStatus.status;

      // COMPLETED, STOPPED, FAILED 상태면 polling 중지
      if (status === "COMPLETED" || status === "STOPPED" || status === "FAILED") {
        return false;
      }

      // PENDING, RUNNING 상태면 5초마다 polling
      return SIMULATION_STATUS_REFETCH_INTERVAL_MS;
    },
  });
}
