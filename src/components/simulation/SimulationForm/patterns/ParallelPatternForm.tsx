import { Button } from "innogrid-ui";

import Container from "@/components/common/Container.tsx";
import Icon from "@/components/common/Icon";

import type { ParallelAgentGroupFormData } from "@/types/simulation/domain";
import type { TemplateLite } from "@/types/template/domain";

import ParallelAgentGroupRow from "./ParallelAgentGroupRow";

// 병렬 패턴 폼 컴포넌트
interface ParallelPatternFormProps {
  templateList: TemplateLite[];
  agentGroups: ParallelAgentGroupFormData[];
  onChangeAgentGroups: (agentGroups: ParallelAgentGroupFormData[]) => void;
}

export default function ParallelPatternForm({
  templateList,
  agentGroups,
  onChangeAgentGroups,
}: ParallelPatternFormProps) {
  // 새 가상 자율행동체 그룹 추가
  const handleAddNewAgentGroup = () => {
    const newAgentGroup: ParallelAgentGroupFormData = {
      templateId: null,
      autonomousAgentCount: 1,
      executionTime: 60,
      repeatCount: 1,
    };

    const updatedGroups = [...agentGroups, newAgentGroup];
    onChangeAgentGroups(updatedGroups);
  };

  // 가상 자율행동체 그룹 삭제
  const handleRemoveAgentGroup = (index: number) => {
    const updatedGroups = agentGroups.filter((_, i) => i !== index);
    onChangeAgentGroups(updatedGroups);
  };

  // 가상 자율행동체 그룹 업데이트
  const handleUpdateAgentGroup = <K extends keyof ParallelAgentGroupFormData>(
    index: number,
    field: K,
    value: ParallelAgentGroupFormData[K],
  ) => {
    const updatedGroups = agentGroups.map((group, i) => (i === index ? { ...group, [field]: value } : group));
    onChangeAgentGroups(updatedGroups);
  };

  return (
    <Container shadow className="gap-6 p-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">가상 자율행동체 그룹 설정</h3>
        <AddAgentGroupButton handleAddNewAgentGroup={handleAddNewAgentGroup} />
      </div>

      {/* 가상 자율행동체 그룹 리스트 */}
      {/* TODO: 시맨틱태그 적절히 활용하기 ul, li */}
      <div className="space-y-4">
        {agentGroups.map((agentGroup, i) => (
          <ParallelAgentGroupRow
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
    </Container>
  );
}

function AddAgentGroupButton({ handleAddNewAgentGroup }: { handleAddNewAgentGroup: () => void }) {
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
        <span>가상 자율행동체 그룹 추가</span>
      </div>
    </Button>
  );
}
