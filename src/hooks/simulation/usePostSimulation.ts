import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { simulation } from "@/api/simulation";
import { PostSimulationRequest } from "@/type/request/_simulation";
import { Result } from "@/type/response/_default";

/**
 * @description 시뮬레이션 생성 쿼리
 */
export const usePostSimulation = () => {
  return useMutation<
    Result<null>,
    AxiosError<Result<null>>,
    PostSimulationRequest
  >({
    mutationFn: (request: PostSimulationRequest) =>
      simulation.postSimulation(request),
  });
};
