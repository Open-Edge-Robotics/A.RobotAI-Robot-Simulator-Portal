import { useQueries } from "@tanstack/react-query";

import { dashboardAPI } from "@/apis/dashboard";
import { simulationAPI } from "@/apis/simulation";
import ErrorFallback from "@/components/common/Fallback/ErrorFallback";
import LoadingFallback from "@/components/common/Fallback/LoadingFallback";
import SimulationSection from "@/components/dashboard/SimulationSection";
import SystemOverviewSection from "@/components/dashboard/SystemOverviewSection";
import { QUERY_KEYS } from "@/constants/api";

const REFETCH_INTERVAL_MS = 60000; // 1분

export default function DashboardPage() {
  const queries = useQueries({
    queries: [
      {
        queryKey: [...QUERY_KEYS.dashboard, "system-overview"],
        queryFn: () => dashboardAPI.getSystemOverview(),
        refetchInterval: REFETCH_INTERVAL_MS,
      },
      {
        queryKey: [...QUERY_KEYS.simulation, "list"],
        queryFn: () => {
          const searchParams = new URLSearchParams();
          searchParams.set("page", "1");
          return simulationAPI.getSimulations(searchParams);
        },
        refetchInterval: REFETCH_INTERVAL_MS,
      },
    ],
  });

  const [overviewQuery, simulationsQuery] = queries;

  // 전체 재시도 함수
  const handleRetry = () => {
    overviewQuery.refetch();
    simulationsQuery.refetch();
  };

  // 에러 상태 - 하나라도 에러가 있으면 에러 표시
  if (overviewQuery.status === "error" || simulationsQuery.status === "error") {
    return (
      <div className="p-6">
        <ErrorFallback
          onRetry={handleRetry}
          message="대시보드 정보를 불러올 수 없습니다."
          subMessage="네트워크 연결을 확인하거나 잠시 후 다시 시도해 주세요."
        />
      </div>
    );
  }

  // 로딩 상태 - 둘 중 하나라도 로딩 중이면 로딩 표시
  if (overviewQuery.status === "pending" || simulationsQuery.status === "pending") {
    return (
      <div className="p-6">
        <LoadingFallback message="대시보드 정보를 불러오는 중입니다." />
      </div>
    );
  }

  // 성공 상태
  const overview = overviewQuery.data.data;
  const simulations = simulationsQuery.data.data.simulations;

  return (
    <div className="bg-gray-10 flex min-h-full flex-col gap-9 p-6">
      <SystemOverviewSection overview={overview} />
      <SimulationSection simulations={simulations} />
    </div>
  );
}
