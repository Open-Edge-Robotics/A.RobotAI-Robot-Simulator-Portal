"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MENU_ITEMS } from "@/constants/_navbar";
import PageTitle from "@/components/common/PageTitle";
import ButtonGroup from "@/components/shared/button/ButtonGroup";
import FilterGroup, {
  FilterGroupFormData,
  Option,
} from "@/components/shared/FilterGroup";
import { INSTANCE_LIST_COLUMN_LIST } from "@/constants/_tableColumn";
import {
  createInstanceSchema,
  filterShema,
  SCHEMA_NAME,
} from "@/schema/_schema";
import InstanceListTable from "@/components/shared/instance/InstanceListTable";
import DetailTable from "@/components/common/DetailTable";
import { HEADER_LIST } from "@/constants/_tableHeader";
import SimulationFilter from "@/components/shared/simulation/SimulationFilter";
import InstanceCreateDialog from "@/components/shared/instance/InstanceCreateDialog";
import { CreateInstanceFormType } from "@/type/_instance";
import {
  InstanceDetailResponse,
  InstanceListResponse,
} from "@/type/response/_instance";
import { INSTANCE_OPTION_LIST } from "@/constants/_filterOption";
import { filterInstances, formatCreatedAt } from "@/utils/table";
import { transformResponseToOptionList } from "@/utils/option";
import { useGetSimulationList } from "@/hooks/simulation/useGetSimulationList";
import { usePostInstance } from "@/hooks/instance/usePostInstance";
import { useToastStore } from "@/stores/useToastStore";
import { useGetInstanceList } from "@/hooks/instance/useGetInstanceList";
import { useGetInstanceDetail } from "@/hooks/instance/useGetInstanceDetail";
import { GridRowParams, GridRowSelectionModel } from "@mui/x-data-grid";
import { BaseInstance } from "@/type/_field";
import FlexCol from "@/components/common/FlexCol";
import { Typography } from "@mui/material";
import NonContent from "@/components/common/NonContent";
import { useDeleteInstanceList } from "@/hooks/instance/useDeleteInstanceList";
import { API_MESSAGE } from "@/constants/api/_errorMessage";
import { useStartInstanceList } from "@/hooks/instance/useStartInstanceList";
import LoadingBar from "@/components/common/LoadingBar";
import ReloadButton from "@/components/shared/button/ReloadButton";
import { useQueryClient } from "@tanstack/react-query";

const paginationModel = { page: 0, pageSize: 15 };

const HEADERS_PER_COLUMN = 4;

// TODO: 인스턴스 생성, 중지, 실행, 삭제할 때 refetch trigger
const Instance = () => {
  const [selectedSimulationId, setSelectedSimulationId] = React.useState<
    undefined | string
  >(undefined);

  // 체크박스 클릭한 시뮬레이션 리스트
  const [simulationOptionList, setSimulationOptionList] = React.useState<
    Option[]
  >([]);
  // API: 시뮬레이션 목록 조회
  const { data: simulationListData, isLoading: isSimulationLoading } =
    useGetSimulationList();

  // 시뮬레이션 목록 포맷팅 및 상태 업데이트
  React.useEffect(() => {
    if (!isSimulationLoading && simulationListData) {
      const formattedData = transformResponseToOptionList(
        simulationListData.data,
        SCHEMA_NAME.SIMULATION.ID,
        SCHEMA_NAME.SIMULATION.NAME,
      );
      setSimulationOptionList(formattedData);
    }
  }, [isSimulationLoading, simulationListData]);

  const [instanceList, setInstanceList] = React.useState<InstanceListResponse>(
    [],
  );
  // API: 인스턴스 목록 조회
  const {
    data: instanceListData,
    isLoading: isInstanceListLoading,
    refetch: instanceListRefetch,
  } = useGetInstanceList({
    simulationId: Number(selectedSimulationId) || undefined,
  });

  // 전체 인스턴스 목록 상태 업데이트
  React.useEffect(() => {
    if (!instanceListData?.data?.[0]?.instanceCreatedAt) {
      setInstanceList([]);
      setHasResult(false);
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

  const [selectedInstanceId, setSelectedInstanceID] = React.useState<number>(0);
  const [hasResult, setHasResult] = React.useState(true);
  // instanceList가 업데이트되면 selectedInstanceId를 첫 번째 인스턴스로 설정
  React.useEffect(() => {
    if (instanceList.length > 0) {
      setSelectedInstanceID(instanceList[0]?.instanceId);
    } else {
      setInstanceDetail({
        instanceNamespace: "",
        instanceStatus: "",
        instanceImage: "",
        instanceAge: "",
        instanceLabel: "",
        templateType: "",
        topics: "",
        podName: "",
      });
    }
  }, [instanceList]);

  const [instanceDetail, setInstanceDetail] =
    React.useState<InstanceDetailResponse>({
      instanceNamespace: "",
      instanceStatus: "",
      instanceImage: "",
      instanceAge: "",
      instanceLabel: "",
      templateType: "",
      topics: "",
      podName: "",
    });

  // API: 인스턴스 상세 조회
  const { data: instanceDetailData, isLoading: isInstanceDetailLoading } =
    useGetInstanceDetail(
      { instanceId: selectedInstanceId },
      // selectedId가 0(초기값)이 아닐 때만 api 요청하기
      { enabled: selectedInstanceId !== 0 },
    );

  // 인스턴스 상세 상태 업데이트
  React.useEffect(() => {
    if (!isInstanceDetailLoading && instanceDetailData?.data.instanceAge) {
      setInstanceDetail(instanceDetailData.data);
    }
    setHasResult(!!instanceDetailData?.data.instanceAge);
  }, [instanceDetailData, isInstanceDetailLoading]);

  // 테이블 행 클릭 시 해당 행의 인스턴스 아이디 업데이트
  const handleRowClick = (params: GridRowParams) => {
    const { row } = params;
    setSelectedInstanceID(row.instanceId);
  };

  const [filterType, setFilterType] = React.useState<string>(
    INSTANCE_OPTION_LIST[0].value,
  );

  const [checkedRowList, setCheckedRowList] = React.useState<string[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState({
    simulationId: "",
    templateId: "",
  });
  const [isError, setIsError] = React.useState({
    templateId: false,
    simulationId: false,
  });
  const showToast = useToastStore((state) => state.showToast);

  const setSimulationId = (id: string) => {
    setSelectedIds((prev) => ({ ...prev, simulationId: id }));
    setIsError((prev) => ({ ...prev, simulationId: false }));
  };

  const setTemplateId = (id: string) => {
    setSelectedIds((prev) => ({ ...prev, templateId: id }));
    setIsError((prev) => ({ ...prev, templateId: false }));
  };

  // 클릭된 체크 박스 row 아이디 수집
  const hanldeMultpleRowClick = (rowSelectionModel: GridRowSelectionModel) => {
    const selectedIds = rowSelectionModel as string[];
    setCheckedRowList(selectedIds);
  };

  // 필터 클릭 시
  const onSelectFilter = (value: string) => {
    setFilterType(value);
  };

  // 필터 form 관련 hook
  const { register, handleSubmit } = useForm<FilterGroupFormData>({
    resolver: zodResolver(filterShema),
    mode: "onChange",
  });

  // 필터링 검색 버튼 클릭 시
  const onFilerSubmit = (data: FilterGroupFormData) => {
    if (!instanceListData?.data) return;
    const filteredList = filterInstances(
      instanceListData.data,
      data[SCHEMA_NAME.SEARCH_KEYWORD as keyof FilterGroupFormData],
      filterType,
    );

    if (filteredList.length <= 0) {
      setHasResult(false);
    } else {
      setInstanceList(filteredList);
      setHasResult(true);
    }
  };

  // 검색어 없이 검색 버튼 클릭 시 원래 리스트 그대로 보여주기
  const onFilterError = () => {
    if (!instanceListData?.data) return;
    const formattedData = formatCreatedAt<BaseInstance>(
      instanceListData.data,
      INSTANCE_OPTION_LIST[3].value as keyof BaseInstance,
    );
    setInstanceList(formattedData);
    setHasResult(true);
  };

  // 테이블 케밥 버튼 하위 버튼들 handler
  const handleCreate = () => {
    setIsOpen(true);
  };

  // API : 인스턴스 실행
  const { mutate: intanceListStartMutate, isPending: isInstanceStartPending } =
    useStartInstanceList();

  // 체크박스 선택 후 실행버튼 클릭 시
  const handleExecute = () => {
    intanceListStartMutate(
      { instanceIds: checkedRowList, action: "start" },
      {
        onSuccess() {
          showToast(API_MESSAGE.INSTANCE.START[200], "success", 2000);
        },
        onError() {
          showToast(API_MESSAGE.INSTANCE.START[500], "warning", 2000);
        },
      },
    );
  };

  const {
    mutate: instanceListDeleteMutate,
    isPending: isInstanceDeletePending,
  } = useDeleteInstanceList();
  // 체크박스 선택 후 삭제버튼 클릭 시
  const handleDelete = () => {
    instanceListDeleteMutate(checkedRowList, {
      onSuccess() {
        showToast(API_MESSAGE.INSTANCE.DELETE[201], "success", 2000);
        setSelectedSimulationId(undefined);
        instanceListRefetch();
      },
      onError() {
        showToast(API_MESSAGE.INSTANCE.DELETE[500], "warning", 2000);
      },
    });
  };

  // 필터에서 시뮬레이션 선택 시
  const handleSelectSimulation = (value: string) => {
    if (value === "undefined") {
      setSelectedSimulationId(undefined);
    } else {
      setSelectedSimulationId(value);
    }
  };

  // 인스턴스 생성 팝업 닫기 클릭 시
  const handleCloseDialog = () => {
    setIsOpen(false);
    instanceReset();
    setIsError({
      simulationId: false,
      templateId: false,
    });
  };

  // 인스턴스 생성 form 관련 hook
  const {
    register: instanceRegister,
    handleSubmit: instanceHandleSubmit,
    formState: { errors },
    reset: instanceReset,
  } = useForm<CreateInstanceFormType>({
    resolver: zodResolver(createInstanceSchema),
    mode: "onChange",
  });

  // API: 인스턴스 생성
  const { mutate: instanceCreateMutate, error: instanceCreateError } =
    usePostInstance();

  const queryClient = useQueryClient();

  // 인스턴스 생성 팝업 - 생성 버튼 클릭 시
  const onInstanceSubmit = (data: CreateInstanceFormType) => {
    if (!selectedIds.simulationId) {
      setIsError((prev) => ({ ...prev, simulationId: true }));
    }
    if (!selectedIds.templateId) {
      setIsError((prev) => ({ ...prev, templateId: true }));
    }
    if (selectedIds.simulationId && selectedIds.templateId) {
      setIsError({ simulationId: false, templateId: false });

      const { instanceName, instanceCount, instanceDescription } = data;
      const simulationId = Number(selectedIds.simulationId);
      const templateId = Number(selectedIds.templateId);

      instanceCreateMutate(
        {
          instanceName,
          instanceDescription,
          simulationId,
          templateId,
          instanceCount,
        },
        {
          onSuccess: () => {
            showToast(API_MESSAGE.INSTANCE.CREATE[201], "success", 2000);
            setIsOpen(false);
            instanceListRefetch();
            setSelectedIds({ simulationId: "", templateId: "" });
            instanceReset();
            setSelectedSimulationId(undefined);

            // 인스턴스 생성 후에는 파드 상태 pending -> ready 빠르게 업데이트되는 것 보이도록
            setTimeout(() => {
              instanceListRefetch(); // 10초 뒤에 데이터를 다시 가져오기
            }, 20000); // 20000ms = 10초
          },
          // * 에러 처리는 인스턴스 생성 팝업에서 진행
        },
      );
    }
  };

  const isExecuteActive = checkedRowList?.length > 0 && !isInstanceStartPending;
  const isDeleteActive = checkedRowList?.length > 0 && !isInstanceDeletePending;

  return (
    <FlexCol className="gap-4">
      <FlexCol className="gap-1">
        <PageTitle className="text-white">{MENU_ITEMS[1].label}</PageTitle>
        <SimulationFilter
          optionList={[
            { value: "undefined", label: "시뮬레이션 전체" },
            ...simulationOptionList,
          ]}
          onSelect={handleSelectSimulation}
        />
      </FlexCol>
      <FlexCol className="gap-2">
        <div className="flex justify-between">
          <ButtonGroup
            isExecuteActive={isExecuteActive}
            isDeleteActive={isDeleteActive}
            onCreate={handleCreate}
            onExecute={handleExecute}
            onDelete={handleDelete}
          />
          <div className="flex gap-2">
            <ReloadButton />
            <FilterGroup
              optionList={INSTANCE_OPTION_LIST}
              filterType={filterType}
              onSelect={onSelectFilter}
              register={register}
              handleSubmit={handleSubmit(onFilerSubmit, onFilterError)}
            />
          </div>
        </div>
        {isInstanceListLoading && (
          <NonContent message="데이터를 불러오는 중입니다" />
        )}
        {hasResult && !isInstanceListLoading && (
          <InstanceListTable
            rows={instanceList}
            columns={INSTANCE_LIST_COLUMN_LIST}
            paginationModel={paginationModel}
            onRowClick={handleRowClick}
            onMultipleRowClick={hanldeMultpleRowClick}
          />
        )}
        {!hasResult && !isInstanceListLoading && <NonContent />}
      </FlexCol>
      {isInstanceStartPending && (
        <LoadingBar
          isOpen={isInstanceStartPending}
          message="인스턴스 실행 중입니다"
        />
      )}
      {!instanceDetail && <Typography variant="h6">로딩중</Typography>}
      {instanceDetail.instanceAge && (
        <DetailTable
          headerList={HEADER_LIST}
          data={instanceDetail}
          headersPerColumn={HEADERS_PER_COLUMN}
        />
      )}
      <InstanceCreateDialog
        isOpen={isOpen}
        simulationOptionList={simulationOptionList}
        onClose={handleCloseDialog}
        register={instanceRegister}
        errors={errors}
        handleSubmit={instanceHandleSubmit(onInstanceSubmit)}
        setSelectedSimulationId={setSimulationId}
        setSelectedTemplateId={setTemplateId}
        isError={isError}
        error={instanceCreateError}
      />
    </FlexCol>
  );
};

export default Instance;
