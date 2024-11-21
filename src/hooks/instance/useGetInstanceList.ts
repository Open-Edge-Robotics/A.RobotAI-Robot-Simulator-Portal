import { useQuery } from "@tanstack/react-query";
import { instance } from "@/api/instance";

/**
 * @description 인스턴스 목록 조회 쿼리
 */
export const useGetInstanceList = () => {
  return useQuery({
    queryKey: ["instanceList"],
    queryFn: () => instance.getInstanceList(),
  });
};
