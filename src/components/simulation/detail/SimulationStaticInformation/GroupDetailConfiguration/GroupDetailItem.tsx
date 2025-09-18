import { useState } from "react";

import Container from "@/components/common/Container.tsx";

import type { GroupExecutionDetail, GroupExecutionDetailFormData, PatternType } from "@/types/simulation/domain";

import GroupItemContent from "./GroupItemContent";
import GroupItemEditor from "./GroupItemEditor";
import GroupHeader from "./GroupItemHeader";

interface GroupDetailItemProps {
  group: GroupExecutionDetail;
  patternType: PatternType;
  showActionButtons: boolean;
  handleDeleteGroup: (groupId: number) => void;
  handleEditGroup: (id: number, newGroup: GroupExecutionDetailFormData) => void;
  isEditLoading: boolean;
  isDeleteLoading: boolean;
  deletable: boolean;
}

export default function GroupDetailItem({
  group,
  patternType,
  showActionButtons,
  handleDeleteGroup,
  handleEditGroup,
  isDeleteLoading,
  isEditLoading,
  deletable,
}: GroupDetailItemProps) {
  const [isOpen, setIsCardOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleCard = () => setIsCardOpen((prev) => !prev);

  const handleEditModeClick = () => {
    setIsCardOpen(true);
    setIsEditMode(true);
  };

  const handleDeleteClick = () => {
    const confirmed = confirm("정말로 패턴그룹을 삭제하시겠습니까? 삭제된 패턴그룹은 복구할 수 없습니다.");
    if (confirmed) {
      handleDeleteGroup(group.id);
    }
  };

  const groupEditorData = transformGroupToFormData(group);

  return (
    <Container
      borderColor={isEditMode ? "border-blue-100" : "border-gray-100"}
      bgColor={isEditMode ? "bg-blue-10" : "bg-white"}
    >
      <GroupHeader
        patternType={patternType}
        group={group}
        isOpen={isOpen}
        toggleCard={toggleCard}
        isEditMode={isEditMode}
        showActionButtons={showActionButtons}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditModeClick}
        isDeleteDisabled={!deletable}
        isDeleteLoading={isDeleteLoading}
      />
      {isOpen &&
        (isEditMode ? (
          <GroupItemEditor
            initGroup={groupEditorData}
            patternType={patternType}
            onCancel={() => setIsEditMode(false)}
            onSubmit={(newgroup) => {
              handleEditGroup(group.id, newgroup);
              setIsEditMode(false);
            }}
            isLoading={isEditLoading}
          />
        ) : (
          <GroupItemContent group={group} />
        ))}
    </Container>
  );
}

const transformGroupToFormData = (group: GroupExecutionDetail): GroupExecutionDetailFormData => ({
  template: { templateId: group.templateId, templateName: group.templateName },
  autonomousAgentCount: group.autonomousAgentCount,
  repeatCount: group.repeatCount,
  executionTime: group.executionTime,
  delayAfterCompletion: group.delayAfterCompletion,
});
