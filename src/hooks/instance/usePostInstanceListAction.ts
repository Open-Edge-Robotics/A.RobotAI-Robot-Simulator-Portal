import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { instance } from "@/api/instance";
import { Result } from "@/type/response/_default";
import { InstanceListActionPostRequest } from "@/type/request/_instance";
import { InstanceListActionPostResponse } from "@/type/response/_instance";

/**
 * @description 인스턴스 목록 실행/중지 쿼리
 */
export const usePostInstanceListAction = () => {
  return useMutation<
    Result<InstanceListActionPostResponse>,
    AxiosError<Result<null>>,
    InstanceListActionPostRequest
  >({
    mutationFn: (request: InstanceListActionPostRequest) =>
      instance.postInstanceListAction(request),
  });
};
