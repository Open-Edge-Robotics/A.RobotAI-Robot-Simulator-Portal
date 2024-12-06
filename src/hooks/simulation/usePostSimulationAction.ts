import { simulation } from "@/api/simulation";
import { PostSimulationActionRequest } from "@/type/request/_simulation";
import { Result } from "@/type/response/_default";
import { SimulationPostActionResponse } from "@/type/response/_simulation";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const usePostSimulationAction = () => {
  return useMutation<
    Result<SimulationPostActionResponse>,
    AxiosError<Result<null>>,
    PostSimulationActionRequest
  >({
    mutationFn: (request: PostSimulationActionRequest) =>
      simulation.postSimulationAction(request),
  });
};
