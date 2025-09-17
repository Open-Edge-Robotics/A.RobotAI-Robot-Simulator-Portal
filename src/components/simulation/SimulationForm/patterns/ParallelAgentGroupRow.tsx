import { Button, Input, Select } from "innogrid-ui";

import Container from "@/components/common/Container.tsx";
import Fieldset from "@/components/common/Fieldset";
import Label from "@/components/common/Label";

import type { ParallelAgentGroup } from "@/types/simulation/domain";
import type { TemplateLite } from "@/types/template/domain";

interface ParallelAgentGroupRowProps {
  index: number;
  templateList: TemplateLite[];
  agentGroup: ParallelAgentGroup;
  hideDeleteButton?: boolean;
  onUpdate: <K extends keyof ParallelAgentGroup>(index: number, field: K, value: ParallelAgentGroup[K]) => void;
  onRemove: (index: number) => void;
}

export default function ParallelAgentGroupRow({
  index,
  templateList,
  agentGroup,
  hideDeleteButton = false,
  onUpdate,
  onRemove,
}: ParallelAgentGroupRowProps) {
  return (
    <Container bgColor="bg-gray-10" flexDirection="flex-row" className="items-center gap-4 p-4">
      {/* 템플릿 선택 */}
      <Fieldset>
        <Label label="템플릿 선택" fontSize="text-xs" marginBottom="mb-1" required />
        <Select
          options={templateList}
          value={templateList.find((template) => template.templateId === agentGroup.templateId) || null}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.templateId.toString()}
          size="l-medium"
          onChange={(option) => onUpdate(index, "templateId", option ? option.templateId : null)}
          aria-label="템플릿 선택"
        />
      </Fieldset>

      {/* 가상 자율행동체 개수 */}
      <Fieldset>
        <Label label="가상 자율행동체 개수 (대)" fontSize="text-xs" marginBottom="mb-1" required />
        {/* TODO: input 컴포넌트 wrapper 만들기, LabeledInput 만들기 */}
        <div className="rounded-sm bg-white">
          <Input
            type="number"
            value={agentGroup.autonomousAgentCount.toString()}
            placeholder="가상 자율행동체 개수를 입력하세요"
            size="l-small"
            onChange={(e) => onUpdate(index, "autonomousAgentCount", parseInt(e.target.value) || 0)}
            aria-label="가상 자율행동체 개수"
          />
        </div>
      </Fieldset>

      {/* 실행 시간 */}
      <Fieldset>
        <Label label="실행 시간 (초)" fontSize="text-xs" marginBottom="mb-1" required />
        <div className="rounded-sm bg-white">
          <Input
            type="number"
            value={agentGroup.executionTime.toString()}
            placeholder="실행 시간을 입력하세요"
            size="l-small"
            onChange={(e) => onUpdate(index, "executionTime", parseInt(e.target.value) || 0)}
            aria-label="실행 시간"
          />
        </div>
      </Fieldset>

      {/* 반복 횟수 */}
      <Fieldset>
        <Label label="반복 횟수 (회)" fontSize="text-xs" required />
        <div className="rounded-sm bg-white">
          <Input
            type="number"
            value={agentGroup.repeatCount.toString()}
            placeholder="반복 횟수를 입력하세요"
            size="l-small"
            onChange={(e) => onUpdate(index, "repeatCount", parseInt(e.target.value) || 0)}
            aria-label="반복 횟수"
          />
        </div>
      </Fieldset>

      {/* 그룹 삭제 버튼 */}
      {!hideDeleteButton && (
        <div className="mt-6">
          <Button
            color="negative"
            size="large"
            onClick={(e) => {
              e.preventDefault();
              onRemove(index);
            }}
            aria-label="그룹 삭제"
          >
            삭제
          </Button>
        </div>
      )}
    </Container>
  );
}
