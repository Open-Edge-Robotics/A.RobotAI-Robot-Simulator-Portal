import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { simulation } from "@/api/simulation";
import { PostSimulationRequest } from "@/type/request/_simulation";
import { Result } from "@/type/response/_default";
import { SimulationPostResponse } from "@/type/response/_simulation";

/**
 * @description 시뮬레이션 생성 쿼리
 */
export const usePostSimulation = () => {
  return useMutation<
    Result<SimulationPostResponse>,
    AxiosError<Result<null>>,
    PostSimulationRequest
  >({
    mutationFn: (request: PostSimulationRequest) =>
      simulation.postSimulation(request),
  });
};
