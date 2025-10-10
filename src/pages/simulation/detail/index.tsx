import { useReducer } from "react";
import { useParams } from "react-router-dom";

import ErrorFallback from "@/components/common/Fallback/ErrorFallback";
import InformationFallback from "@/components/common/Fallback/InformationFallback";
import LoadingFallback from "@/components/common/Fallback/LoadingFallback";
import Icon from "@/components/common/Icon";
import IconButton from "@/components/common/IconButton.tsx";
import LinkButton from "@/components/common/LinkButton";
import Title from "@/components/common/Title";
import DeleteActionProgressFallback from "@/components/simulation/DeleteActionProgressFallback";
import SimulationExecutionHistory from "@/components/simulation/detail/SimulationExecutionHistory";
import SimulationStaticInformation from "@/components/simulation/detail/SimulationStaticInformation";

import { ICONS } from "@/constants/icon";
import { SEGMENTS } from "@/constants/navigation";
import { DELETING_STATUSES, POLLING_REQUIRED_STATUSES } from "@/constants/simulation";

import { useSimulationDetail } from "@/hooks/simulation/detail/useSimulationDetail";

import { formatDateTime } from "@/utils/common/formatting";
import { successToast } from "@/utils/common/toast";

export default function SimulationDetailPage() {
  const { simulationId: rawId } = useParams();
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
  const [editMode, toggleEditMode] = useReducer((x) => !x, false);
  const { status, data, refetch, error } = useSimulationDetail(id, !editMode);

  if (status === "pending") {
    return <LoadingFallback message="시뮬레이션 정보를 불러오는 중입니다." />;
  }

  if (status === "error") {
    // 404 에러인 경우 별도 처리
    if (error.response?.status === 404) {
      return (
        <ErrorFallback
          message="시뮬레이션을 찾을 수 없습니다."
          subMessage="삭제되었거나 존재하지 않는 시뮬레이션입니다."
          showBackButton
        />
      );
    }

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
        lastUpdated={simulation.latestExecutionStatus.timestamps.lastUpdated}
        onRefreshClick={
          POLLING_REQUIRED_STATUSES.includes(simulation.latestExecutionStatus.status) ? handleRefresh : undefined
        }
      />
      {DELETING_STATUSES.includes(simulation.latestExecutionStatus.status) ? (
        <DeleteActionProgressFallback id={id} />
      ) : (
        <div className="space-y-6">
          <SimulationStaticInformation simulation={simulation} editMode={editMode} toggleEditMode={toggleEditMode} />
          {editMode ? <EditFallback /> : <SimulationExecutionHistory id={simulation.simulationId} />}
        </div>
      )}
    </div>
  );
}

interface SimulationDetailPageHeaderProps {
  lastUpdated: string;
  onRefreshClick?: () => void;
}

function SimulationDetailPageHeader({ lastUpdated, onRefreshClick }: SimulationDetailPageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <Title>
        <div className="flex flex-wrap items-center gap-2.5">
          <span>시뮬레이션 상세 정보</span>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span>마지막 업데이트: {formatDateTime(lastUpdated)}</span>
            {onRefreshClick && <IconButton iconName={ICONS.refresh} iconSize="20px" onClick={onRefreshClick} />}
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

function EditFallback() {
  return <InformationFallback message="수정 중에는 시뮬레이션 진행 상황을 모니터링할 수 없습니다." />;
}
