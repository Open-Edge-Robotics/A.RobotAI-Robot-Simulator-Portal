import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { instance } from "@/api/instance";
import { InstancePostRequest } from "@/type/request/_instance";
import { Result } from "@/type/response/_default";

/**
 * @description 인스턴스 생성 쿼리
 */
export const usePostInstance = () => {
  return useMutation<
    Result<null>,
    AxiosError<Result<null>>,
    InstancePostRequest
  >({
    mutationFn: (request: InstancePostRequest) =>
      instance.postInstance(request),
  });
};
