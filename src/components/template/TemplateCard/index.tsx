import { useNavigate } from "react-router-dom";

import Container from "@/components/common/Container.tsx";
import Divider from "@/components/common/Divider";
import IconButton from "@/components/common/IconButton.tsx";

import { SEGMENTS } from "@/constants/navigation";

import { useDeleteTemplate } from "@/hooks/template/useDeleteTemplate";

import type { Template } from "@/types/template/domain";

import BasicInformation from "./BasicInformation";
import TemplateFiles from "./TemplateFiles";
import Topics from "./Topics";

interface TemplateCardProps {
  template: Template;
}

export default function TemplateCard({ template }: TemplateCardProps) {
  const { mutate: deleteTemplate, isPending } = useDeleteTemplate();
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`${SEGMENTS.absolute.template}/${template.templateId}/${SEGMENTS.relative.edit}`);
  };

  const handleDeleteTemplate = () => {
    const confirmed = confirm("정말로 템플릿을 삭제하시겠습니까? 삭제된 템플릿은 복구할 수 없습니다.");
    if (confirmed) {
      deleteTemplate(template.templateId);
    }
  };

  return (
    <Container shadow className="p-4">
      <CardHeader
        name={template.templateName}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteTemplate}
        isDeleteLoading={isPending}
      />
      <BasicInformation
        id={template.templateId}
        type={template.templateType}
        description={template.templateDescription}
      />
      <Divider className="my-4" color="bg-gray-50" />
      <TemplateFiles metadata={template.metadataFile} database={template.dbFile} />
      <Divider className="my-4" color="bg-gray-50" />
      <Topics topics={template.topics.split(",")} />
    </Container>
  );
}

interface CardHeaderProps {
  name: string;
  onDeleteClick: () => void;
  onEditClick: () => void;
  isDeleteLoading: boolean;
}

function CardHeader({ name, onEditClick, onDeleteClick, isDeleteLoading }: CardHeaderProps) {
  const disabledStyle = "disabled:cursor-default disabled:bg-white disabled:hover:text-gray-500";
  const commonStyle = "flex h-8 w-8 items-center justify-center rounded-md text-gray-500";

  return (
    <div className="mb-2.5 flex justify-between">
      <h3 className="font-semibold">{name}</h3>
      <div className="flex items-center gap-1">
        <IconButton
          iconName="edit"
          className={`${commonStyle} hover:bg-gray-50 hover:text-gray-600 active:bg-gray-100 active:text-gray-600 disabled:opacity-50 ${disabledStyle}`}
          onClick={onEditClick}
          disabled={isDeleteLoading}
        />
        <IconButton
          iconName={isDeleteLoading ? "progress_activity" : "delete"}
          className={`${commonStyle} hover:bg-red-50 hover:text-red-500 active:bg-red-100 active:text-red-500 ${disabledStyle} ${isDeleteLoading ? "animate-spin" : ""}`}
          onClick={onDeleteClick}
          disabled={isDeleteLoading}
        />
      </div>
    </div>
  );
}
