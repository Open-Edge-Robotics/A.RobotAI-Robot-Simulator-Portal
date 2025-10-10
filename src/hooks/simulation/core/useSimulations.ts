import { useQuery } from "@tanstack/react-query";

import { simulationAPI } from "@/apis/simulation";

import { QUERY_KEYS } from "@/constants/api";

import type { APIResponse } from "@/types/api";
import type { GetSimulationsResponse } from "@/types/simulation/api";
import type { PeriodFilterOption } from "@/types/simulation/domain";

import { getDaysAgo } from "@/utils/common/date";
import { formatDateToYYYYMMDD } from "@/utils/common/formatting";

const REFETCH_INTERVAL_MS = 30000; // 30초

export function useSimulations(searchParams: URLSearchParams) {
  return useQuery<APIResponse<GetSimulationsResponse>>({
    queryKey: [...QUERY_KEYS.simulation.list("full", searchParams)],
    queryFn: () => simulationAPI.getSimulations(buildAPIParams(searchParams)),
    refetchInterval: REFETCH_INTERVAL_MS,
  });
}

const buildAPIParams = (searchParams: URLSearchParams): URLSearchParams => {
  const apiParams = new URLSearchParams(searchParams);

  // 기본값 설정
  if (!apiParams.get("page")) {
    apiParams.set("page", "1");
  }

  // period 기반 날짜 계산
  const period = searchParams.get("period") as PeriodFilterOption | null;
  const daysAgo = period ? PERIOD_TO_DAYS_MAP[period] : null;

  if (daysAgo !== null) {
    const endDate = formatDateToYYYYMMDD(new Date());
    const startDate = daysAgo === 0 ? endDate : formatDateToYYYYMMDD(getDaysAgo(daysAgo));

    apiParams.set("start_date", startDate);
    apiParams.set("end_date", endDate);
  }

  apiParams.delete("period"); // 클라이언트 전용 파라미터 제거
  return apiParams;
};

const PERIOD_TO_DAYS_MAP: Record<PeriodFilterOption, number | null> = {
  today: 0,
  "7days": 7,
  "1month": 30,
  custom: null,
  "": null,
} as const;
