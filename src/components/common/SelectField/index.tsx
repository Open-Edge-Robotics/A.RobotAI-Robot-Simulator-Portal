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
import FlexCol from "@/components/common/FlexCol";

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
    <FlexCol className="items-centers relative w-full justify-center gap-2 pb-5">
      <Label>{label}</Label>
      <Select
        className={cx(
          "relative w-full rounded-[4px] text-center align-middle text-sm placeholder:text-sm",
        )}
        onSelect={onSelect}
      >
        <SelectTrigger
          className={cx(
            "w-full rounded-[4px] bg-white py-2 pl-14 pr-16",
            isError && "border-green-500",
          )}
        >
          <SelectValueText placeholder={placeholder} />
        </SelectTrigger>
        <SelectGroup className="top-[42px] max-h-44 w-full rounded-[4px] bg-white p-2 shadow-xl">
          {optionList.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              label={item.label}
              className="w-full rounded-[4px] px-2 py-1"
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
    </FlexCol>
  );
};

export default SelectField;
