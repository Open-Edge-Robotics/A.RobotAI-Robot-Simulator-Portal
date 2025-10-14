import { useParams } from "react-router-dom";

import ErrorFallback from "@/components/common/Fallback/ErrorFallback";
import InformationFallback from "@/components/common/Fallback/InformationFallback";
import LoadingFallback from "@/components/common/Fallback/LoadingFallback";
import Icon from "@/components/common/Icon";
import IconButton from "@/components/common/IconButton.tsx";
import LinkButton from "@/components/common/LinkButton";
import Title from "@/components/common/Title";
import SimulationOverallProgress from "@/components/simulation/result/SimulationOverallProgress";
import StepMonitoring from "@/components/simulation/result/StepMonitoring";

import { ICONS } from "@/constants/icon";
import { SEGMENTS } from "@/constants/navigation";
import { POLLING_REQUIRED_STATUSES } from "@/constants/simulation";

import { useSimulationExecutionRecord } from "@/hooks/simulation/detail/useSimulationExecutionRecord";

import { formatDateTime } from "@/utils/common/formatting";
import { successToast } from "@/utils/common/toast";

export default function SimulationResultPage() {
  const { simulationId: rawSimulationId, executionId: rawExecutionId } = useParams();
  const simulationId = rawSimulationId ? Number(rawSimulationId) : null;
  const executionId = rawExecutionId ? Number(rawExecutionId) : null;
  const isValidId = simulationId && !isNaN(simulationId) && executionId && !isNaN(executionId);

  return (
    <div className="bg-gray-10 h-full p-6">
      {isValidId ? (
        <SimulationResultPageContent simulationId={simulationId} executionId={executionId} />
      ) : (
        <ErrorFallback message="잘못된 ID입니다." showBackButton />
      )}
    </div>
  );
}

function SimulationResultPageContent({ simulationId, executionId }: { simulationId: number; executionId: number }) {
  const { status, data, refetch } = useSimulationExecutionRecord(simulationId, executionId);

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

  const result = data.data.execution;

  const handleRefresh = () => {
    refetch();
    successToast("시뮬레이션 정보를 새로고침했습니다.");
  };

  if (result.currentStatus.status === "INITIATING") {
    return (
      <InformationFallback
        message={result.currentStatus.message}
        subMessage={`마지막 업데이트: ${formatDateTime(result.currentStatus.timestamps.lastUpdated)}`}
      />
    );
  }

  return (
    <div className="relative flex flex-col gap-6">
      <SimulationResultPageHeader
        detailHref={`${SEGMENTS.absolute.simulation}/${simulationId}`}
        lastUpdated={result.currentStatus.timestamps.lastUpdated}
        onRefreshClick={POLLING_REQUIRED_STATUSES.includes(result.currentStatus.status) ? handleRefresh : undefined}
      />

      {/* 전체 진행 상황 */}
      <SimulationOverallProgress result={result} />
      {/* 스텝별 진행 상황 */}
      <StepMonitoring result={result} />
    </div>
  );
}

interface SimulationResultPageHeaderProps {
  lastUpdated: string;
  onRefreshClick?: () => void;
  detailHref: string;
}

function SimulationResultPageHeader({ detailHref, lastUpdated, onRefreshClick }: SimulationResultPageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <Title>
        <div className="flex flex-wrap items-center gap-2.5">
          <span>시뮬레이션 실행 현황 및 결과</span>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span>마지막 업데이트: {formatDateTime(lastUpdated)}</span>
            {onRefreshClick && <IconButton iconName={ICONS.refresh} iconSize="20px" onClick={onRefreshClick} />}
          </div>
        </div>
      </Title>
      <LinkButton to={detailHref}>
        <div className="flex items-center gap-1">
          <Icon name="list" className="ml-[-6px]" />
          <span className="leading-4">시뮬레이션 정보 페이지로</span>
        </div>
      </LinkButton>
    </div>
  );
}
