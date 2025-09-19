import ErrorFallback from "@/components/common/Fallback/ErrorFallback";
import InformationFallback from "@/components/common/Fallback/InformationFallback";
import LoadingFallback from "@/components/common/Fallback/LoadingFallback";

import { useSimulationStatus } from "@/hooks/simulation/detail/useSimulationStatus";

import { formatDateTime } from "@/utils/common/formatting";

import SimulationOverallProgress from "../SimulationOverallProgress";
import StepMonitoring from "../StepMonitoring";

interface SimulationDynamicInformationProps {
  simulationId: number;
}

export default function SimulationDynamicInformation({ simulationId }: SimulationDynamicInformationProps) {
  const { status, data, refetch } = useSimulationStatus(simulationId);

  if (status === "pending") {
    return <LoadingFallback message="시뮬레이션 정보를 불러오는 중입니다." />;
  }

  if (status === "error") {
    return (
      <ErrorFallback
        onRetry={refetch}
        message="시뮬레이션 정보를 불러올 수 없습니다."
        subMessage="네트워크 연결을 확인하거나 잠시 후 다시 시도해 주세요."
        showBackButton
      />
    );
  }

  const result = data.data;

  if (result.currentStatus.status === "INITIATING") {
    return (
      <InformationFallback
        message={result.currentStatus.message}
        subMessage={`마지막 업데이트: ${formatDateTime(result.currentStatus.timestamps.lastUpdated)}`}
      />
    );
  }

  return (
    <>
      {/* 전체 진행 상황 */}
      <SimulationOverallProgress result={result} />
      {/* 스텝별 진행 상황 */}
      <StepMonitoring result={result} />
    </>
  );
}
