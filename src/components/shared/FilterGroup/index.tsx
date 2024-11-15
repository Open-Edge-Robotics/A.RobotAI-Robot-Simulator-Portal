"use client";

import { Input } from "@/components/common/Input";
import {
  Select,
  SelectGroup,
  SelectIcon,
  SelectItem,
  SelectTrigger,
  SelectValueText,
} from "@/components/common/Select";
import { Button } from "@mui/material";
import React from "react";

type Option = {
  label: string;
  value: string;
  [key: string]: any;
};

type FilterGroupProps = {
  optionList: Option[];
  placeholder: string;
};

const FilterGroup = ({ optionList, placeholder }: FilterGroupProps) => {
  return (
    <div className="w-120 flex flex-row gap-2">
      <Select className="relative min-w-32 text-center align-middle">
        <SelectTrigger className="w-full rounded-[4px] bg-white py-2 pl-14 pr-16">
          <SelectValueText className="text-sm" placeholder={placeholder} />
        </SelectTrigger>
        <SelectGroup className="w-full rounded-[4px] bg-white p-2 shadow-md">
          {optionList.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className="w-full rounded-[4px] px-2 py-1 hover:bg-gray-200"
            >
              {item.value}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectIcon color="#000000" className="absolute right-2 top-3" />
      </Select>
      <form className="flex w-full flex-row gap-2">
        <Input className="px-4 py-2 text-sm" />
        <Button
          variant="outlined"
          type="submit"
          className="border-emerald-300 bg-emerald-200 text-black-950"
        >
          검색
        </Button>
      </form>
    </div>
  );
};

export default FilterGroup;
