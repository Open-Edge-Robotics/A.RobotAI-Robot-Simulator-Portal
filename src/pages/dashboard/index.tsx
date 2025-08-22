import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/apis/constants";
import { dashboardAPI } from "@/apis/dashboard";
import ErrorFallback from "@/components/common/Fallback/ErrorFallback";
import LoadingFallback from "@/components/common/Fallback/LoadingFallback";

import SimulationSection from "./SimulationSection";
import SystemOverviewSection from "./SystemOverviewSection";

export default function DashboardPage() {
  // 시스템 현황 데이터 조회
  const { status, data, refetch } = useQuery({
    queryKey: [...QUERY_KEYS.simulation, ...QUERY_KEYS.mec],
    queryFn: () => {
      return dashboardAPI.getDashboard();
    },
  });

  // 에러 상태
  if (status === "error") {
    return (
      <div className="p-6">
        <ErrorFallback
          onRetry={refetch}
          message="대시보드 정보를 불러올 수 없습니다."
          subMessage="네트워크 연결을 확인하거나 잠시 후 다시 시도해 주세요."
        />
      </div>
    );
  }

  // 로딩 상태
  if (status === "pending") {
    return (
      <div className="p-6">
        <LoadingFallback message="대시보드 정보를 불러오는 중입니다." />
      </div>
    );
  }

  // 성공 상태
  const overview = data.data.overview;
  const simulations = data.data.simulations;

  return (
    <div className="bg-gray-10 flex min-h-full flex-col gap-9 p-6">
      <SystemOverviewSection overview={overview} />
      <SimulationSection simulations={simulations} />
    </div>
  );
}
