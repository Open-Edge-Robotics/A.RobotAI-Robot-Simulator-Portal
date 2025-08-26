import ErrorFallback from "@/components/common/Fallback/ErrorFallback";
import LoadingFallback from "@/components/common/Fallback/LoadingFallback";
import { useSimulationSimple } from "@/hooks/dashboard/useSimulationSimple";
import type { PatternType, SimulationStatus } from "@/types/simulation/domain";

import PodStatusOverview from "./PodStatusOverview";
import ResourceUsage from "./ResourceUsage";
import SimulationInformation from "./SimulationInformation";

interface SimulationDetailProps {
  simulationId: number;
}

export default function SimulationDetail({ simulationId }: SimulationDetailProps) {
  // 선택된 시뮬레이션 상세 정보 조회
  const { data, status, refetch } = useSimulationSimple(simulationId);

  if (status === "pending") {
    return <LoadingFallback message="시뮬레이션 정보를 불러오고 있습니다" />;
  }

  if (status === "error") {
    return (
      <ErrorFallback
        onRetry={refetch}
        message="시뮬레이션 정보를 불러올 수 없습니다."
        subMessage="네트워크 연결을 확인하거나 잠시 후 다시 시도해 주세요."
      />
    );
  }

  const simulation = data.data;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <ResourceUsage resource={simulation.resource} />
      <SimulationInformation simulation={simulation} />
      <PodStatusOverview pods={simulation.pods} />
    </div>
  );
}

export interface SimulationDetailData {
  simulationId: number;
  simulationName: string;
  status: SimulationStatus;
  createdAt: string;
  updatedAt: string;
  patternType: PatternType;
  totalExecutionTime: number;
  autonomousAgentCount: number;
  resource: {
    cpu: number;
    memory: number;
    disk: number;
  };
  pods: {
    total: number;
    success: number;
    failed: number;
  };
}
