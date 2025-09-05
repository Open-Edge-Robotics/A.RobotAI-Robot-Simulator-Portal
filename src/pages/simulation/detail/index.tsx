import { useParams } from "react-router-dom";

import ErrorFallback from "@/components/common/Fallback/ErrorFallback";
import LoadingFallback from "@/components/common/Fallback/LoadingFallback";
import Icon from "@/components/common/Icon";
import LinkButton from "@/components/common/LinkButton";
import Title from "@/components/common/Title";
import SimulationDynamicInformation from "@/components/simulation/detail/SimulationDynamicInformation";
import SimulationStaticInformation from "@/components/simulation/detail/SimulationStaticInformation";
import { useSimulation } from "@/hooks/simulation/useSimulation";

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
  const { status, data, refetch } = useSimulation(id, {
    refetchInterval: (query) => {
      const data = query.state.data;

      // 데이터가 없으면 polling 계속
      if (!data) return 60000;

      const status = data.data.currentStatus.status;

      // COMPLETED, STOPPED, FAILED 상태면 polling 중지
      if (status === "COMPLETED" || status === "STOPPED" || status === "FAILED") {
        return false;
      }

      // PENDING, RUNNING 상태면 1분마다 polling
      return 60000;
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

  return (
    <div className="flex flex-col gap-6">
      <SimulationDetailPageHeader />
      <div className="space-y-6">
        <SimulationStaticInformation simulation={data.data} />
        <SimulationDynamicInformation simulationId={id} />
      </div>
    </div>
  );
}

function SimulationDetailPageHeader() {
  return (
    <div className="flex items-center justify-between">
      <Title title="시뮬레이션 상세 모니터링" />
      <LinkButton to="/simulation">
        <div className="flex items-center gap-1">
          <Icon name="list" className="ml-[-6px]" />
          시뮬레이션 목록
        </div>
      </LinkButton>
    </div>
  );
}
