import { Button } from "innogrid-ui";

import Container from "@/components/common/Container.tsx";
import Icon from "@/components/common/Icon";
import type { SequentialAgentGroup, Template } from "@/types/simulation/domain";

import SequentialAgentGroupRow from "./SequentialAgentGroupRow";

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
      templateId: null,
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
    <Container shadow className="gap-6 p-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">실행 단계 설정</h3>
        <AddStepButton handleAddNewAgentGroup={handleAddNewAgentGroup} />
      </div>

      {/* 에이전트 그룹 리스트 */}
      {/* TODO: 시맨틱태그 적절히 활용하기 ul, li */}
      <div className="space-y-4">
        {agentGroups.map((agentGroup) => (
          <SequentialAgentGroupRow
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
    </Container>
  );
}

function AddStepButton({ handleAddNewAgentGroup }: { handleAddNewAgentGroup: () => void }) {
  return (
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
  );
}
