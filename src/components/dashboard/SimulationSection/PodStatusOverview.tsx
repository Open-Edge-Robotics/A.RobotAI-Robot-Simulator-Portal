import Container from "@/components/common/Container.tsx";
import Dot from "@/components/common/Dot";
import ProgressBar from "@/components/common/ProgressBar";
import Title from "@/components/common/Title";
import { POD_STATUS_CONFIGS } from "@/constants/simulation";
import type { PodStatus, PodStatusBreakdownData, PodStatusData } from "@/types/simulation/domain";

interface PodStatusOverviewProps {
  pods: PodStatusData;
}

const STATUS_BREAKDOWN_DEFAULT_DATA: PodStatusBreakdownData = {
  PENDING: { count: 0, percentage: 0 },
  RUNNING: { count: 0, percentage: 0 },
  SUCCESS: { count: 0, percentage: 0 },
  FAILED: { count: 0, percentage: 0 },
  STOPPED: { count: 0, percentage: 0 },
};

export default function PodStatusOverview({ pods }: PodStatusOverviewProps) {
  const statusBreakdown = getPodStatusBreakdownWithDefaults(pods.statusBreakdown);

  return (
    <Container shadow className="p-6 lg:col-span-2">
      <div className="mb-5 flex items-center justify-between">
        <Title title="Pod 상태 현황" fontSize="text-xl" fontWeight="font-medium" />
        <span className="mr-3 text-sm leading-7">총 {pods.totalCount}개</span>
      </div>
      <div className="space-y-4">
        <PodStatusBar successPercentage={pods.overallHealthPercent} />
        <PodStatusCards statusBreakdown={statusBreakdown} />
      </div>
    </Container>
  );
}

function PodStatusBar({ successPercentage }: { successPercentage: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span>전체 상태</span>
        <span>{successPercentage}% 정상</span>
      </div>
      <ProgressBar progress={successPercentage} />
    </div>
  );
}

interface PodStatusCardsProps {
  statusBreakdown: PodStatusBreakdownData;
}

function PodStatusCards({ statusBreakdown }: PodStatusCardsProps) {
  return (
    <div className="flex flex-col gap-6 md:flex-row">
      {(Object.keys(POD_STATUS_CONFIGS) as PodStatus[]).map((podStatus) => {
        const config = POD_STATUS_CONFIGS[podStatus];
        const statusData = statusBreakdown[podStatus];

        return (
          <PodStatusCard
            key={podStatus}
            count={statusData?.count || 0}
            status={config.text}
            ratio={statusData?.percentage || 0}
            bgColor={config.bgColor}
            borderColor={config.borderColor}
            textColor={config.textColor}
            highlightColor={config.highlightColor}
          />
        );
      })}
    </div>
  );
}

interface PodStatusCardProps {
  count: number;
  status: string;
  ratio: number;
  bgColor: string;
  borderColor: string;
  textColor: string;
  highlightColor: string;
}

function PodStatusCard({ count, status, ratio, bgColor, borderColor, textColor, highlightColor }: PodStatusCardProps) {
  return (
    <Container borderColor={borderColor} bgColor={bgColor} className="grow items-center justify-center gap-1 p-4">
      <Dot color={highlightColor} />
      <div className={`${textColor} mt-1 text-xl font-bold`}>{count}</div>
      <div className={`flex flex-wrap justify-center gap-1 ${textColor}`}>
        <span>{status}</span>
        <span>({ratio}%)</span>
      </div>
    </Container>
  );
}

const getPodStatusBreakdownWithDefaults = (statusBreakdown: PodStatusData["statusBreakdown"]) => {
  const normalizedStatusBreakdown =
    Object.keys(statusBreakdown).length === 0
      ? STATUS_BREAKDOWN_DEFAULT_DATA
      : (statusBreakdown as PodStatusBreakdownData);

  return normalizedStatusBreakdown;
};
