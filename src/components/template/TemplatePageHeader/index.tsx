import Icon from "@/components/common/Icon";
import LinkButton from "@/components/common/LinkButton";
import Title from "@/components/common/Title";

import { SEGMENTS } from "@/constants/navigation";

export default function TemplatePageHeader() {
  return (
    <Title margin="mb-5">
      <div className="flex items-center justify-between gap-2.5">
        <span>템플릿</span>
        <TemplateCreateButton />
      </div>
    </Title>
  );
}

function TemplateCreateButton() {
  return (
    <LinkButton to={`${SEGMENTS.absolute.template}/${SEGMENTS.relative.create}`}>
      <div className="flex items-center gap-1">
        <Icon name="add" className="ml-[-6px]" />
        <span>새 템플릿</span>
      </div>
    </LinkButton>
  );
}
