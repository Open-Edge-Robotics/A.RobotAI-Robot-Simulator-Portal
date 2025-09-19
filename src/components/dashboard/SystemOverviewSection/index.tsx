import IconButton from "@/components/common/IconButton.tsx";
import Title from "@/components/common/Title";

import type { Timestamp } from "@/types/common";
import type { SystemOverviewData } from "@/types/dashboard/domain";

import { formatDateTime } from "@/utils/common/formatting";
import { successToast } from "@/utils/common/toast";

import SystemOverview from "./SystemOverview";

interface SystemOverviewSectionProps {
  overview: SystemOverviewData | null;
  refetch: () => void;
}

export default function SystemOverviewSection({ overview, refetch }: SystemOverviewSectionProps) {
  const handleRefresh = () => {
    refetch();
    successToast("대시보드 정보를 새로고침했습니다.");
  };

  return (
    <div>
      <SystemOverviewSectionHeader timestamp={overview?.timestamp} onRefreshClick={handleRefresh} />
      <SystemOverview overview={overview} />
    </div>
  );
}

interface SystemOverviewSectionHeaderProps {
  timestamp?: Timestamp;
  onRefreshClick: () => void;
}

function SystemOverviewSectionHeader({ timestamp, onRefreshClick }: SystemOverviewSectionHeaderProps) {
  return (
    <Title margin="mb-5">
      <div className="flex flex-wrap items-center gap-2.5">
        <span>전체 시스템 현황</span>
        {timestamp && (
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span>마지막 업데이트: {formatDateTime(timestamp)}</span>
            <IconButton iconName="refresh" iconSize="20px" onClick={onRefreshClick} title="새로고침" />
          </div>
        )}
      </div>
    </Title>
  );
}
