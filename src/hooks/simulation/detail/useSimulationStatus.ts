import { useQuery, useQueryClient } from "@tanstack/react-query";

import { simulationAPI } from "@/apis/simulation";

import { QUERY_KEYS } from "@/constants/api";
import { POLLING_REQUIRED_STATUSES, SIMULATION_STATUS_REFETCH_INTERVAL_MS } from "@/constants/simulation";

import type { APIResponse } from "@/types/api";
import type { GetStatusResponseFinal } from "@/types/simulation/statusResult";

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
      const newStatus = await simulationAPI.getMockSimulationStatus(id);
      // const newStatus = await simulationAPI.getSimulationStatus(id);

      // 상태 변화 감지 및 detail 쿼리 invalidate
      const isStatusChanged =
        previousStatus && newStatus && previousStatus.data.currentStatus.status !== newStatus.data.currentStatus.status;

      // 상태가 변경되었으면 상세 화면에 보일 정적 데이터도 갱신 (정적 데이터에 동적 상태인 `status`가 포함되어 있기 때문)
      if (isStatusChanged) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.simulation.byId(id, "detail"),
        });
      }

      return newStatus;
    },
    refetchInterval: (query) => {
      const data = query.state.data;

      if (query.state.error) return false;

      // 데이터가 없으면 polling 계속
      if (!data) return SIMULATION_STATUS_REFETCH_INTERVAL_MS;

      const status = data.data.currentStatus.status;

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
