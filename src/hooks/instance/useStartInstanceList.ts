import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { instance } from "@/api/instance";
import { Result } from "@/type/response/_default";
import { InstanceListStartRequest } from "@/type/request/_instance";
import { InstanceListStartResponse } from "@/type/response/_instance";

/**
 * @description 인스턴스 목록 실행 쿼리
 */
export const useStartInstanceList = () => {
  return useMutation<
    Result<InstanceListStartResponse>[],
    AxiosError<Result<null>>,
    InstanceListStartRequest
  >({
    mutationFn: (request: InstanceListStartRequest) =>
      instance.startInstanceList(request),
  });
};
