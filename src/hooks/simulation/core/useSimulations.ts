import { useQuery } from "@tanstack/react-query";

import { simulationAPI } from "@/apis/simulation";

import { QUERY_KEYS } from "@/constants/api";

import type { PeriodFilterOption } from "@/types/simulation/domain";

import { getDaysAgo } from "@/utils/common/date";
import { formatDateToYYYYMMDD } from "@/utils/common/formatting";

const REFETCH_INTERVAL_MS = 30000; // 30초

export function useSimulations(searchParams: URLSearchParams) {
  // URLSearchParams를 객체로 변환
  const params = {
    status: searchParams.get("status") || undefined,
    pattern_type: searchParams.get("pattern_type") || undefined,
    page: searchParams.get("page") ? Number(searchParams.get("page")) : undefined,
    size: searchParams.get("size") ? Number(searchParams.get("size")) : undefined,
    start_date: searchParams.get("start_date") || undefined,
    end_date: searchParams.get("end_date") || undefined,
    period: searchParams.get("period") || undefined,
  };

  const cleanParams = Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined)) as {
    status?: string;
    pattern_type?: string;
    page?: number;
    size?: number;
    start_date?: string;
    end_date?: string;
  };

  return useQuery({
    queryKey: QUERY_KEYS.simulation.list("full", Object.keys(cleanParams).length > 0 ? cleanParams : undefined),
    queryFn: () => {
      const paramsWithDefaultValue = new URLSearchParams(searchParams);
      // page 값은 필수
      if (!searchParams.get("page")) {
        paramsWithDefaultValue.set("page", "1");
      }

      const period = searchParams.get("period") as PeriodFilterOption | null;
      let startDate = "";
      let endDate = "";

      switch (period) {
        case "today":
          startDate = formatDateToYYYYMMDD(new Date());
          endDate = formatDateToYYYYMMDD(new Date());
          break;
        case "7days":
          startDate = formatDateToYYYYMMDD(getDaysAgo(7));
          endDate = formatDateToYYYYMMDD(new Date());
          break;
        case "1month":
          startDate = formatDateToYYYYMMDD(getDaysAgo(30));
          endDate = formatDateToYYYYMMDD(new Date());
          break;
        default:
          break;
      }

      if (startDate && endDate) {
        paramsWithDefaultValue.set("start_date", startDate);
        paramsWithDefaultValue.set("end_date", endDate);
      }

      // period 파라미터는 서버에 보내지 않음 (클라이언트 전용)
      paramsWithDefaultValue.delete("period");

      return simulationAPI.getSimulations(paramsWithDefaultValue);
    },
    refetchInterval: REFETCH_INTERVAL_MS,
  });
}
