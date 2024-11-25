import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { instance } from "@/api/instance";
import { Result } from "@/type/response/_default";
import { InstancePostResponse } from "@/type/response/_instance";
import { InstanceIdField } from "@/type/_field";

/**
 * @description 인스턴스 삭제 쿼리
 */
export const useDeleteInstance = () => {
  return useMutation<
    Result<InstancePostResponse>,
    AxiosError<Result<null>>,
    InstanceIdField
  >({
    mutationFn: (request: InstanceIdField) => instance.deleteInstance(request),
  });
};
