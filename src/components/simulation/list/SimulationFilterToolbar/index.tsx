import { Select } from "innogrid-ui";

import Divider from "@/components/common/Divider";
import Icon from "@/components/common/Icon";

import { FILTER_OPTIONS } from "@/constants/simulation";

import type {
  AllowedParam,
  PatternTypeFilterOption,
  PeriodFilterOption,
  StatusFilterOption,
} from "@/types/simulation/domain";

import PeriodFilter from "./PeriodFilter";

interface SimulationFilterToolbarProps {
  statusFilterValue: StatusFilterOption | null;
  onStatusFilterChange: (value: StatusFilterOption | null) => void;
  patternTypeFilterValue: PatternTypeFilterOption | null;
  onPatternTypeFilterChange: (value: PatternTypeFilterOption | null) => void;
  onReset: () => void;
  startDate?: string;
  endDate?: string;
  selectedPeriod: PeriodFilterOption | null;
  handleQueriesChange: (queries: Partial<Record<AllowedParam, string | null>>) => void;
}

export default function SimulationFilterToolbar({
  statusFilterValue,
  onStatusFilterChange,
  patternTypeFilterValue,
  onPatternTypeFilterChange,
  onReset,
  startDate,
  endDate,
  selectedPeriod,
  handleQueriesChange,
}: SimulationFilterToolbarProps) {
  return (
    <div className="flex h-10 flex-wrap items-center gap-5">
      <FilterSelect
        selectedStatus={statusFilterValue}
        selectedPatternType={patternTypeFilterValue}
        onStatusChange={onStatusFilterChange}
        onPatternTypeChange={onPatternTypeFilterChange}
        startDate={startDate}
        endDate={endDate}
        selectedPeriod={selectedPeriod}
        handleQueriesChange={handleQueriesChange}
      />
      <Divider orientation="vertical" />
      <ResetButton onClick={onReset} />
    </div>
  );
}

interface FilterSelectProps {
  selectedStatus: StatusFilterOption | null;
  selectedPatternType: PatternTypeFilterOption | null;
  startDate?: string;
  endDate?: string;
  onStatusChange: (value: StatusFilterOption | null) => void;
  onPatternTypeChange: (value: PatternTypeFilterOption | null) => void;
  selectedPeriod: PeriodFilterOption | null;
  handleQueriesChange: (queries: Partial<Record<AllowedParam, string | null>>) => void;
}

function FilterSelect({
  selectedStatus,
  selectedPatternType,
  startDate,
  endDate,
  onStatusChange,
  onPatternTypeChange,
  selectedPeriod,
  handleQueriesChange,
}: FilterSelectProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-50">
        <Icon name="filter_alt" className="text-gray-500" />
      </div>
      <Select
        options={FILTER_OPTIONS.status}
        value={FILTER_OPTIONS.status.find((option) => option.value === selectedStatus)}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
        size="l-small"
        onChange={(option) => onStatusChange(option ? option.value : FILTER_OPTIONS.status[0].value)}
        placeholder="상태"
        isClearable
      />
      <Select
        options={FILTER_OPTIONS.patternType}
        value={FILTER_OPTIONS.patternType.find((option) => option.value === selectedPatternType)}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
        size="l-small"
        onChange={(option) => onPatternTypeChange(option ? option.value : FILTER_OPTIONS.patternType[0].value)}
        placeholder="패턴 타입"
        isClearable
      />
      <PeriodFilter
        key={`${selectedPeriod}-${startDate}-${endDate}`} // selectedPeriod, startDate, endDate 변경 시 상태 리셋하기 위함
        startDate={startDate}
        endDate={endDate}
        selectedPeriod={selectedPeriod}
        onPeriodChange={(dateQueries) => handleQueriesChange(dateQueries)}
      />
    </div>
  );
}

function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex cursor-pointer items-center gap-1 text-sm text-gray-400 hover:text-gray-700"
    >
      <span className="hidden sm:inline">필터 초기화</span>
      <Icon name="refresh" size="20px" />
    </button>
  );
}
