import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "innogrid-ui";

import Container from "@/components/common/Container.tsx";
import ErrorFallback from "@/components/common/Fallback/ErrorFallback";
import LoadingFallback from "@/components/common/Fallback/LoadingFallback";
import Icon from "@/components/common/Icon";

import { SEGMENTS } from "@/constants/navigation";

import { useDeleteSimulationStatus } from "@/hooks/simulation/detail/useDeleteSimulationStatus";

interface ActionProgressFallbackProps {
  id: number;
}

export default function DeleteActionProgressFallback({ id }: ActionProgressFallbackProps) {
  const { data, status, refetch } = useDeleteSimulationStatus(id);

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

  return data.data.status === "COMPLETED" ? <CompletedView /> : <ProgressView />;
}

function ProgressView() {
  return (
    <Container shadow className="items-center px-6 py-12 text-center">
      <div className="mb-5 flex items-center rounded-full bg-yellow-50 p-4">
        <Icon name="progress_activity" className="animate-spin text-yellow-500" size="48px" fill />
      </div>
      <h3 className="text-lg font-semibold">시뮬레이션 삭제 중</h3>
      <p className="mt-2 text-sm text-gray-500">
        시뮬레이션 데이터를 삭제하고 있습니다.
        <br />
        잠시만 기다려주세요.
      </p>
    </Container>
  );
}

function CompletedView() {
  const navigate = useNavigate();

  // 삭제 완료 시 3초 뒤 목록 페이지로 이동
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate(SEGMENTS.absolute.simulation);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <Container shadow className="items-center px-6 py-12 text-center">
      <div className="mb-5 flex items-center rounded-full bg-green-50 p-4">
        <Icon name="check_circle" className="text-green-500" size="48px" fill />
      </div>
      <h3 className="text-lg font-semibold">시뮬레이션 삭제 완료</h3>
      <p className="mt-2 mb-3 text-sm text-gray-500">
        시뮬레이션 데이터를 삭제했습니다.
        <br />
        3초 후 목록 페이지로 이동합니다.
      </p>
      <Button onClick={() => navigate(SEGMENTS.absolute.simulation)}>지금 바로 이동</Button>
    </Container>
  );
}
