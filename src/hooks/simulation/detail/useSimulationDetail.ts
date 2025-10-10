import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { simulationAPI } from "@/apis/simulation";

import { QUERY_KEYS } from "@/constants/api";

import type { APIResponse } from "@/types/api";
import type { GetSimulationStaticResponse } from "@/types/simulation/api";

// useQuery 옵션에서 queryKey와 queryFn은 제외하고 나머지 모든 옵션을 받을 수 있도록 확장
type UseSimulationOptions<TData = APIResponse<GetSimulationStaticResponse>> = Omit<
  UseQueryOptions<APIResponse<GetSimulationStaticResponse>, Error, TData, readonly (string | number)[]>,
  "queryKey" | "queryFn"
>;

// select가 있는 경우 (제네릭 타입 T를 반환)
export function useSimulationDetail<T>(
  id: number,
  options: UseSimulationOptions<T> & {
    select: (data: APIResponse<GetSimulationStaticResponse>) => T;
  },
): ReturnType<typeof useQuery<APIResponse<GetSimulationStaticResponse>, Error, T>>;

// select가 없는 경우 (원본 데이터 타입 반환)
export function useSimulationDetail(
  id: number,
  options?: UseSimulationOptions,
): ReturnType<
  typeof useQuery<APIResponse<GetSimulationStaticResponse>, Error, APIResponse<GetSimulationStaticResponse>>
>;

export function useSimulationDetail<T>(
  id: number,
  options?: UseSimulationOptions<T> & {
    select?: (data: APIResponse<GetSimulationStaticResponse>) => T;
  },
) {
  return useQuery({
    queryKey: QUERY_KEYS.simulation.bySimulationId(id, "detail"),
    queryFn: () => simulationAPI.getSimulation(id),
    // queryFn: () => simulationAPI.getMockSimulation(id),
    ...options,
  });
}
