import { Select } from "innogrid-ui";

import Divider from "@/components/common/Divider";
import Icon from "@/components/common/Icon";

import { FILTER_OPTIONS } from "../../../constants/simulation";
import type { PatternTypeFilterOption, StatusFilterOption } from "../../../types/simulation/domain";

interface SimulationFilterToolbarProps {
  statusFilterValue: StatusFilterOption | null;
  onStatusFilterChange: (value: StatusFilterOption | null) => void;
  patternTypeFilterValue: PatternTypeFilterOption | null;
  onPatternTypeFilterChange: (value: PatternTypeFilterOption | null) => void;
  onReset: () => void;
}

export default function SimulationFilterToolbar({
  statusFilterValue,
  onStatusFilterChange,
  patternTypeFilterValue,
  onPatternTypeFilterChange,
  onReset,
}: SimulationFilterToolbarProps) {
  return (
    <div className="flex h-10 items-center gap-5">
      <FilterSelect
        selectedStatus={statusFilterValue}
        selectedPatternType={patternTypeFilterValue}
        onStatusChange={onStatusFilterChange}
        onPatternTypeChange={onPatternTypeFilterChange}
      />
      <Divider orientation="vertical" />
      <ResetButton onClick={onReset} />
    </div>
  );
}

interface FilterSelectProps {
  selectedStatus: StatusFilterOption | null;
  selectedPatternType: PatternTypeFilterOption | null;
  onStatusChange: (value: StatusFilterOption | null) => void;
  onPatternTypeChange: (value: PatternTypeFilterOption | null) => void;
}

function FilterSelect({ selectedStatus, selectedPatternType, onStatusChange, onPatternTypeChange }: FilterSelectProps) {
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
    </div>
  );
}

function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex cursor-pointer items-center gap-1 text-sm text-gray-400 hover:text-gray-700"
    >
      <span>필터 초기화</span>
      <Icon name="refresh" className="mt-0.5" size="20px" />
    </button>
  );
}
