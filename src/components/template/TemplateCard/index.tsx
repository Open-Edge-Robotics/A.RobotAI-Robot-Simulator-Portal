import Divider from "@/components/common/Divider";
import Icon from "@/components/common/Icon";
import IconButton from "@/components/common/IconButton.tsx";

import { useDeleteTemplate } from "@/hooks/template/useDeleteTemplate";

import type { Template } from "@/types/template/domain";

import BasicInformation from "./BasicInformation";
import Topics from "./Topics";

interface TemplateCardProps {
  template: Template;
}

export default function TemplateCard({ template }: TemplateCardProps) {
  const { mutate: deleteTemplate, isPending } = useDeleteTemplate();

  const handleDeleteTemplate = () => {
    const confirmed = confirm("정말로 템플릿을 삭제하시겠습니까? 삭제된 템플릿은 복구할 수 없습니다.");
    if (confirmed) {
      deleteTemplate(template.templateId);
    }
  };

  return (
    <div key={template.templateId} className="relative rounded-lg border border-gray-200 bg-white p-4">
      <CardHeader name={template.name} onDeleteClick={handleDeleteTemplate} isLoading={isPending} />
      <BasicInformation id={template.templateId} type={template.type} description={template.description} />
      <Divider className="my-4" color="bg-gray-50" />
      <RosbagFile filePath={template.bagFilePath} />
      <Divider className="my-4" color="bg-gray-50" />
      <Topics topics={template.topics.split(",")} />
    </div>
  );
}

interface CardHeaderProps {
  name: string;
  onDeleteClick: () => void;
  isLoading: boolean;
}

function CardHeader({ name, onDeleteClick, isLoading }: CardHeaderProps) {
  return (
    <div className="mb-2.5 flex justify-between">
      <h3 className="font-semibold">{name}</h3>
      <IconButton
        iconName={isLoading ? "progress_activity" : "delete"}
        className={`flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-red-50 hover:text-red-500 active:text-red-700 disabled:bg-white ${isLoading ? "animate-spin" : ""}`}
        onClick={onDeleteClick}
        disabled={isLoading}
      />
    </div>
  );
}

function RosbagFile({ filePath }: { filePath: string }) {
  return (
    <a
      href={filePath}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-1.5 text-gray-600"
    >
      <Icon name="file_present" size="22px" />
      <span className="text-sm group-hover:underline">{filePath}</span>
    </a>
  );
}
