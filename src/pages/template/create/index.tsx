import Icon from "@/components/common/Icon";
import LinkButton from "@/components/common/LinkButton";
import Title from "@/components/common/Title";
import TemplateForm from "@/components/template/TemplateForm";

import { SEGMENTS } from "@/constants/navigation";

import { useCreateTemplate } from "@/hooks/template/useCreateTemplate";

import type { TemplateFormData } from "@/types/template/domain";

import { templateFormToRequest } from "@/utils/template/mappers";

export default function TemplateCreatePage() {
  const { mutate: createTemplate, isPending, isSuccess } = useCreateTemplate();

  const handleCreateTemplate = (data: TemplateFormData) => {
    const newTemplateFormData = templateFormToRequest(data);

    createTemplate(newTemplateFormData);
  };

  return (
    <div className="bg-gray-10 flex h-full flex-col gap-6 p-6">
      <TemplateHeader title="새 템플릿 생성" />
      <TemplateForm onSubmit={handleCreateTemplate} disableSubmitButton={isPending || isSuccess} />
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
