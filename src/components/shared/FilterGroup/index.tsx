"use client";

import React from "react";
import { Button } from "@mui/material";
import { UseFormRegister } from "react-hook-form";
import { Input } from "@/components/common/Input";
import {
  Select,
  SelectGroup,
  SelectIcon,
  SelectItem,
  SelectTrigger,
  SelectValueText,
} from "@/components/common/Select";
import { SCHEMA_NAME } from "@/schema/filterSchema";

type Option = {
  label: string;
  value: string;
  [key: string]: any;
};

export type FilterGroupFormData = {
  searchKeyword: string;
};

type FilterGroupProps = {
  optionList: Option[];
  filterType: string;
  onSelect: (value: string) => void;
  register: UseFormRegister<FilterGroupFormData>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
};

const FilterGroup = ({
  optionList,
  onSelect,
  register,
  handleSubmit,
}: FilterGroupProps) => {
  return (
    <div className="w-120 flex flex-row gap-2">
      <Select
        className="relative min-w-32 text-center align-middle"
        onSelect={onSelect}
      >
        <SelectTrigger className="w-full rounded-[4px] bg-white py-2 pl-14 pr-16">
          <SelectValueText
            className="text-sm"
            placeholder={optionList[0].label}
          />
        </SelectTrigger>
        <SelectGroup className="top-10 w-full rounded-[4px] bg-white p-2 shadow-md">
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
      <form className="flex w-80 flex-row gap-2" onSubmit={handleSubmit}>
        <Input
          className="w-full px-4 py-2 text-sm placeholder:text-sm"
          placeholder="검색어를 입력해주세요"
          autoComplete="off"
          {...register(SCHEMA_NAME.SEARCH_KEYWORD as keyof FilterGroupFormData)}
        />
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
