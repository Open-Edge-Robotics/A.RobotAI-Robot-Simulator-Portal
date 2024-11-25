import React from "react";
import { cx } from "class-variance-authority";
import { Label } from "@/components/common/Label";
import {
  Select,
  SelectGroup,
  SelectIcon,
  SelectItem,
  SelectTrigger,
  SelectValueText,
} from "@/components/common/Select";
import { Option } from "@/components/shared/FilterGroup";

type Props = {
  optionList: Option[];
  label: string;
  placeholder: string;
  isError?: boolean;
  onSelect: (id: string) => void;
};

const SelectField = ({
  optionList,
  label,
  placeholder,
  isError,
  onSelect,
}: Props) => {
  return (
    <div className="items-centers relative flex w-full flex-col justify-center gap-2 pb-5">
      <Label>{label}</Label>
      <Select
        className={cx(
          "relative w-full rounded-[4px] border border-gray-300 text-center align-middle text-sm placeholder:text-sm",
          isError && "border-green-500",
        )}
        onSelect={onSelect}
      >
        <SelectTrigger className="w-full rounded-[4px] bg-white py-2 pl-14 pr-16">
          <SelectValueText className="text-sm" placeholder={placeholder} />
        </SelectTrigger>
        <SelectGroup className="top-10 max-h-44 w-full rounded-[4px] bg-white p-2 shadow-md">
          {optionList.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              label={item.label}
              className="w-full rounded-[4px] px-2 py-1 text-sm hover:bg-gray-200"
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectIcon color="#000000" className="absolute right-2 top-3" />
      </Select>
      {isError && (
        <span className="absolute bottom-0 text-xs text-green-500">
          {label}을 선택하세요
        </span>
      )}
    </div>
  );
};

export default SelectField;
