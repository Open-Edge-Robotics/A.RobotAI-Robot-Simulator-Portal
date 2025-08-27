import { useQuery } from "@tanstack/react-query";

import { simulationAPI } from "@/apis/simulation";

import { QUERY_KEYS } from "@/constants/api";

import type { APIResponse } from "@/types/api";
import type { GetSimulationResult } from "@/types/simulation/api";

interface UseSimulationOptions<T> {
  select: (data: APIResponse<GetSimulationResult>) => T;
}

// select가 있는 경우
export function useSimulation<T>(
  id: number,
  options: UseSimulationOptions<T>,
): ReturnType<typeof useQuery<APIResponse<GetSimulationResult>, Error, T>>;

// select가 없는 경우
export function useSimulation(
  id: number,
): ReturnType<typeof useQuery<APIResponse<GetSimulationResult>, Error, APIResponse<GetSimulationResult>>>;

export function useSimulation<T>(id: number, options?: UseSimulationOptions<T>) {
  return useQuery({
    queryKey: [...QUERY_KEYS.simulation, id],
    queryFn: () => simulationAPI.getSimulation(id),
    ...(options?.select && { select: options.select }),
  });
}
