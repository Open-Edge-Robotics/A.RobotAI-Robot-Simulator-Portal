"use client";

import React from "react";
import { useForm } from "react-hook-form";
import PageTitle from "@/components/common/PageTitle";
import FilterGroup, {
  FilterGroupFormData,
} from "@/components/shared/FilterGroup";
import { COLUMN_LIST } from "@/constants/instance";
import {
  MOCK_INSTANCE_LIST,
  MOCK_SIMULATION_OPTION_LIST,
} from "@/constants/mockData/instance";
import { MENU_ITEMS } from "@/constants/navbar";
import {
  createSimulationShema,
  filterShema,
  SCHEMA_NAME,
} from "@/schema/filterSchema";
import { filterDataList } from "@/utils/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@mui/material";
import SimulationListTable from "@/components/shared/SimulationListTable";
import CreateButton from "@/components/shared/CreateButton";
import SimulationCreateDialog from "@/components/shared/SimulationCreateDialog";
import { CreateSimulationFormData } from "@/type/_simulation";

const paginationModel = { page: 0, pageSize: 10 };

export type Simulation = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};

const Simulation = () => {
  const [filterType, setFilterType] = React.useState<string>(
    MOCK_SIMULATION_OPTION_LIST[0].value,
  );
  const [simulationList, setSimulationList] =
    React.useState<Simulation[]>(MOCK_INSTANCE_LIST);
  const [hasResult, setHasResult] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);

  const onSelect = (value: string) => {
    setFilterType(value);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  // TODO: API 연결
  const handleExecute = (id: string) => {
    console.log("실행버튼 클릭", id);
  };
  const handleClickStop = (id: string) => {
    console.log("중지 버튼 클릭", id);
  };
  const handleClickDelete = (id: string) => {
    console.log("삭제 버튼 클릭", id);
  };

  const { register, handleSubmit } = useForm<FilterGroupFormData>({
    resolver: zodResolver(filterShema),
    mode: "onChange",
  });

  const { register: dialogRegister, handleSubmit: dialogHandleSubmit } =
    useForm<CreateSimulationFormData>({
      resolver: zodResolver(createSimulationShema),
      mode: "onChange",
    });

  const handleClickCreate = () => {
    setIsOpen(true);
  };

  const onSubmit = (data: FilterGroupFormData) => {
    const filteredList = filterDataList(
      MOCK_INSTANCE_LIST,
      MOCK_SIMULATION_OPTION_LIST,
      data[SCHEMA_NAME.SEARCH_KEYWORD as keyof FilterGroupFormData],
      filterType,
    );

    if (filteredList.length <= 0) {
      setHasResult(false);
    } else {
      setHasResult(true);
      setSimulationList(filteredList);
    }
  };

  // form 스키마 통과 못했을 때 -> 검색어 X
  const onError = () => {
    setHasResult(true);
    setSimulationList(MOCK_INSTANCE_LIST);
  };

  // TODO: API 연결
  const onSimulationSubmit = (data: CreateSimulationFormData) => {
    console.log(data.description);
  };

  // TODO: 시뮬레이션 생성 실패 UI 추가
  const onSimulationError = () => {
    alert("시뮬레이션 생성 실패");
  };

  return (
    <div className="flex flex-col gap-4">
      <PageTitle className="text-white">{MENU_ITEMS[2].label}</PageTitle>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <CreateButton onClick={handleClickCreate} />
          <FilterGroup
            optionList={MOCK_SIMULATION_OPTION_LIST}
            filterType={filterType}
            onSelect={onSelect}
            register={register}
            handleSubmit={handleSubmit(onSubmit, onError)}
          />
        </div>
        {hasResult && (
          <SimulationListTable
            rows={simulationList}
            columns={COLUMN_LIST}
            paginationModel={paginationModel}
            onExecute={handleExecute}
            onStop={handleClickStop}
            onDelete={handleClickDelete}
          />
        )}
        {!hasResult && (
          <div className="flex h-80 w-full justify-center rounded-[4px] bg-white p-2">
            <div className="self-center">
              <Typography
                variant="h6"
                className="text-sm font-normal text-gray-900"
              >
                검색 결과가 없습니다.
              </Typography>
            </div>
          </div>
        )}
      </div>
      <SimulationCreateDialog
        isOpen={isOpen}
        handleCloseDialog={handleCloseDialog}
        register={dialogRegister}
        handleSubmit={dialogHandleSubmit(onSimulationSubmit, onSimulationError)}
      />
    </div>
  );
};

export default Simulation;
