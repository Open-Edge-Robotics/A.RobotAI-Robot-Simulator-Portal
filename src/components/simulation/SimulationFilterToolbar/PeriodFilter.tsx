import { useState } from "react";

import { Button, DateField, Select } from "innogrid-ui";

import { FILTER_OPTIONS } from "@/constants/simulation";

import type { PeriodFilterOption } from "@/types/simulation/domain";

import { formatDateToYYYYMMDD } from "@/utils/common/formatting";
import { errorToast } from "@/utils/common/toast";
import { validatePeriodField } from "@/utils/simulation/validation";

interface PeriodFilterProps {
  selectedPeriod: PeriodFilterOption | null;
  onPeriodChange: (dateQueries: {
    start_date: string | null;
    end_date: string | null;
    period: PeriodFilterOption | null;
  }) => void;
  startDate?: string;
  endDate?: string;
}

export default function PeriodFilter({ selectedPeriod, onPeriodChange, startDate, endDate }: PeriodFilterProps) {
  const [isDateSelectorOpen, setIsDateSelectorOpen] = useState(selectedPeriod === "custom");

  const handlePeriodOptionChange = (value: PeriodFilterOption | null) => {
    if (value === "custom") {
      setIsDateSelectorOpen(true);
    } else {
      setIsDateSelectorOpen(false);
      onPeriodChange({ start_date: null, end_date: null, period: value });
    }
  };

  const handlePeriodChange = (newStartDate: string, newEndDate: string) => {
    onPeriodChange({ start_date: newStartDate, end_date: newEndDate, period: "custom" });
  };

  return (
    <>
      <Select
        options={FILTER_OPTIONS.period}
        value={
          isDateSelectorOpen
            ? FILTER_OPTIONS.period.find((option) => option.value === "custom")
            : FILTER_OPTIONS.period.find((option) => option.value === selectedPeriod)
        }
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
        size="l-small"
        onChange={(option) => handlePeriodOptionChange(option ? option.value : FILTER_OPTIONS.period[0].value)}
        placeholder="기간"
        isClearable
      />
      {isDateSelectorOpen && (
        <PeriodSelector initStartDate={startDate} initEndDate={endDate} onSubmit={handlePeriodChange} />
      )}
    </>
  );
}

interface PeriodSelectorProps {
  initStartDate?: string;
  initEndDate?: string;
  onSubmit: (startDate: string, endDate: string) => void;
}

const today = new Date();

function PeriodSelector({ initStartDate, initEndDate, onSubmit }: PeriodSelectorProps) {
  const [startDate, setStartDate] = useState<Date | null>(initStartDate ? new Date(initStartDate) : today);
  const [endDate, setEndDate] = useState<Date | null>(initEndDate ? new Date(initEndDate) : today);

  const handleSubmit = () => {
    const validation = validatePeriodField(startDate, endDate);

    if (!validation.isValid) {
      errorToast(validation.error);
      return;
    }

    // validation에서 non-null 보장
    onSubmit(formatDateToYYYYMMDD(startDate!), formatDateToYYYYMMDD(endDate!));
  };

  return (
    <div className="flex items-center gap-2">
      <DateSelector label="시작 날짜:" value={startDate} onChange={setStartDate} />
      <DateSelector label="종료 날짜:" value={endDate} onChange={setEndDate} />
      <Button onClick={handleSubmit}>적용</Button>
    </div>
  );
}

interface DateSelectorProps {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
}

function DateSelector({ label, value, onChange }: DateSelectorProps) {
  return (
    <div className="flex items-center gap-1.5">
      <label htmlFor="startDate" className="text-sm text-gray-600">
        {label}
      </label>
      <DateField startDate={value} onChange={onChange} />
    </div>
  );
}
