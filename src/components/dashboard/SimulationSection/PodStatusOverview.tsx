import Container from "@/components/common/Container.tsx";
import Title from "@/components/common/Title";

interface PodStatusOverviewProps {
  pods: {
    total: number;
    success: number;
    failed: number;
  };
}

export default function PodStatusOverview({ pods }: PodStatusOverviewProps) {
  const pendingCount = pods.total - pods.success - pods.failed;

  const successRatio = calculateRatio(pods.success, pods.total);
  const pendingRatio = calculateRatio(pendingCount, pods.total);
  const failedRatio = calculateRatio(pods.failed, pods.total);

  return (
    <Container shadow className="p-6 lg:col-span-2">
      <div className="mb-5 flex items-center justify-between">
        <Title title="Pod 상태 현황" fontSize="text-xl" fontWeight="font-medium" />
        <span className="mr-3 text-sm leading-7">총 {pods.total}개</span>
      </div>
      <div className="space-y-4">
        <PodStatusBar successPercentage={Number(successRatio)} />
        <div className="flex flex-col gap-6 md:flex-row">
          <PodStatusCard
            value={pods.success}
            status="성공"
            ratio={successRatio}
            bgColor="bg-green-10"
            borderColor="border-green-200"
            textColor="text-green-700"
            highlightColor="bg-green-500"
          />
          <PodStatusCard
            value={pendingCount}
            status="대기"
            ratio={pendingRatio}
            bgColor="bg-yellow-10"
            borderColor="border-yellow-200"
            textColor="text-yellow-700"
            highlightColor="bg-yellow-500"
          />
          <PodStatusCard
            value={pods.failed}
            status="실패"
            ratio={failedRatio}
            bgColor="bg-red-10"
            borderColor="border-red-200"
            textColor="text-red-700"
            highlightColor="bg-red-500"
          />
        </div>
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
      <div className="h-2.5 rounded-lg bg-gray-100">
        <div className="h-2.5 rounded-lg bg-green-500" style={{ width: `${successPercentage}%` }} />
      </div>
    </div>
  );
}

interface PodStatusCardProps {
  value: number;
  status: string;
  ratio: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  highlightColor: string;
}

function PodStatusCard({ value, status, ratio, bgColor, borderColor, textColor, highlightColor }: PodStatusCardProps) {
  return (
    <Container borderColor={borderColor} bgColor={bgColor} className="grow items-center justify-center gap-1 p-4">
      <div className={`rounded-full ${highlightColor} h-3 w-3`} />
      <div className={`${textColor} mt-1 text-xl font-bold`}>{value}</div>
      <div className={`flex flex-wrap justify-center gap-1 ${textColor}`}>
        <span>{status}</span>
        <span>({ratio}%)</span>
      </div>
    </Container>
  );
}

const calculateRatio = (value: number, total: number) => {
  return total > 0 ? ((value / total) * 100).toFixed(2) : "0.00";
};
