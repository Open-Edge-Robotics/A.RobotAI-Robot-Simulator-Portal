"use client";

import React from "react";
import { useForm } from "react-hook-form";
import PageTitle from "@/components/common/PageTitle";
import FilterGroup, {
  FilterGroupFormData,
} from "@/components/shared/FilterGroup";
import {
  INSTANCE_LIST_COLUMN_LIST,
  SIMULATION_LIST_COLUMN_LIST,
} from "@/constants/_tableColumn";
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
import {
  INSTANCE_OPTION_LIST,
  SIMULATION_OPTION_LIST,
} from "@/constants/_filterOption";
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
import { usePostSimulationAction } from "@/hooks/simulation/usePostSimulationAction";
import LoadingBar from "@/components/common/LoadingBar";
import { GridRowParams } from "@mui/x-data-grid";
import { useGetInstanceList } from "@/hooks/instance/useGetInstanceList";
import { InstanceListResponse } from "@/type/response/_instance";
import { BaseInstance } from "@/type/_field";
import InstanceListTable from "@/components/shared/instance/InstanceListTable";

// datagrid 페이지네이션 설정
export const paginationModel = { page: 0, pageSize: 20 };
const instanceListPageModel = { page: 0, pageSize: 10 };

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
  const [selectedSimulationId, setSelectedSimulationId] =
    React.useState<number>(0);
  const [instanceList, setInstanceList] = React.useState<InstanceListResponse>(
    [],
  );

  // simulationList 업데이트 되면 가장 최근 시뮬레이션ID를 selectedSimulationId로 설정
  React.useEffect(() => {
    if (simulationList.length > 0) {
      setSelectedSimulationId(simulationList[0].simulationId);
    } else {
      setSimulationList([]);
    }
  }, [simulationList]);

  // API: 시뮬레이션별 인스턴스 목록 조회
  const { data: instanceListData, isLoading: isInstanceListLoading } =
    useGetInstanceList({
      simulationId: Number(selectedSimulationId) || undefined,
    });

  // 전체 인스턴스 목록 상태 업데이트
  React.useEffect(() => {
    if (!instanceListData?.data?.[0]?.instanceCreatedAt) {
      setInstanceList([]);
      return;
    }

    if (!isInstanceListLoading && instanceListData?.data) {
      setHasResult(true);
      const formattedData = formatCreatedAt<BaseInstance>(
        instanceListData.data,
        INSTANCE_OPTION_LIST[3].value as keyof BaseInstance,
      );
      setInstanceList(formattedData);
    }
  }, [isInstanceListLoading, instanceListData]);

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

  // API : 시뮬레이션 실행
  const {
    mutate: simulationActionMutate,
    isPending: isSimulationActionPending,
  } = usePostSimulationAction();

  const handleExecute = (simulationId: number) => {
    simulationActionMutate(
      {
        simulationId,
        action: "start",
      },
      {
        onSuccess: () => {
          showToast(API_MESSAGE.SIMULATION.EXECUTE[201], "success", 2000);
        },
        onError: () => {
          showToast(API_MESSAGE.SIMULATION.EXECUTE[500], "warning", 2000);
        },
      },
    );
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

  // 테이블 행 클릭 시 해당 행의 시뮬레이션 아이디 업데이트
  const handleRowClick = (params: GridRowParams) => {
    const { row } = params;
    setSelectedSimulationId(row.simulationId);
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
        <FlexCol className="gap-4">
          {isSimulationListLoading && (
            <NonContent message="데이터를 불러오는 중입니다" />
          )}
          {hasResult && !isSimulationListLoading && (
            <SimulationListTable
              rows={simulationList}
              columns={SIMULATION_LIST_COLUMN_LIST}
              paginationModel={paginationModel}
              isLoading={isSimulationListLoading}
              onRowClick={handleRowClick}
              onExecute={handleExecute}
              onStop={handleClickStop}
              onDelete={handleClickDelete}
            />
          )}
          {!hasResult && !isSimulationListLoading && <NonContent />}
          {!isInstanceListLoading && instanceList[0]?.instanceCreatedAt && (
            <InstanceListTable
              rows={instanceList}
              columns={INSTANCE_LIST_COLUMN_LIST}
              paginationModel={instanceListPageModel}
              onRowClick={handleRowClick}
            />
          )}
          {!isInstanceListLoading && !instanceList[0]?.instanceCreatedAt && (
            <NonContent message="인스턴스가 비어있습니다" />
          )}
        </FlexCol>
      </FlexCol>
      <SimulationCreateDialog
        isOpen={isOpen}
        handleCloseDialog={handleCloseDialog}
        register={dialogRegister}
        errors={errors}
        handleSubmit={dialogHandleSubmit(onSimulationSubmit)}
        error={simulationCreateError}
      />
      {isSimulationActionPending && (
        <LoadingBar
          isOpen={isSimulationActionPending}
          message="시뮬레이션이 실행 중입니다"
        />
      )}
    </FlexCol>
  );
};

export default Simulation;
