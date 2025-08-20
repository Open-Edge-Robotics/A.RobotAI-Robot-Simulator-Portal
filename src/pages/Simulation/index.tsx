import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { Button, Pagination as InnogridPagination } from "innogrid-ui";

import { QUERY_KEYS } from "@/apis/constants";
import { simulationAPI } from "@/apis/simulation";
import Container from "@/components/common/Container.tsx";
import ErrorFallback from "@/components/common/Fallback/ErrorFallback";
import LoadingFallback from "@/components/common/Fallback/LoadingFallback";
import Icon from "@/components/common/Icon";
import { useSimulationActions } from "@/hooks/simulation";

import Title from "./create/Title";
import FilterToolbar from "./FilterToolbar";
import SimulationOverview from "./SimulationOverview";
import SimulationTable from "./SimulationTable";
import type { AllowedParam, PatternTypeFilterOption, StatusFilterOption } from "./types";
import { getValidParams } from "./utils";

export default function SimulationPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { status, data, refetch } = useQuery({
    queryKey: [...QUERY_KEYS.simulation, searchParams.toString()],
    queryFn: () => {
      const paramsWithDefaultValue = new URLSearchParams(searchParams);
      if (!searchParams.get("page")) {
        paramsWithDefaultValue.set("page", "1");
      }
      return simulationAPI.getSimulations(paramsWithDefaultValue);
    },
  });
  const { actions: simulationActions, isLoading } = useSimulationActions();

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
      <div className="flex items-center justify-between">
        <Title title="시뮬레이션 관리" />
        <SimulationCreateButton />
      </div>
      <SimulationOverview overview={overview} />
      <FilterToolbar
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
      {status === "pending" && <LoadingFallback message="시뮬레이션 정보를 불러오는 중입니다." />}
      {status === "success" && (
        <>
          <SimulationTable simulations={simulations} actions={simulationActions} isLoading={isLoading} />
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
    <Link to="/simulation/create">
      <Button size="large">
        <div className="flex items-center gap-1">
          <Icon name="add" className="ml-[-6px]" />
          시뮬레이션 생성
        </div>
      </Button>
    </Link>
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
