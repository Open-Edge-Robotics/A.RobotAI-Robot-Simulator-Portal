import { Button, Input, Select } from "innogrid-ui";

import Container from "@/components/common/Container.tsx";
import Fieldset from "@/components/common/Fieldset";
import Label from "@/components/common/Label";

import type { SequentialAgentGroupFormData } from "@/types/simulation/domain";
import type { TemplateLite } from "@/types/template/domain";

import { infoToast } from "@/utils/common/toast";

interface SequentialAgentGroupRowProps {
  templateList: TemplateLite[];
  agentGroup: SequentialAgentGroupFormData;
  hideDeleteButton?: boolean;
  disableDelayInput?: boolean;
  onUpdate: <K extends keyof SequentialAgentGroupFormData>(
    stepOrder: number,
    field: K,
    value: SequentialAgentGroupFormData[K],
  ) => void;
  onRemove: (stepOrder: number) => void;
}

export default function SequentialAgentGroupRow({
  templateList,
  agentGroup,
  hideDeleteButton = false,
  disableDelayInput = false,
  onUpdate,
  onRemove,
}: SequentialAgentGroupRowProps) {
  return (
    <Container bgColor="bg-gray-10" flexDirection="flex-row" className="items-center gap-4 p-4">
      {/* 단계 번호 */}
      <div className="mt-4.5 flex items-center justify-center">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white">
          {agentGroup.stepOrder}
        </div>
      </div>

      {/* 템플릿 선택 */}
      <Fieldset>
        <Label label="템플릿 선택" fontSize="text-xs" marginBottom="mb-1" required />
        <div className="rounded-sm bg-white">
          <Select
            options={templateList}
            value={templateList.find((template) => template.templateId === agentGroup.templateId) || null}
            getOptionLabel={(option) => option.templateName}
            getOptionValue={(option) => option.templateId.toString()}
            size="l-medium"
            onChange={(option) => onUpdate(agentGroup.stepOrder, "templateId", option ? option.templateId : null)}
            aria-label="템플릿 선택"
          />
        </div>
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
            onChange={(e) => onUpdate(agentGroup.stepOrder, "autonomousAgentCount", parseInt(e.target.value) || 0)}
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
            onChange={(e) => onUpdate(agentGroup.stepOrder, "executionTime", parseInt(e.target.value) || 0)}
            aria-label="실행 시간"
          />
        </div>
      </Fieldset>

      {/* 완료 후 대기 시간 */}
      <Fieldset>
        <Label label="완료 후 대기 시간 (초)" fontSize="text-xs" marginBottom="mb-1" required />
        <div className="relative rounded-sm bg-white">
          <Input
            type="number"
            value={agentGroup.delayAfterCompletion.toString()}
            placeholder="완료 후 대기 시간을 입력하세요"
            size="l-small"
            onChange={(e) => onUpdate(agentGroup.stepOrder, "delayAfterCompletion", parseInt(e.target.value) || 0)}
            disabled={disableDelayInput}
            aria-label="완료 후 대기 시간"
          />
          {/* input이 disabled되었을 경우 클릭 이벤트가 동작하지 않으므로 별도의 오버레이 추가 */}
          {disableDelayInput && (
            <div
              className="absolute inset-0"
              onClick={() => {
                infoToast("마지막 단계에는 대기 시간이 적용되지 않습니다.");
              }}
            />
          )}
        </div>
      </Fieldset>

      {/* 반복 횟수 */}
      <Fieldset>
        <div className="rounded-sm bg-white">
          <Label label="반복 횟수 (회)" fontSize="text-xs" required />
          <Input
            type="number"
            value={agentGroup.repeatCount.toString()}
            placeholder="반복 횟수를 입력하세요"
            size="l-small"
            onChange={(e) => onUpdate(agentGroup.stepOrder, "repeatCount", parseInt(e.target.value) || 0)}
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
              onRemove(agentGroup.stepOrder);
            }}
            aria-label="단계 삭제"
          >
            삭제
          </Button>
        </div>
      )}
    </Container>
  );
}
