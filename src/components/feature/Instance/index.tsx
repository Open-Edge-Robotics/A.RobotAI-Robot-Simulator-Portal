"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MENU_ITEMS } from "@/constants/navbar";
import PageTitle from "@/components/common/PageTitle";
import ButtonGroup from "@/components/shared/ButtonGroup";
import FilterGroup, {
  FilterGroupFormData,
} from "@/components/shared/FilterGroup";
import {
  MOCK_INSTANCE_LIST,
  MOCK_OPTION_LIST,
} from "@/constants/mockData/instance";
import { COLUMN_LIST } from "@/constants/instance";
import { filterShema } from "@/schema/filterSchema";
import DataGridTable from "@/components/common/ListTable";
import DetailTable from "@/components/common/DetailTable";
import { HEADER_LIST } from "@/constants/detailTable";
import { MOCK_DETAIL_TABLE_DATA } from "@/constants/mockData/detailTable";

const paginationModel = { page: 0, pageSize: 5 };

const HEADERS_PER_COLUMN = 4;

type Instance = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};

// TODO: select 선택 후 검색창 채우고 검색 버튼 누르면 필터링
// TODO: row 클릭 시 하단에 인스턴스 상세 정보 보여주기
const Instance = () => {
  const [filterType, setFilterType] = React.useState<string>(
    MOCK_OPTION_LIST[0].value,
  );
  const [selectedRow, setSelectedRow] = React.useState<Instance>({
    id: "0",
    name: "",
    description: "",
    createdAt: "",
  });
  const [instanceList, setInstanceList] =
    React.useState<Instance[]>(MOCK_INSTANCE_LIST);
  const [hasResult, setHasResult] = React.useState(true);
  const [instanceDetail, setInstanceDetail] = React.useState(
    MOCK_DETAIL_TABLE_DATA,
  );

  // TODO: 행 클릭 시 인스턴스 상세 정보 조회 -> 데이터 가공 -> DetailTable에 전달
  const handleRowClick = (params: any) => {
    const clickedRow = params.row;
    setSelectedRow(clickedRow); // 클릭된 행 데이터를 상태에 저장
    console.log("Clicked row data:", clickedRow); // 콘솔에 출력
    // clikedRow에서 인스턴스 아이디 가져와 인스턴스 상세 조회
    // 받은 리스폰스 가공
    // instanceDetail 업데이트
  };

  const filterInstances = (
    instances: Instance[],
    keyword: string,
    filterType: string,
  ) => {
    return instances.filter((instance) => {
      if (filterType === MOCK_OPTION_LIST[0].value) {
        return instance.id.toString().includes(keyword);
      } else if (filterType === MOCK_OPTION_LIST[1].value) {
        return instance.name.toLowerCase().includes(keyword.toLowerCase());
      } else if (filterType === MOCK_OPTION_LIST[2].value) {
        return instance.description
          .toLowerCase()
          .includes(keyword.toLowerCase());
      } else if (filterType === MOCK_OPTION_LIST[3].value) {
        return instance.createdAt.includes(keyword);
      }
      return true; // 기본적으로 모든 항목을 반환
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
    console.log(data.searchKeyword, filterType);
    const filteredList = filterInstances(
      MOCK_INSTANCE_LIST,
      data.searchKeyword,
      filterType,
    );

    console.log(filteredList);

    if (filteredList.length <= 0) {
      setHasResult(false);
    } else {
      setHasResult(true);
      setInstanceList(filteredList);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <PageTitle className="text-white">{MENU_ITEMS[1].label}</PageTitle>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <ButtonGroup />
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
            columns={COLUMN_LIST}
            paginationModel={paginationModel}
            onRowClick={handleRowClick}
          />
        )}
        {!hasResult && <span>검색 결과 없음</span>}
      </div>
      <DetailTable
        headerList={HEADER_LIST}
        // TODO: 행 클릭 시마다 바뀌어야 하는 정보 - > state
        data={instanceDetail}
        headersPerColumn={HEADERS_PER_COLUMN}
      />
    </div>
  );
};

export default Instance;
