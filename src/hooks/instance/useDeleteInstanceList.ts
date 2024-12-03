import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { instance } from "@/api/instance";
import { Result } from "@/type/response/_default";

/**
 * @description 인스턴스 목록 삭제 쿼리
 */
export const useDeleteInstanceList = () => {
  return useMutation<Result<null>[], AxiosError<Result<null>>, string[]>({
    mutationFn: (request: string[]) => instance.deleteInstanceList(request),
  });
};
