"use client";

import FlexCol from "@/components/common/FlexCol";
import NonContent from "@/components/common/NonContent";
import PageTitle from "@/components/common/PageTitle";
import { paginationModel } from "@/components/feature/simulation";
import ReloadButton from "@/components/shared/button/ReloadButton";
import FilterGroup, {
  FilterGroupFormData,
} from "@/components/shared/FilterGroup";
import TemplateListTable from "@/components/shared/template/TemplateListTable";
import { TEMPLATE_OPTION_LIST } from "@/constants/_filterOption";
import { MENU_ITEMS } from "@/constants/_navbar";
import { TEMPLATE_LIST_COLUMN_LIST } from "@/constants/_tableColumn";
import { API_MESSAGE } from "@/constants/api/_errorMessage";
import { useDeleteTemplate } from "@/hooks/template/useDeleteTemplate";
import { useGetTemplateList } from "@/hooks/template/useGetTemplateList";
import { filterShema, SCHEMA_NAME } from "@/schema/_schema";
import { useToastStore } from "@/stores/useToastStore";
import { Result } from "@/type/response/_default";
import { TemplateBase, TemplateListResponse } from "@/type/response/_template";
import { filterListByKeyword } from "@/utils/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const Template = () => {
  //  API: 템플릿 목록 조회
  const {
    data: templateListData,
    isLoading: isTemplateListLoading,
    refetch: templateListRefetch,
  } = useGetTemplateList();
  const [templateList, setTemplateList] = React.useState<TemplateListResponse>(
    [],
  );

  React.useEffect(() => {
    if (!isTemplateListLoading && templateListData) {
      setTemplateList(templateListData.data);
    }
  }, [isTemplateListLoading, templateListData]);

  const [filterType, setFilterType] = React.useState<string>(
    TEMPLATE_OPTION_LIST[0].value,
  );
  const [hasResult, setHasResult] = React.useState(true);

  // 필터 선택 시 필터 타입 상태 업데이트
  const handleSelectFilter = (value: string) => setFilterType(value);

  // 필터 폼 관련 hook
  const { register: filterRegister, handleSubmit: filterHandleSubmit } =
    useForm<FilterGroupFormData>({
      resolver: zodResolver(filterShema),
      mode: "onChange",
    });

  // 검색 버튼 클릭 시 (검색어 있을 때)
  const onFilterSubmit = (data: FilterGroupFormData) => {
    const filteredList = filterListByKeyword<TemplateBase>(
      templateList,
      TEMPLATE_OPTION_LIST,
      data[SCHEMA_NAME.SEARCH_KEYWORD as keyof FilterGroupFormData],
      filterType,
    );

    if (filteredList.length <= 0) {
      setHasResult(false);
    } else {
      setTemplateList(filteredList);
      setHasResult(true);
    }
  };

  // 검색 버튼 클릭 시 (검색어 없을 때)
  const onFilterError = () => {
    if (!templateListData?.data) return;
    setTemplateList(templateListData.data);
    setHasResult(true);
  };

  const showToast = useToastStore((state) => state.showToast);
  // API: 시뮬레이션 삭제
  const { mutate: templateDeleteMutate } = useDeleteTemplate();

  // 시뮬레이션 삭제 버튼 클릭
  const handleClickDelete = (id: number) => {
    templateDeleteMutate(
      {
        templateId: id,
      },
      {
        onSuccess: () => {
          showToast(API_MESSAGE.TEMPLATE.DELETE[201], "success", 2000);
          templateListRefetch();
        },
        onError: (error: AxiosError<Result<null>>) => {
          if (error.response?.status === 500) {
            showToast(API_MESSAGE.TEMPLATE.DELETE[500], "warning", 2000);
          }
        },
      },
    );
  };

  return (
    <FlexCol className="gap-4">
      <PageTitle className="text-white">{MENU_ITEMS[2].label}</PageTitle>
      <FlexCol className="gap-2">
        <div className="ml-auto flex gap-2">
          <ReloadButton />
          <FilterGroup
            optionList={TEMPLATE_OPTION_LIST}
            filterType={filterType}
            onSelect={handleSelectFilter}
            register={filterRegister}
            handleSubmit={filterHandleSubmit(onFilterSubmit, onFilterError)}
          />
        </div>
        {isTemplateListLoading && (
          <NonContent message="데이터를 불러오는 중입니다" />
        )}
        {hasResult && !isTemplateListLoading && (
          <TemplateListTable
            rows={templateList}
            columns={TEMPLATE_LIST_COLUMN_LIST}
            paginationModel={paginationModel}
            isLoading={isTemplateListLoading}
            onDelete={handleClickDelete}
          />
        )}
        {!hasResult && !isTemplateListLoading && <NonContent />}
      </FlexCol>
    </FlexCol>
  );
};

export default Template;
