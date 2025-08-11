import { Button, Input, Select } from "innogrid-ui";
import Fieldset from "../../../../components/common/Fieldset";
import Label from "../../../../components/common/Label";
import type { ParallelAgentGroup, Template } from "../../types";

// 순차 패턴 폼 컴포넌트
interface ParallelPatternFormProps {
  templateList: Template[];
  agentGroups: ParallelAgentGroup[];
  onChangeAgentGroups: (agentGroups: ParallelAgentGroup[]) => void;
}

export default function ParallelPatternForm({
  templateList,
  agentGroups,
  onChangeAgentGroups,
}: ParallelPatternFormProps) {
  // 새 에이전트 그룹 추가
  const handleAddNewAgentGroup = () => {
    const newAgentGroup: ParallelAgentGroup = {
      template: null,
      autonomousAgentCount: 10,
      executionTime: 60,
      repeatCount: 1,
    };

    const updatedGroups = [...agentGroups, newAgentGroup];
    onChangeAgentGroups(updatedGroups);
  };

  // 에이전트 그룹 삭제
  const handleRemoveAgentGroup = (index: number) => {
    const updatedGroups = agentGroups.filter((_, i) => i !== index);
    onChangeAgentGroups(updatedGroups);
  };

  // 에이전트 그룹 업데이트
  const handleUpdateAgentGroup = <K extends keyof ParallelAgentGroup>(
    index: number,
    field: K,
    value: ParallelAgentGroup[K],
  ) => {
    const updatedGroups = agentGroups.map((group, i) =>
      i === index ? { ...group, [field]: value } : group,
    );
    onChangeAgentGroups(updatedGroups);
  };

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-neutral-200 bg-white p-6 shadow-xs">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          에이전트 그룹 설정
        </h3>
        <Button
          color="tertiary"
          size="large"
          onClick={(e) => {
            e.preventDefault();
            handleAddNewAgentGroup();
          }}
        >
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined ml-[-6px]">add</span>
            <span>에이전트 그룹 추가</span>
          </div>
        </Button>
      </div>

      {/* 에이전트 그룹 리스트 */}
      {/* TODO: 시맨틱태그 적절히 활용하기 ul, li */}
      <div className="space-y-4">
        {agentGroups.map((agentGroup, i) => (
          <AgentGroupRow
            key={i}
            index={i}
            templateList={templateList}
            agentGroup={agentGroup}
            hideDeleteButton={agentGroups.length === 1}
            onUpdate={handleUpdateAgentGroup}
            onRemove={handleRemoveAgentGroup}
          />
        ))}
      </div>
    </div>
  );
}

interface AgentGroupRowProps {
  index: number;
  templateList: Template[];
  agentGroup: ParallelAgentGroup;
  hideDeleteButton?: boolean;
  onUpdate: <K extends keyof ParallelAgentGroup>(
    index: number,
    field: K,
    value: ParallelAgentGroup[K],
  ) => void;
  onRemove: (index: number) => void;
}

function AgentGroupRow({
  index,
  templateList,
  agentGroup,
  hideDeleteButton = false,
  onUpdate,
  onRemove,
}: AgentGroupRowProps) {
  return (
    <div className="-xs flex items-center gap-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
      {/* 템플릿 선택 */}
      <Fieldset>
        <Label
          label="템플릿 선택"
          fontSize="text-xs"
          marginBottom="mb-1"
          required
        />
        <Select
          options={templateList}
          value={agentGroup.template}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          size="l-medium"
          onChange={(option) => onUpdate(index, "template", option)}
        />
      </Fieldset>

      {/* 가상 자율행동체 개수 */}
      <Fieldset>
        <Label
          label="가상 자율행동체 개수 (대)"
          fontSize="text-xs"
          marginBottom="mb-1"
          required
        />
        {/* TODO: input 컴포넌트 wrapper 만들기, LabeledInput 만들기 */}
        <div className="rounded-sm bg-white">
          <Input
            type="number"
            value={agentGroup.autonomousAgentCount.toString()}
            placeholder="가상 자율행동체 개수를 입력하세요"
            size="l-small"
            onChange={(e) =>
              onUpdate(
                index,
                "autonomousAgentCount",
                parseInt(e.target.value) || 0,
              )
            }
          />
        </div>
      </Fieldset>

      {/* 실행 시간 */}
      <Fieldset>
        <Label
          label="실행 시간 (초)"
          fontSize="text-xs"
          marginBottom="mb-1"
          required
        />
        <Input
          type="number"
          value={agentGroup.executionTime.toString()}
          placeholder="실행 시간을 입력하세요"
          size="l-small"
          onChange={(e) =>
            onUpdate(index, "executionTime", parseInt(e.target.value) || 0)
          }
        />
      </Fieldset>

      {/* 반복 횟수 */}
      <Fieldset>
        <Label label="반복 횟수 (회)" fontSize="text-xs" required />
        <Input
          type="number"
          value={agentGroup.repeatCount.toString()}
          placeholder="반복 횟수를 입력하세요"
          size="l-small"
          onChange={(e) =>
            onUpdate(index, "repeatCount", parseInt(e.target.value) || 0)
          }
        />
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
          >
            삭제
          </Button>
        </div>
      )}
    </div>
  );
}
