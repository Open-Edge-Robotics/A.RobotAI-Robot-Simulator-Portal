import { useQuery } from "@tanstack/react-query";

import { simulationAPI } from "@/apis/simulation";

import { QUERY_KEYS } from "@/constants/api";
import type {
  GetParallelSimulationStatusResult,
  GetSequentialSimulationStatusResult,
  ParallelCurrentStatus,
  SequentialCurrentStatus,
} from "@/types/simulation/api";

export function useSimulationStatus(id: number) {
  return useQuery({
    queryKey: [...QUERY_KEYS.simulation, id, "status"],
    // queryFn: () => simulationAPI.getSimulationStatus(id),
    queryFn: () => simulationAPI.getMockSimulationStatus(id),
    refetchInterval: (query) => {
      const data = query.state.data;

      // 데이터가 없으면 polling 계속
      if (!data) return 5000;

      const status = data.data.currentStatus.status;

      // COMPLETED, STOPPED, FAILED 상태면 polling 중지
      if (status === "COMPLETED" || status === "STOPPED" || status === "FAILED") {
        return false;
      }

      // PENDING, RUNNING 상태면 5초마다 polling
      return 5000;
    },
    // select: (data) => {
    //   // currentStatus의 구조를 보고 patternType을 동적으로 결정
    //   const isSequential = "stepDetails" in data.data.currentStatus;

    //   if (isSequential) {
    //     const transformedData: GetSequentialSimulationStatusResult = {
    //       ...data.data,
    //       patternType: "sequential",
    //       currentStatus: data.data.currentStatus as SequentialCurrentStatus,
    //     };
    //     return { ...data, data: transformedData };
    //   } else {
    //     const transformedData: GetParallelSimulationStatusResult = {
    //       ...data.data,
    //       patternType: "parallel",
    //       currentStatus: data.data.currentStatus as ParallelCurrentStatus,
    //     };
    //     return { ...data, data: transformedData };
    //   }
    // },
  });
}
