import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { simulation } from "@/api/simulation";
import { Result } from "@/type/response/_default";
import { SimulaionDeleteResponse } from "@/type/response/_simulation";
import { SimulationIdField } from "@/type/_field";

/**
 * @description 시뮬레이션 삭제 쿼리
 */
export const useDeleteSimulation = () => {
  return useMutation<
    Result<SimulaionDeleteResponse>,
    AxiosError<Result<null>>,
    SimulationIdField
  >({
    mutationFn: (request: SimulationIdField) =>
      simulation.deleteSimulation(request),
  });
};
