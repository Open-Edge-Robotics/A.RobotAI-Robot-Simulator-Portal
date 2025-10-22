import ErrorFallback from "@/components/common/Fallback/ErrorFallback";
import InformationFallback from "@/components/common/Fallback/InformationFallback";
import LoadingFallback from "@/components/common/Fallback/LoadingFallback";
import LinkButton from "@/components/common/LinkButton";
import TemplateCard from "@/components/template/TemplateCard";
import TemplatePageHeader from "@/components/template/TemplatePageHeader";

import { SEGMENTS } from "@/constants/navigation";

import { useTemplates } from "@/hooks/template/useTemplates";

import type { Template } from "@/types/template/domain";

export default function TemplatePage() {
  const { data, status, refetch } = useTemplates();

  if (status === "pending") {
    return <LoadingFallback message="템플릿 정보를 불러오고 있습니다." />;
  }

  if (status === "error") {
    return (
      <ErrorFallback
        onRetry={refetch}
        message="템플릿 정보를 불러올 수 없습니다."
        subMessage="네트워크 연결을 확인하거나 잠시 후 다시 시도해 주세요."
      />
    );
  }

  const templateList = data.data;

  if (templateList.length === 0) {
    return <Fallback />;
  }

  return (
    <div className="bg-gray-10 min-h-full p-6">
      <TemplatePageHeader />
      <TemplateCards templates={templateList} />
    </div>
  );
}

function TemplateCards({ templates }: { templates: Template[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-5">
      {templates.map((template) => (
        <TemplateCard template={template} key={template.templateId} />
      ))}
    </div>
  );
}

function Fallback() {
  return (
    <InformationFallback message="템플릿이 없습니다" subMessage="새로운 템플릿을 생성해보세요." className="m-6">
      <LinkButton to={`${SEGMENTS.absolute.template}/${SEGMENTS.relative.create}`} title="템플릿 생성">
        템플릿 생성
      </LinkButton>
    </InformationFallback>
  );
}
