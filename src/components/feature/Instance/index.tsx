"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MENU_ITEMS } from "@/constants/_navbar";
import PageTitle from "@/components/common/PageTitle";
import ButtonGroup from "@/components/shared/ButtonGroup";
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
import DataGridTable from "@/components/shared/InstanceListTable";
import DetailTable from "@/components/common/DetailTable";
import { HEADER_LIST } from "@/constants/_tableHeader";
import SimulationFilter from "@/components/shared/SimulationFilter";
import InstanceCreateDialog from "@/components/shared/InstanceCreateDialog";
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
import { Typography } from "@/components/common/Typography";
import { BaseInstance } from "@/type/_field";

const paginationModel = { page: 0, pageSize: 5 };

const HEADERS_PER_COLUMN = 4;

// TODO: 인스턴스 생성, 중지, 실행, 삭제할 때 refetch trigger
const Instance = () => {
  const [selectedSimulationId, setSelectedSimulationId] = React.useState("");

  const [simulationOptionList, setSimulationOptionList] = React.useState<
    Option[]
  >([]);
  const { data: simulationListData, isLoading: isSimulationLoading } =
    useGetSimulationList();

  // 화면 첫 렌더링 시 시뮬레이션 목록 조회 api 요청
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
  const {
    data: instanceListData,
    isLoading: isInstanceLoading,
    refetch: instanceListRefetch,
  } = useGetInstanceList({
    simulationId: Number(selectedSimulationId),
  });

  // 화면 첫 렌더링시 전체 인스턴스 목록 조회 api 요청
  React.useEffect(() => {
    if (!isInstanceLoading && instanceListData) {
      const formattedData = formatCreatedAt<BaseInstance>(
        instanceListData.data,
        "instanceCreatedAt" as keyof BaseInstance,
      );
      setInstanceList(formattedData);
    }
  }, [isInstanceLoading, instanceListData]);

  const [selectedInstanceId, setSelectedInstanceID] = React.useState<number>(0);

  // instanceList가 업데이트되면 selectedInstanceId를 첫 번째 인스턴스로 설정
  React.useEffect(() => {
    if (instanceList.length > 0) {
      setSelectedInstanceID(instanceList[0]?.instanceId);
    }
  }, [instanceList]);

  const [instanceDetail, setInstanceDetail] =
    React.useState<InstanceDetailResponse>({
      instanceNamespace: "",
      instancePortNumber: "",
      instanceAge: "",
      templateType: "",
      instanceVolume: "",
      instanceStatus: "",
      topics: "",
      podName: "",
    });

  const { data: instanceDetailData, isLoading: isInstanceDetailLoading } =
    useGetInstanceDetail({ instanceId: selectedInstanceId });

  React.useEffect(() => {
    if (instanceDetailData && !isInstanceDetailLoading) {
      setInstanceDetail(instanceDetailData.data);
    }
  }, [instanceDetailData, isInstanceDetailLoading]);

  // TODO: 행 클릭 시 인스턴스 상세 정보 조회 -> 데이터 가공 -> DetailTable에 전달
  const handleRowClick = (params: GridRowParams) => {
    const { row } = params;
    setSelectedInstanceID(row.instanceId);
  };

  const [filterType, setFilterType] = React.useState<string>(
    INSTANCE_OPTION_LIST[0].value,
  );
  const [hasResult, setHasResult] = React.useState(true);
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

  const onSelectFilter = (value: string) => {
    setFilterType(value);
  };

  const { register, handleSubmit } = useForm<FilterGroupFormData>({
    resolver: zodResolver(filterShema),
    mode: "onChange",
  });

  // 필터링 검색 버튼 클릭 시
  const onSubmit = (data: FilterGroupFormData) => {
    if (!instanceListData) return;
    const filteredList = filterInstances(
      instanceListData.data,
      data[SCHEMA_NAME.SEARCH_KEYWORD as keyof FilterGroupFormData],
      filterType,
    );

    if (filteredList.length <= 0) {
      setHasResult(false);
    } else {
      setHasResult(true);
      setInstanceList(filteredList);
    }
  };

  const handleCreate = () => {
    setIsOpen(true);
  };
  const handleExecute = () => {};
  const handleDelete = () => {};

  // TODO: 시뮬레이션 선택에 따라 인스턴스 목록 변경됨
  const handleSelectSimulation = (value: string) => {
    setSelectedSimulationId(value);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    instanceReset();
    setIsError({
      simulationId: false,
      templateId: false,
    });
  };

  const {
    register: instanceRegister,
    handleSubmit: instanceHandleSubmit,
    formState: { errors },
    reset: instanceReset,
  } = useForm<CreateInstanceFormType>({
    resolver: zodResolver(createInstanceSchema),
    mode: "onChange",
  });

  const { mutate: instanceCreateMutate, error: instanceCreateError } =
    usePostInstance();

  // 인스턴스 생성 모달에서 인스턴스 생성 시
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
          onSuccess: ({ message }) => {
            showToast(message, "success", 2000);
            setIsOpen(false);
            instanceListRefetch();
          },
          // 에러 처리는 인스턴스 생성 팝업에서 진행
        },
      );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <PageTitle className="text-white">{MENU_ITEMS[1].label}</PageTitle>
        <SimulationFilter
          optionList={simulationOptionList}
          onSelect={handleSelectSimulation}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <ButtonGroup
            isExecuteActive={checkedRowList?.length > 0}
            isDeleteActive={checkedRowList?.length > 0}
            onCreate={handleCreate}
            onExecute={handleExecute}
            onDelete={handleDelete}
          />
          <FilterGroup
            optionList={INSTANCE_OPTION_LIST}
            filterType={filterType}
            onSelect={onSelectFilter}
            register={register}
            handleSubmit={handleSubmit(onSubmit)}
          />
        </div>
        {hasResult && (
          <DataGridTable
            rows={instanceList}
            columns={INSTANCE_LIST_COLUMN_LIST}
            paginationModel={paginationModel}
            onRowClick={handleRowClick}
            onMultipleRowClick={hanldeMultpleRowClick}
          />
        )}
        {!hasResult && <span>검색 결과 없음</span>}
      </div>
      {!instanceDetail && <Typography tag="h6">로딩중</Typography>}
      {instanceDetail && (
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
    </div>
  );
};

export default Instance;
