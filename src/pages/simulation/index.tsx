import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { Pagination as InnogridPagination } from "innogrid-ui";

import ErrorFallback from "@/components/common/Fallback/ErrorFallback";
import LoadingFallback from "@/components/common/Fallback/LoadingFallback";
import Icon from "@/components/common/Icon";
import LinkButton from "@/components/common/LinkButton";
import Title from "@/components/common/Title";
import SimulationFilterToolbar from "@/components/simulation/SimulationFilterToolbar";
import SimulationList from "@/components/simulation/SimulationList";
import SimulationOverview from "@/components/simulation/SimulationOverview";

import { useSimulations } from "@/hooks/simulation/useSimulations";

import type { AllowedParam, PatternTypeFilterOption, StatusFilterOption } from "@/types/simulation/domain";
import { getValidParams } from "@/utils/simulation/validation";

export default function SimulationListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { status, data, refetch } = useSimulations(searchParams);

  const statusFilterValue = (searchParams.get("status") || "") as StatusFilterOption;
  const patternTypeFilterValue = (searchParams.get("pattern_type") || "") as PatternTypeFilterOption;
  const pageValue = Number(searchParams.get("page")) || 1;
  const pageSizeValue = Number(searchParams.get("size")) || 10;

  const handleChangeQuery = (key: AllowedParam, value: string | null) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set(key, value);
    } else {
      newSearchParams.delete(key); // 빈 값이면 해당 쿼리 제거
    }

    // 쿼리 변경 시 페이지 리셋 (size 변경 시에도 페이지 리셋)
    if (key !== "page") {
      newSearchParams.delete("page");
    }

    setSearchParams(newSearchParams);
  };

  const handleReset = () => {
    setSearchParams(new URLSearchParams());
  };

  // 컴포넌트 마운트 시 URL 쿼리 유효한 값으로 정리
  useEffect(() => {
    const validParams = getValidParams(searchParams);
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
          handleChangeQuery("status", value);
        }}
        patternTypeFilterValue={patternTypeFilterValue}
        onPatternTypeFilterChange={(value) => {
          handleChangeQuery("pattern_type", value);
        }}
        onReset={handleReset}
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
            onChangePage={(value) => {
              handleChangeQuery("page", value);
            }}
            onChangePageSize={(value) => {
              handleChangeQuery("size", value);
            }}
          />
        </>
      )}
    </div>
  );
}

function SimulationCreateButton() {
  return (
    <LinkButton to="/simulation/create" title="시뮬레이션 생성">
      <div className="flex items-center gap-1">
        <Icon name="add" className="ml-[-6px]" />
        시뮬레이션 생성
      </div>
    </LinkButton>
  );
}

interface PaginationProps {
  currentPage: number;
  size: number;
  totalCount: number;
  onChangePage: (value: string) => void;
  onChangePageSize: (value: string) => void;
}

function Pagination({ currentPage, size, totalCount, onChangePage, onChangePageSize }: PaginationProps) {
  return (
    <div className="mt-[-10px] ml-auto w-[400px] p-0">
      <InnogridPagination
        page={currentPage}
        size={size}
        totalCount={totalCount}
        onClickPrev={() => {
          if (currentPage > 1) {
            onChangePage(String(currentPage - 1));
          }
        }}
        onClickNext={() => {
          onChangePage(String(currentPage + 1));
        }}
        onChangePageInput={(e) => {
          onChangePage(e.target.value);
        }}
        onChangePageSize={(e) => {
          onChangePageSize(e.target.value);
        }}
      />
    </div>
  );
}
