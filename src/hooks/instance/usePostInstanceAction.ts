import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { instance } from "@/api/instance";
import { InstanceActionPostRequest } from "@/type/request/_instance";
import { Result } from "@/type/response/_default";
import { InstanceActionResponse } from "@/type/response/_instance";

/**
 * @description 인스턴스 실행/중지 쿼리
 */
export const usePostInstanceAction = () => {
  return useMutation<
    Result<InstanceActionResponse>,
    AxiosError<Result<null>>,
    InstanceActionPostRequest
  >({
    mutationFn: (request: InstanceActionPostRequest) =>
      instance.postInstanceAction(request),
  });
};
