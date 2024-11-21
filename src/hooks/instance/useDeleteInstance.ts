import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { instance } from "@/api/instance";
import { InstanceIdParam } from "@/type/request/_instance";
import { Result } from "@/type/response/_default";
import { InstancePostResponse } from "@/type/response/_instance";

/**
 * @description 인스턴스 삭제 쿼리
 */
export const useDeleteInstance = () => {
  return useMutation<
    Result<InstancePostResponse>,
    AxiosError<Result<null>>,
    InstanceIdParam
  >({
    mutationFn: (request: InstanceIdParam) => instance.deleteInstance(request),
  });
};
