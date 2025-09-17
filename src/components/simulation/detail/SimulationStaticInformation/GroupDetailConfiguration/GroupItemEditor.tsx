import { useState } from "react";

import { Button, Input, Select } from "innogrid-ui";

import Fieldset from "@/components/common/Fieldset";
import Icon from "@/components/common/Icon";
import Label from "@/components/common/Label";

import { useTemplates } from "@/hooks/template/useTemplates";

import type { GroupExecutionDetailFormData, PatternType } from "@/types/simulation/domain";
import type { TemplateLite } from "@/types/template/domain";

interface GroupItemEditorProps {
  initGroup?: GroupExecutionDetailFormData;
  patternType: PatternType;
  onCancel: () => void;
  onSubmit: (updatedGroup: GroupExecutionDetailFormData) => void;
  isLoading: boolean;
}

const getDefaultGroup = (patternType: PatternType): GroupExecutionDetailFormData => ({
  template: null,
  autonomousAgentCount: 1,
  repeatCount: 1,
  executionTime: 60,
  delayAfterCompletion: patternType === "sequential" ? 0 : undefined,
});

export default function GroupItemEditor({
  initGroup,
  patternType,
  onCancel,
  onSubmit,
  isLoading,
}: GroupItemEditorProps) {
  const [newGroup, setNewGroup] = useState(initGroup || getDefaultGroup(patternType));
  const { data } = useTemplates();

  // TODO: 로딩 및 에러 처리
  if (!data) return null;

  const templateList = data.data.templates;

  const updateNewGroup = <K extends keyof GroupExecutionDetailFormData>(
    field: K,
    value: GroupExecutionDetailFormData[K],
  ) => {
    setNewGroup((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <form className="p-6">
      <TemplateFieldset
        templateList={templateList}
        selectedTemplate={newGroup.template}
        onChange={(value) => updateNewGroup("template", value)}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <CustomInputFieldset
          label="가상 자율행동체 개수 (대)"
          placeholder="가상 자율행동체 개수를 입력하세요"
          ariaLabel="가상 자율행동체 개수"
          value={newGroup.autonomousAgentCount}
          onChange={(value) => updateNewGroup("autonomousAgentCount", value)}
          htmlFor="autonomousAgentCount"
          required
        />
        <CustomInputFieldset
          label="실행 시간 (초)"
          placeholder="실행 시간을 입력하세요"
          ariaLabel="실행 시간"
          value={newGroup.executionTime}
          onChange={(value) => updateNewGroup("executionTime", value)}
          htmlFor="executionTime"
          required
        />
        <CustomInputFieldset
          label="반복 횟수 (회)"
          placeholder="반복 횟수를 입력하세요"
          ariaLabel="반복 횟수"
          value={newGroup.repeatCount}
          onChange={(value) => updateNewGroup("repeatCount", value)}
          htmlFor="repeatCount"
          required
        />
        {newGroup.delayAfterCompletion !== undefined && (
          <CustomInputFieldset
            label="완료 후 대기 시간 (초)"
            placeholder="완료 후 대기 시간을 입력하세요"
            ariaLabel="완료 후 대기 시간"
            value={newGroup.delayAfterCompletion}
            onChange={(value) => updateNewGroup("delayAfterCompletion", value)}
            htmlFor="delayAfterCompletion"
          />
        )}
      </div>
      <div className="flex justify-end gap-2.5">
        <Button color="secondary" onClick={onCancel} type="button" disabled={isLoading}>
          취소
        </Button>
        <Button onClick={() => onSubmit(newGroup)} type="button" disabled={isLoading}>
          {isLoading ? <Icon name="progress_activity" className="animate-spin" /> : "저장"}
        </Button>
      </div>
    </form>
  );
}

interface CustomFieldsetProps {
  label: string;
  htmlFor: string;
  placeholder: string;
  ariaLabel: string;
  value: number;
  required?: boolean;
  onChange: (value: number) => void;
}

function CustomInputFieldset({
  label,
  placeholder,
  htmlFor,
  ariaLabel,
  value,
  onChange,
  required,
}: CustomFieldsetProps) {
  return (
    <Fieldset>
      <Label label={label} fontSize="text-xs" marginBottom="mb-1" htmlFor={htmlFor} required={required} />
      <div className="w-fit rounded-sm bg-white">
        <Input
          id={htmlFor}
          type="number"
          value={value.toString()}
          placeholder={placeholder}
          className=""
          size="l-small"
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          aria-label={ariaLabel}
        />
      </div>
    </Fieldset>
  );
}

interface TemplateFieldsetProps {
  templateList: TemplateLite[];
  selectedTemplate: TemplateLite | null;
  onChange: (template: TemplateLite | null) => void;
}

function TemplateFieldset({ templateList, selectedTemplate, onChange }: TemplateFieldsetProps) {
  return (
    <Fieldset className="mb-4">
      <Label label="템플릿 선택" fontSize="text-xs" marginBottom="mb-1" required />
      <div className="w-fit rounded-sm bg-white">
        <Select
          options={templateList}
          value={templateList.find((template) => template.templateId === selectedTemplate?.templateId) || null}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.templateId.toString()}
          size="l-medium"
          onChange={(option) => onChange(option ? option : null)}
          aria-label="템플릿 선택"
        />
      </div>
    </Fieldset>
  );
}
