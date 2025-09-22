import { useParams } from "react-router-dom";

import ErrorFallback from "@/components/common/Fallback/ErrorFallback";
import LoadingFallback from "@/components/common/Fallback/LoadingFallback";
import Icon from "@/components/common/Icon";
import LinkButton from "@/components/common/LinkButton";
import Title from "@/components/common/Title";
import TemplateForm from "@/components/template/TemplateForm";

import { SEGMENTS } from "@/constants/navigation";

import { useTemplates } from "@/hooks/template/useTemplates";
import { useUpdateTemplate } from "@/hooks/template/useUpdateTemplate";

import type { TemplateFormData } from "@/types/template/domain";

import { isArraysEqualUnique } from "@/utils/common/arrays";
import { templateFormToRequest, templateApiToForm } from "@/utils/template/mappers";

export default function TemplateEditPage() {
  const { id: rawId } = useParams();
  const id = rawId ? Number(rawId) : null;
  const isValidId = id && !isNaN(id);

  return (
    <div className="bg-gray-10 h-full p-6">
      {isValidId ? (
        <TemplateEditPageContent id={id} />
      ) : (
        <ErrorFallback message="잘못된 템플릿 ID입니다." showBackButton />
      )}
    </div>
  );
}

function TemplateEditPageContent({ id }: { id: number }) {
  const { status, data, refetch } = useTemplates();
  const { mutate: updateTemplate, isPending, isSuccess } = useUpdateTemplate(id);

  if (status === "pending") {
    return <LoadingFallback message="템플릿 정보를 불러오는 중입니다." />;
  }

  if (status === "error") {
    return (
      <ErrorFallback
        onRetry={refetch}
        message="템플릿 정보를 불러올 수 없습니다."
        subMessage="네트워크 연결을 확인하거나 잠시 후 다시 시도해 주세요."
        showBackButton
      />
    );
  }

  const template = data.data.find((template) => template.templateId === id);
  if (!template) {
    return <ErrorFallback message="존재하지 않는 템플릿입니다." showBackButton />;
  }

  const templateFormData = templateApiToForm(template);

  const handleUpdateTemplate = (newTemplate: TemplateFormData) => {
    const changedTemplate: Partial<TemplateFormData> = getTemplateChanges(newTemplate, templateFormData);
    console.log(changedTemplate);
    const newTemplateFormData = templateFormToRequest(changedTemplate);
    updateTemplate(newTemplateFormData);
  };

  return (
    <div className="bg-gray-10 flex h-full flex-col gap-6 p-6">
      <TemplateHeader title="템플릿 수정" />
      <TemplateForm
        initialData={templateFormData}
        onSubmit={handleUpdateTemplate}
        disableSubmitButton={isPending || isSuccess}
      />
    </div>
  );
}

function TemplateHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between">
      <Title title={title} />
      <LinkButton to={SEGMENTS.absolute.template}>
        <div className="flex items-center gap-1">
          <Icon name="list" className="ml-[-6px]" />
          <span className="leading-4">목록으로</span>
        </div>
      </LinkButton>
    </div>
  );
}

// 현재 폼 데이터와 기존 템플릿 데이터를 비교하여 변경된 필드만 반환
const getTemplateChanges = (
  newTemplate: TemplateFormData,
  currentTemplate: TemplateFormData,
): Partial<TemplateFormData> => {
  const changes: Partial<TemplateFormData> = {};

  if (newTemplate.name !== currentTemplate.name) {
    changes.name = newTemplate.name;
  }

  if (newTemplate.description !== currentTemplate.description) {
    changes.description = newTemplate.description;
  }

  if (newTemplate.type !== currentTemplate.type) {
    changes.type = newTemplate.type;
  }

  if (!isArraysEqualUnique(newTemplate.topics, currentTemplate.topics)) {
    changes.topics = newTemplate.topics;
  }

  if (newTemplate.files) {
    const newFiles: TemplateFormData["files"] = {
      metadata: null,
      database: null,
    };

    if (newTemplate.files.metadata?.type === "LOCAL_FILE") {
      newFiles["metadata"] = newTemplate.files.metadata;
    }
    if (newTemplate.files.database?.type === "LOCAL_FILE") {
      newFiles["database"] = newTemplate.files.database;
    }

    changes.files = newFiles;
  }

  return changes;
};
