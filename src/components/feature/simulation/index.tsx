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
import { filterListByKeyword, formatCreatedAt } from "@/utils/table";
import { zodResolver } from "@hookform/resolvers/zod";
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
import FlexCol from "@/components/common/FlexCol";
import NonContent from "@/components/common/NonContent";
import { useDeleteSimulation } from "@/hooks/simulation/useDeleteSimulation";
import { AxiosError } from "axios";
import { API_MESSAGE } from "@/constants/api/_errorMessage";
import ReloadButton from "@/components/shared/button/ReloadButton";

// datagrid 페이지네이션 설정
export const paginationModel = { page: 0, pageSize: 20 };

const Simulation = () => {
  // API: 시뮬레이션 목록 조회
  const {
    data,
    isLoading: isSimulationListLoading,
    refetch: simulationListRefetch,
  } = useGetSimulationList();
  const [simulationList, setSimulationList] =
    React.useState<SimulationListResponse>([]);
  const [hasResult, setHasResult] = React.useState(true);

  // 시뮬레이션 목록 포맷팅 및 상태 업데이트, 검색 결과 상태 업데이트
  React.useEffect(() => {
    if (!isSimulationListLoading && data) {
      const formattedData = formatCreatedAt<SimulationType>(
        data.data,
        SIMULATION_OPTION_LIST[3].value,
      );
      setSimulationList(formattedData);
      setHasResult(formattedData.length > 0);
    }
  }, [isSimulationListLoading, data]);

  const [filterType, setFilterType] = React.useState<string>(
    SIMULATION_OPTION_LIST[0].value,
  );

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
  const handleExecute = (id: number) => {
    console.log("실행버튼 클릭", id);
  };
  const handleClickStop = (id: number) => {
    console.log("중지 버튼 클릭", id);
  };

  // API: 시뮬레이션 삭제
  const { mutate: simulationDeleteMutate } = useDeleteSimulation();

  // 시뮬레이션 삭제 버튼 클릭
  const handleClickDelete = (id: number) => {
    simulationDeleteMutate(
      {
        simulationId: id,
      },
      {
        onSuccess: () => {
          showToast(API_MESSAGE.SIMULATION.DELETE[201], "success", 2000);
          simulationListRefetch();
        },
        onError: (error: AxiosError<Result<null>>) => {
          if (error.response?.status === 403) {
            showToast(API_MESSAGE.SIMULATION.DELETE[403], "warning", 2000);
          } else if (error.response?.status === 500) {
            showToast(API_MESSAGE.SIMULATION.DELETE[500], "warning", 2000);
          }
        },
      },
    );
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

  // 검색 버튼 클릭 시 (검색어 있을 때)
  const onFilterSubmit = (data: FilterGroupFormData) => {
    const filteredList = filterListByKeyword<SimulationType>(
      simulationList,
      SIMULATION_OPTION_LIST,
      data[SCHEMA_NAME.SEARCH_KEYWORD as keyof FilterGroupFormData],
      filterType,
    );
    const formattedData = formatCreatedAt<SimulationType>(
      filteredList,
      SIMULATION_OPTION_LIST[3].value,
    );

    if (filteredList.length <= 0) {
      setHasResult(false);
    } else {
      setSimulationList(formattedData);
      setHasResult(true);
    }
  };

  // 검색 버튼 클릭 시 (검색어 없을 때)
  const onFilterError = () => {
    if (!data?.data) return;
    const formattedData = formatCreatedAt<SimulationType>(
      data.data,
      SIMULATION_OPTION_LIST[3].value,
    );
    setSimulationList(formattedData);
    setHasResult(true);
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
        onSuccess: () => {
          showToast(API_MESSAGE.SIMULATION.CREATE[201], "success", 2000);
          setIsOpen(false);
          simulationListRefetch();
        },
      },
    );
    dialogReset();
  };

  return (
    <FlexCol className="gap-4">
      <PageTitle className="text-white">{MENU_ITEMS[3].label}</PageTitle>
      <FlexCol className="gap-2">
        <div className="flex justify-between">
          <CreateButton onClick={handleClickCreate} />
          <div className="flex gap-2">
            <ReloadButton />
            <FilterGroup
              optionList={SIMULATION_OPTION_LIST}
              filterType={filterType}
              onSelect={handleSelectFilter}
              register={filterRegister}
              handleSubmit={filterHandleSubmit(onFilterSubmit, onFilterError)}
            />
          </div>
        </div>
        {isSimulationListLoading && (
          <NonContent message="데이터를 불러오는 중입니다" />
        )}
        {hasResult && !isSimulationListLoading && (
          <SimulationListTable
            rows={simulationList}
            columns={SIMULATION_LIST_COLUMN_LIST}
            paginationModel={paginationModel}
            isLoading={isSimulationListLoading}
            onExecute={handleExecute}
            onStop={handleClickStop}
            onDelete={handleClickDelete}
          />
        )}
        {!hasResult && !isSimulationListLoading && <NonContent />}
      </FlexCol>
      <SimulationCreateDialog
        isOpen={isOpen}
        handleCloseDialog={handleCloseDialog}
        register={dialogRegister}
        errors={errors}
        handleSubmit={dialogHandleSubmit(onSimulationSubmit)}
        error={simulationCreateError}
      />
    </FlexCol>
  );
};

export default Simulation;
