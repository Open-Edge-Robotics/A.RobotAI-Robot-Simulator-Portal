import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import ErrorFallback from "@/components/common/Fallback/ErrorFallback";
import LoadingFallback from "@/components/common/Fallback/LoadingFallback";
import Icon from "@/components/common/Icon";
import LinkButton from "@/components/common/LinkButton";
import Pagination from "@/components/common/Pagination";
import Title from "@/components/common/Title";
import SimulationFilterToolbar from "@/components/simulation/SimulationFilterToolbar";
import SimulationList from "@/components/simulation/SimulationList";
import SimulationOverview from "@/components/simulation/SimulationOverview";

import { SEGMENTS } from "@/constants/navigation";

import { useSimulations } from "@/hooks/simulation/core/useSimulations";

import type {
  AllowedParam,
  PatternTypeFilterOption,
  PeriodFilterOption,
  StatusFilterOption,
} from "@/types/simulation/domain";

import { getValidSearchParams } from "@/utils/simulation/validations";

export default function SimulationListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { status, data, refetch } = useSimulations(searchParams);

  const statusFilterValue = (searchParams.get("status") || "") as StatusFilterOption;
  const patternTypeFilterValue = (searchParams.get("pattern_type") || "") as PatternTypeFilterOption;
  const pageValue = Number(searchParams.get("page")) || 1;
  const pageSizeValue = Number(searchParams.get("size")) || 10;
  const selectedPeriod = (searchParams.get("period") || "") as PeriodFilterOption;
  const startDate = searchParams.get("start_date") ?? undefined;
  const endDate = searchParams.get("end_date") ?? undefined;

  const handleQueriesChange = (queries: Partial<Record<AllowedParam, string | null>>) => {
    const newSearchParams = new URLSearchParams(searchParams);

    for (const [key, value] of Object.entries(queries)) {
      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key); // 빈 값이면 해당 쿼리 제거
      }

      // 쿼리 변경 시 페이지 리셋 (size 변경 시에도 페이지 리셋)
      if (key !== "page") {
        newSearchParams.delete("page");
      }
    }

    setSearchParams(newSearchParams);
  };

  const handleReset = () => {
    setSearchParams(new URLSearchParams());
  };

  // 컴포넌트 마운트 시 URL 쿼리 유효한 값으로 정리
  useEffect(() => {
    const validParams = getValidSearchParams(searchParams);
    if (validParams) {
      setSearchParams(validParams);
    }
  }, [searchParams, setSearchParams]);

  const overview = status === "success" ? data.data.overview : null;
  const simulations = status === "success" ? data.data.simulations : [];
  const pagination = status === "success" ? data.data.pagination : null;

  return (
    <div className="bg-gray-10 flex min-h-full flex-col gap-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Title title="시뮬레이션 관리" />
        <SimulationCreateButton />
      </div>
      <SimulationOverview overview={overview} />
      <SimulationFilterToolbar
        statusFilterValue={statusFilterValue}
        onStatusFilterChange={(value) => {
          handleQueriesChange({ status: value });
        }}
        patternTypeFilterValue={patternTypeFilterValue}
        onPatternTypeFilterChange={(value) => {
          handleQueriesChange({ pattern_type: value });
        }}
        onReset={handleReset}
        handleQueriesChange={handleQueriesChange}
        startDate={startDate}
        endDate={endDate}
        selectedPeriod={selectedPeriod}
      />

      {status === "error" && (
        <ErrorFallback
          onRetry={refetch}
          message="시뮬레이션 정보를 불러올 수 없습니다."
          subMessage="네트워크 연결을 확인하거나 잠시 후 다시 시도해 주세요."
        />
      )}
      {status === "pending" && <LoadingFallback message="시뮬레이션 정보를 불러오고 있습니다." />}
      {status === "success" && (
        <>
          <SimulationList simulations={simulations} />
          <Pagination
            currentPage={pageValue}
            size={pageSizeValue}
            totalCount={pagination!.totalItems}
            onPageChange={(value) => {
              handleQueriesChange({ page: value });
            }}
            onPageSizeChange={(value) => {
              handleQueriesChange({ size: value });
            }}
          />
        </>
      )}
    </div>
  );
}

function SimulationCreateButton() {
  return (
    <LinkButton to={`${SEGMENTS.absolute.simulation}/${SEGMENTS.relative.create}`}>
      <div className="flex items-center gap-1">
        <Icon name="add" className="ml-[-6px]" />새 시뮬레이션
      </div>
    </LinkButton>
  );
}
