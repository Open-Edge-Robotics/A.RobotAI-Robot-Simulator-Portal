import { useParams } from "react-router-dom";

import ErrorFallback from "@/components/common/Fallback/ErrorFallback";
import LoadingFallback from "@/components/common/Fallback/LoadingFallback";
import Icon from "@/components/common/Icon";
import IconButton from "@/components/common/IconButton.tsx";
import LinkButton from "@/components/common/LinkButton";
import Title from "@/components/common/Title";
import ActionProgressFallback from "@/components/simulation/ActionProgressFallback";
import SimulationDynamicInformation from "@/components/simulation/detail/SimulationDynamicInformation";
import SimulationStaticInformation from "@/components/simulation/detail/SimulationStaticInformation";
import { SEGMENTS } from "@/constants/navigation";
import { SIMULATION_REFETCH_INTERVAL_MS } from "@/constants/simulation";
import { useSimulationDetail } from "@/hooks/simulation/useSimulationDetail";
import { formatDateTime } from "@/utils/formatting";
import { successToast } from "@/utils/toast";

export default function SimulationDetailPage() {
  const { id: rawId } = useParams();
  const id = rawId ? Number(rawId) : null;
  const isValidId = id && !isNaN(id);

  return (
    <div className="bg-gray-10 h-full p-6">
      {isValidId ? (
        <SimulationDetailPageContent id={id} />
      ) : (
        <ErrorFallback message="잘못된 시뮬레이션 ID입니다." showBackButton />
      )}
    </div>
  );
}

function SimulationDetailPageContent({ id }: { id: number }) {
  const { status, data, refetch } = useSimulationDetail(id, {
    refetchInterval: (query) => {
      const data = query.state.data;

      // 데이터가 없으면 polling 계속
      if (!data) return SIMULATION_REFETCH_INTERVAL_MS;

      const status = data.data.currentStatus.status;

      // COMPLETED, STOPPED, FAILED 상태면 polling 중지
      if (status === "COMPLETED" || status === "STOPPED" || status === "FAILED") {
        return false;
      }

      // PENDING, RUNNING 상태면 1분마다 polling
      return SIMULATION_REFETCH_INTERVAL_MS;
    },
  });

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

  const handleRefresh = () => {
    refetch();
    successToast("시뮬레이션 정보를 새로고침했습니다.");
  };

  const simulation = data.data;

  return (
    <div className="relative flex flex-col gap-6">
      <SimulationDetailPageHeader
        lastUpdated={simulation.currentStatus.timestamps.lastUpdated}
        onRefreshClick={handleRefresh}
      />
      {simulation.currentStatus.status === "DELETING" || simulation.currentStatus.status === "DELETED" ? (
        <ActionProgressFallback id={id} />
      ) : (
        <div className="space-y-6">
          <SimulationStaticInformation simulation={simulation} />
          <SimulationDynamicInformation simulationId={id} />
        </div>
      )}
    </div>
  );
}

interface SimulationDetailPageHeaderProps {
  lastUpdated: string;
  onRefreshClick: () => void;
}

function SimulationDetailPageHeader({ lastUpdated, onRefreshClick }: SimulationDetailPageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <Title>
        <div className="flex flex-wrap items-center gap-2.5">
          <span>시뮬레이션 상세 모니터링</span>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span>마지막 업데이트: {formatDateTime(lastUpdated)}</span>
            <IconButton iconName="refresh" iconSize="20px" onClick={onRefreshClick} />
          </div>
        </div>
      </Title>
      <LinkButton to={SEGMENTS.absolute.simulation}>
        <div className="flex items-center gap-1">
          <Icon name="list" className="ml-[-6px]" />
          <span className="leading-4">목록으로</span>
        </div>
      </LinkButton>
    </div>
  );
}
