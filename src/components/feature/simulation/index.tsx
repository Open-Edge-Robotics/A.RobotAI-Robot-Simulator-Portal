"use client";

import React from "react";
import { useForm } from "react-hook-form";
import PageTitle from "@/components/common/PageTitle";
import FilterGroup, {
  FilterGroupFormData,
} from "@/components/shared/FilterGroup";
import { SIMULATION_LIST_COLUMN_LIST } from "@/constants/_tableColumn";
import { MENU_ITEMS } from "@/constants/_navbar";
import {
  createSimulationShema,
  filterShema,
  SCHEMA_NAME,
} from "@/schema/_schema";
import { filterSimulationList, formatCreatedAt } from "@/utils/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@mui/material";
import SimulationListTable from "@/components/shared/simulation/SimulationListTable";
import CreateButton from "@/components/shared/button/CreateButton";
import SimulationCreateDialog from "@/components/shared/simulation/SimulationCreateDialog";
import { CreateSimulationFormType } from "@/type/_simulation";
import {
  SimulationListResponse,
  SimulationType,
} from "@/type/response/_simulation";
import { SIMULATION_OPTION_LIST } from "@/constants/_filterOption";
import { usePostSimulation } from "@/hooks/simulation/usePostSimulation";
import { useToastStore } from "@/stores/useToastStore";
import { useGetSimulationList } from "@/hooks/simulation/useGetSimulationList";
import { Result } from "@/type/response/_default";
import FlexColContainer from "@/components/common/FlexCol";

// datagrid 페이지네이션 설정
const paginationModel = { page: 0, pageSize: 10 };

const Simulation = () => {
  // API: 시뮬레이션 목록 조회
  const { data, isLoading, refetch } = useGetSimulationList();
  const [simulationList, setSimulationList] =
    React.useState<SimulationListResponse>([]);

  // 시뮬레이션 목록 포맷팅 및 상태 업데이트, 검색 결과 상태 업데이트
  React.useEffect(() => {
    if (!isLoading && data) {
      const formattedData = formatCreatedAt<SimulationType>(
        data.data,
        SIMULATION_OPTION_LIST[3].value,
      );
      setSimulationList(formattedData);
      setHasResult(formattedData.length > 0);
    }
  }, [isLoading, data]);

  const [filterType, setFilterType] = React.useState<string>(
    SIMULATION_OPTION_LIST[0].value,
  );
  const [hasResult, setHasResult] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const showToast = useToastStore((state) => state.showToast);

  // 필터 선택 시 필터 타입 상태 업데이트
  const handleSelectFilter = (value: string) => setFilterType(value);
  // 시뮬레이션 생성 팝업 닫기
  const handleCloseDialog = () => {
    setIsOpen(false);
    dialogReset();
  };
  // 시뮬레이션 생성 버튼 클릭
  const handleClickCreate = () => setIsOpen(true);
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

  // 필터 폼 관련 hook
  const { register: filterRegister, handleSubmit: filterHandleSubmit } =
    useForm<FilterGroupFormData>({
      resolver: zodResolver(filterShema),
      mode: "onChange",
    });

  // 시뮬레이션 생성 폼 관련 hook
  const {
    register: dialogRegister,
    handleSubmit: dialogHandleSubmit,
    formState: { errors },
    reset: dialogReset,
  } = useForm<CreateSimulationFormType>({
    resolver: zodResolver(createSimulationShema),
    mode: "onChange",
  });

  // 검색 버튼 클릭 시
  const onFilterSubmit = (data: FilterGroupFormData) => {
    const filteredList = filterSimulationList(
      simulationList,
      SIMULATION_OPTION_LIST,
      data[SCHEMA_NAME.SEARCH_KEYWORD as keyof FilterGroupFormData],
      filterType,
    );
    setSimulationList(
      formatCreatedAt(
        filteredList,
        SIMULATION_OPTION_LIST[3].value,
      ) as SimulationType[],
    );
  };

  // 검색어 없이 검색 버튼 클릭 시
  const onFilterError = () => {
    setHasResult(true);
    if (!data?.data) return;
    setSimulationList(
      formatCreatedAt(data.data, SIMULATION_OPTION_LIST[3].value) || [],
    );
  };

  // API: 시뮬레이션 생성
  const { mutate: simulationCreateMutate, error: simulationCreateError } =
    usePostSimulation();

  // 시뮬레이션 생성 모달에서 생성 버튼 클릭 시
  const onSimulationSubmit = (data: CreateSimulationFormType) => {
    const { simulationName, simulationDescription } = data;
    simulationCreateMutate(
      {
        simulationName,
        simulationDescription,
      },
      {
        onSuccess: ({ message }: Result<null>) => {
          showToast(message, "success", 2000);
          setIsOpen(false);
          refetch();
        },
      },
    );
    dialogReset();
  };

  if (isLoading) {
    return (
      <Typography variant="h6" className="text-sm font-normal text-gray-900">
        Loading...
      </Typography>
    );
  }

  return (
    <FlexColContainer className="gap-4">
      <PageTitle className="text-white">{MENU_ITEMS[3].label}</PageTitle>
      <FlexColContainer className="gap-2">
        <div className="flex justify-between">
          <CreateButton onClick={handleClickCreate} />
          <FilterGroup
            optionList={SIMULATION_OPTION_LIST}
            filterType={filterType}
            onSelect={handleSelectFilter}
            register={filterRegister}
            handleSubmit={filterHandleSubmit(onFilterSubmit, onFilterError)}
          />
        </div>
        {hasResult && (
          <SimulationListTable
            rows={simulationList}
            columns={SIMULATION_LIST_COLUMN_LIST}
            paginationModel={paginationModel}
            isLoading={isLoading}
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
      </FlexColContainer>
      <SimulationCreateDialog
        isOpen={isOpen}
        handleCloseDialog={handleCloseDialog}
        register={dialogRegister}
        errors={errors}
        handleSubmit={dialogHandleSubmit(onSimulationSubmit)}
        error={simulationCreateError}
      />
    </FlexColContainer>
  );
};

export default Simulation;
