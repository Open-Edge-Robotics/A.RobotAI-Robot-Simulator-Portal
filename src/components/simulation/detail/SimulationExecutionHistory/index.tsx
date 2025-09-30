import { useSearchParams } from "react-router-dom";

import Container from "@/components/common/Container.tsx";
import ErrorFallback from "@/components/common/Fallback/ErrorFallback";
import InformationFallback from "@/components/common/Fallback/InformationFallback";
import LoadingFallback from "@/components/common/Fallback/LoadingFallback";
import Pagination from "@/components/common/Pagination";
import Title from "@/components/common/Title";

import { useSimulationExecutionHistory } from "@/hooks/simulation/detail/useSimulationExecutionHistory";

import ExecutionHistoryTable from "./ExecutionHistoryTable";

interface SimulationExecutionHistoryProps {
  id: number;
}

type PaginationQueryKey = "page" | "size";

export default function SimulationExecutionHistory({ id }: SimulationExecutionHistoryProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, status, refetch } = useSimulationExecutionHistory(id, searchParams);

  const pageValue = Number(searchParams.get("page")) || 1;
  const pageSizeValue = Number(searchParams.get("size")) || 10;

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

  const history = data.data.executions;
  const pagination = data.data.pagination;

  const handlePaginationQueryChange = (key: PaginationQueryKey, value: string | null) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set(key, value);
    } else {
      newSearchParams.delete(key);
    }
    setSearchParams(newSearchParams);
  };

  if (history.length === 0) {
    return <InformationFallback message="시뮬레이션 실행 내역이 없습니다" subMessage="시뮬레이션을 실행해보세요." />;
  }

  return (
    <Container className="p-6">
      <Title title="시뮬레이션 실행 내역" fontSize="text-xl" margin="mb-4" />
      <ExecutionHistoryTable history={history} />
      <Pagination
        currentPage={pageValue}
        size={pageSizeValue}
        totalCount={pagination.totalItems}
        onPageChange={(value) => {
          handlePaginationQueryChange("page", value);
        }}
        onPageSizeChange={(value) => {
          handlePaginationQueryChange("size", value);
        }}
      />
    </Container>
  );
}
