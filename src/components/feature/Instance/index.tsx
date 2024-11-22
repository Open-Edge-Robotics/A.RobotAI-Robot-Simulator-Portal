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
import {
  MOCK_INSTANCE_LIST,
  MOCK_OPTION_LIST,
} from "@/constants/mockData/instance";
import { INSTANCE_LIST_COLUMN_LIST } from "@/constants/_tableColumn";
import {
  createInstanceSchema,
  filterShema,
  SCHEMA_NAME,
} from "@/schema/_schema";
import DataGridTable from "@/components/shared/InstanceListTable";
import DetailTable from "@/components/common/DetailTable";
import { HEADER_LIST } from "@/constants/_tableHeader";
import {
  MOCK_INSTANCE_DETAIL,
  MOCK_INSTANCE_DETAIL2,
} from "@/constants/mockData/detailTable";
import SimulationFilter from "@/components/shared/SimulationFilter";
import InstanceCreateDialog from "@/components/shared/InstanceCreateDialog";
import { CreateInstanceFormData } from "@/type/_instance";
import { InstanceListResponse } from "@/type/response/_instance";
import { INSTANCE_OPTION_LIST } from "@/constants/_filterOption";
import {
  InstanceCreatedAtField,
  InstanceDescriptionField,
  InstanceIdField,
  InstanceNameField,
} from "@/type/_field";

const paginationModel = { page: 0, pageSize: 5 };

const HEADERS_PER_COLUMN = 4;

const MOCK_SIMULATION_LIST = [
  { label: "시뮬레이션1", value: "시뮬레이션1" },
  { label: "시뮬레이션2", value: "시뮬레이션2" },
];

const Instance = () => {
  // TODO: 시뮬레이션 리스트는 화면 첫 렌더링시 api 요청해서 setSimulationList 담기
  // TODO: 인스턴스 생성, 중지, 실행, 삭제할때 refetch trigger
  const [simulationList, setSimulationList] =
    React.useState<Option[]>(MOCK_SIMULATION_LIST);
  const [filterType, setFilterType] = React.useState<string>(
    MOCK_OPTION_LIST[0].value,
  );
  const [instanceList, setInstanceList] =
    React.useState<InstanceListResponse>(MOCK_INSTANCE_LIST);
  const [hasResult, setHasResult] = React.useState(true);
  const [instanceDetail, setInstanceDetail] =
    React.useState(MOCK_INSTANCE_DETAIL);
  const [checkedRowList, setCheckedRowList] = React.useState<string[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedSimulationId, setSelectedSimulationId] = React.useState("");
  const [selectedTemplateId, setSelectedTemplateId] = React.useState("");

  // TODO: 행 클릭 시 인스턴스 상세 정보 조회 -> 데이터 가공 -> DetailTable에 전달
  const handleRowClick = (params: any) => {
    const clickedRow = params.row;
    console.log("Clicked row data:", clickedRow); // 콘솔에 출력
    setInstanceDetail(MOCK_INSTANCE_DETAIL2);
    // TODO: clikedRow에서 인스턴스 아이디 가져와 인스턴스 상세 조회
    // TODO: instanceDetail 업데이트
  };

  // TODO: 1개 이상 체크박스 클릭 시 실행. 선택된 id들 배열로 state에 저장
  const hanldeMultpleRowClick = (params: any) => {
    const selectedIds = params as string[]; // 선택된 row의 ID 배열
    // console.log(selectedIds, "selectedIds");
    setCheckedRowList(selectedIds);
  };

  const filterInstances = (
    instances: InstanceListResponse,
    keyword: string,
    filterType: string,
  ) => {
    return instances.filter((instance) => {
      if (filterType === MOCK_OPTION_LIST[0].value) {
        return instance[INSTANCE_OPTION_LIST[0].value as keyof InstanceIdField]
          .toString()
          .includes(keyword);
      } else if (filterType === MOCK_OPTION_LIST[1].value) {
        return instance[
          INSTANCE_OPTION_LIST[1].value as keyof InstanceNameField
        ]
          .toLowerCase()
          .includes(keyword.toLowerCase());
      } else if (filterType === MOCK_OPTION_LIST[2].value) {
        return instance[
          INSTANCE_OPTION_LIST[2].value as keyof InstanceDescriptionField
        ]
          .toLowerCase()
          .includes(keyword.toLowerCase());
      } else if (filterType === MOCK_OPTION_LIST[3].value) {
        return instance[
          INSTANCE_OPTION_LIST[3].value as keyof InstanceCreatedAtField
        ].includes(keyword);
      }
      return true;
    });
  };

  const onSelect = (value: string) => {
    setFilterType(value);
  };

  const { register, handleSubmit } = useForm<FilterGroupFormData>({
    resolver: zodResolver(filterShema),
    mode: "onChange",
  });

  const onSubmit = (data: FilterGroupFormData) => {
    const filteredList = filterInstances(
      MOCK_INSTANCE_LIST,
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
  const handleSelectSimulation = () => {
    // TODO: 인스턴스 목록 조회 api 결과로 인스턴스 목록 state 변경
  };

  const { register: instanceRegister, handleSubmit: instanceHandleSubmit } =
    useForm<CreateInstanceFormData>({
      resolver: zodResolver(createInstanceSchema),
      mode: "onChange",
    });

  const onInstanceSubmit = (data: CreateInstanceFormData) => {
    console.log(data, "데이터요");
    console.log(selectedSimulationId, selectedTemplateId, "아이디 2개");
  };

  const onInstanceError = () => {};

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <PageTitle className="text-white">{MENU_ITEMS[1].label}</PageTitle>
        <SimulationFilter
          optionList={simulationList}
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
            optionList={MOCK_OPTION_LIST}
            filterType={filterType}
            onSelect={onSelect}
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
      <DetailTable
        headerList={HEADER_LIST}
        data={instanceDetail}
        headersPerColumn={HEADERS_PER_COLUMN}
      />
      <InstanceCreateDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        register={instanceRegister}
        handleSubmit={instanceHandleSubmit(onInstanceSubmit, onInstanceError)}
        setSelectedSimulationId={setSelectedSimulationId}
        setSelectedTemplateId={setSelectedTemplateId}
      />
    </div>
  );
};

export default Instance;
