import { useParams } from "react-router-dom";

import ErrorFallback from "@/components/common/Fallback/ErrorFallback";
import LoadingFallback from "@/components/common/Fallback/LoadingFallback";
import Icon from "@/components/common/Icon";
import LinkButton from "@/components/common/LinkButton";
import Title from "@/components/common/Title";
import TemplateForm from "@/components/template/TemplateForm";

import { SEGMENTS } from "@/constants/navigation";

import { useTemplateDetail } from "@/hooks/template/useTemplateDetail";
import { useUpdateTemplate } from "@/hooks/template/useUpdateTemplate";

import type { TemplateFormData } from "@/types/template/domain";

import { templateFormToCreateRequest, templateApiToForm } from "@/utils/template/mappers";

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
  const { status, data, refetch } = useTemplateDetail(id);
  const { mutate: updateTemplate, isPending, isSuccess } = useUpdateTemplate(id);

  if (status === "pending") {
    return <LoadingFallback message="시뮬레이션 정보를 불러오는 중입니다." />;
  }

  if (status === "error") {
    return (
      <ErrorFallback
        onRetry={refetch}
        message="시뮬레이션 정보를 불러올 수 없습니다."
        subMessage="네트워크 연결을 확인하거나 잠시 후 다시 시도해 주세요."
        showBackButton
      />
    );
  }

  const templateFormData = templateApiToForm(data.data.template);

  const handleUpdateTemplate = (data: TemplateFormData) => {
    const newTemplateFormData = templateFormToCreateRequest(data);
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
