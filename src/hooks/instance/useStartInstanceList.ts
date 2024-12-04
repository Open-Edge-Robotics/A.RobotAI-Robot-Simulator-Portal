import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { instance } from "@/api/instance";
import { Result } from "@/type/response/_default";

/**
 * @description 인스턴스 목록 실행 쿼리
 */
export const useStartInstanceList = () => {
  return useMutation<Result<null>[], AxiosError<Result<null>>, string[]>({
    mutationFn: (request: string[]) => instance.startInstanceList(request),
  });
};
