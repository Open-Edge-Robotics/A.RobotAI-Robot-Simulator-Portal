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
import React from "react";

type Props = {
  optionList: Option[];
  label: string;
  placeholder: string;
  onSelect: (id: string) => void;
};

const SelectField = ({ optionList, label, placeholder, onSelect }: Props) => {
  return (
    <div className="items-centers flex w-full flex-col justify-center gap-2">
      <Label>{label}</Label>
      <Select
        className="relative w-full rounded-[4px] border border-gray-300 text-center align-middle text-sm placeholder:text-sm"
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
    </div>
  );
};

export default SelectField;
