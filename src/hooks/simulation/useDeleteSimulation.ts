import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { simulation } from "@/api/simulation";
import { SimulationIdParam } from "@/type/request/_simulation";
import { Result } from "@/type/response/_default";
import { SimulationActionResponse } from "@/type/response/_simulation";

/**
 * @description 시뮬레이션 삭제 쿼리
 */
export const useDeleteSimulation = () => {
  return useMutation<
    Result<SimulationActionResponse>,
    AxiosError<Result<null>>,
    SimulationIdParam
  >({
    mutationFn: (request: SimulationIdParam) =>
      simulation.deleteSimulation(request),
  });
};
