import { Button, Input, Select } from "innogrid-ui";

import Fieldset from "@/components/common/Fieldset";
import Icon from "@/components/common/Icon";
import Label from "@/components/common/Label";

import type { SequentialAgentGroup, Template } from "../../types";

// 순차 패턴 폼 컴포넌트
interface SequentialPatternFormProps {
  templateList: Template[];
  agentGroups: SequentialAgentGroup[];
  onChangeAgentGroups: (agentGroups: SequentialAgentGroup[]) => void;
}

export default function SequentialPatternForm({
  templateList,
  agentGroups,
  onChangeAgentGroups,
}: SequentialPatternFormProps) {
  // 새 에이전트 그룹 추가
  const handleAddNewAgentGroup = () => {
    const newAgentGroup: SequentialAgentGroup = {
      stepOrder: agentGroups.length + 1,
      template: null,
      autonomousAgentCount: 1,
      executionTime: 1,
      delayAfterCompletion: 0,
      repeatCount: 1,
    };

    const updatedGroups = [...agentGroups, newAgentGroup];
    onChangeAgentGroups(updatedGroups);
  };

  // 에이전트 그룹 삭제
  const handleRemoveAgentGroup = (stepOrder: number) => {
    const updatedGroups = agentGroups
      .filter((group) => group.stepOrder !== stepOrder)
      .map((group, index) => ({
        ...group,
        stepOrder: index + 1, // 단계 순서 재정렬
      }));
    onChangeAgentGroups(updatedGroups);
  };

  // 에이전트 그룹 업데이트
  const handleUpdateAgentGroup = <K extends keyof SequentialAgentGroup>(
    stepOrder: number,
    field: K,
    value: SequentialAgentGroup[K],
  ) => {
    const updatedGroups = agentGroups.map((group) =>
      group.stepOrder === stepOrder ? { ...group, [field]: value } : group,
    );
    onChangeAgentGroups(updatedGroups);
  };

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-gray-100 bg-white p-6 shadow-xs">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">실행 단계 설정</h3>
        {/* 단계 추가 버튼 */}
        <Button
          color="tertiary"
          size="large"
          onClick={(e) => {
            e.preventDefault();
            handleAddNewAgentGroup();
          }}
        >
          <div className="flex items-center gap-1">
            <Icon name="add" className="ml-[-6px]" />
            <span>단계 추가</span>
          </div>
        </Button>
      </div>

      {/* 에이전트 그룹 리스트 */}
      {/* TODO: 시맨틱태그 적절히 활용하기 ul, li */}
      <div className="space-y-4">
        {agentGroups.map((agentGroup) => (
          <AgentGroupRow
            key={agentGroup.stepOrder}
            templateList={templateList}
            agentGroup={agentGroup}
            hideDeleteButton={agentGroups.length === 1}
            disableDelayInput={agentGroup.stepOrder === agentGroups.length}
            onUpdate={handleUpdateAgentGroup}
            onRemove={handleRemoveAgentGroup}
          />
        ))}
      </div>
    </div>
  );
}

interface AgentGroupRowProps {
  templateList: Template[];
  agentGroup: SequentialAgentGroup;
  hideDeleteButton?: boolean;
  disableDelayInput?: boolean;
  onUpdate: <K extends keyof SequentialAgentGroup>(stepOrder: number, field: K, value: SequentialAgentGroup[K]) => void;
  onRemove: (stepOrder: number) => void;
}

function AgentGroupRow({
  templateList,
  agentGroup,
  hideDeleteButton = false,
  disableDelayInput = false,
  onUpdate,
  onRemove,
}: AgentGroupRowProps) {
  return (
    <div className="bg-gray-10 flex items-center gap-4 rounded-lg border border-gray-100 p-4">
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
            value={agentGroup.template}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id.toString()}
            size="l-medium"
            onChange={(option) => onUpdate(agentGroup.stepOrder, "template", option)}
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
          />
          {/* input이 disabled되었을 경우 클릭 이벤트가 동작하지 않으므로 별도의 오버레이 추가 */}
          {disableDelayInput && (
            <div
              className="absolute inset-0"
              onClick={() => {
                alert("마지막 단계에는 대기 시간이 적용되지 않습니다.");
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
          >
            삭제
          </Button>
        </div>
      )}
    </div>
  );
}
