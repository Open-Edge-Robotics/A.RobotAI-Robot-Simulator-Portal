import { useReducer } from "react";
import { useParams } from "react-router-dom";

import Container from "@/components/common/Container.tsx";
import IconButton from "@/components/common/IconButton.tsx";
import Title from "@/components/common/Title";

import { ICONS } from "@/constants/icon";
import { PATTERN_CONFIGS } from "@/constants/simulation";

import { useUpdateSimulation } from "@/hooks/simulation/core/useUpdateSimulation";

import type { DeletePatternGroupRequest } from "@/types/simulation/api";
import type { GroupExecutionDetail, GroupExecutionDetailFormData, PatternType } from "@/types/simulation/domain";

import { errorToast } from "@/utils/common/toast";
import { patternGroupFormToCreateRequest, patternGroupFormToUpdateRequest } from "@/utils/simulation/mappers";
import { validatePatternGroupForm } from "@/utils/simulation/validation";

import GroupDetailItem from "./GroupDetailItem";
import GroupItemEditor from "./GroupItemEditor";

interface GroupDetailConfigurationProps {
  executionPlan: GroupExecutionDetail[];
  patternType: PatternType;
  isGlobalEditMode: boolean;
}

export default function GroupDetailConfiguration({
  executionPlan,
  patternType,
  isGlobalEditMode,
}: GroupDetailConfigurationProps) {
  const { simulationId: rawId } = useParams();
  const simulationId = Number(rawId);

  const [isConfigSectionOpen, toggleConfigSection] = useReducer((x) => !x, false);
  const [showAddEditor, toggleAddEditor] = useReducer((x) => !x, false);
  const { actionHandlers, loadingStates, mutations } = useUpdateSimulation(simulationId, {
    onSuccessCallback: {
      create: toggleAddEditor,
    },
  });

  const handleDeleteGroup = (groupId: number) => {
    const requestData: DeletePatternGroupRequest = createDeleteRequestData(patternType, groupId);
    actionHandlers.delete(requestData);
  };

  const handleEditGroup = (id: number, newGroup: GroupExecutionDetailFormData) => {
    const validation = validatePatternGroupForm(newGroup);
    if (!validation.isValid) {
      errorToast(validation.error);
      return;
    }
    const patternInfo = { patternType, id };
    const requestData = patternGroupFormToUpdateRequest(newGroup, patternInfo);
    actionHandlers.update(requestData);
  };

  const handleCreateGroup = (newGroup: GroupExecutionDetailFormData) => {
    const validation = validatePatternGroupForm(newGroup);
    if (!validation.isValid) {
      errorToast(validation.error);
      return;
    }

    const patternInfo =
      patternType === "sequential"
        ? { patternType: "sequential" as const, stepOrder: executionPlan.at(-1)!.id + 1 }
        : { patternType: "parallel" as const };
    const requestData = patternGroupFormToCreateRequest(newGroup, patternInfo);
    actionHandlers.create(requestData);
  };

  /**
   * 삭제 가능 조건
   * 1. 패턴 그룹이 2개 이상이어야 함
   * 2. 병렬 실행이거나, 순차 실행일 때는 마지막 스텝이어야 함
   */
  const isDeletable = (groupIndex: number) => {
    return executionPlan.length > 1 && (patternType === "parallel" || groupIndex === executionPlan.length - 1);
  };

  return (
    <div>
      <GroupDetailConfigurationHeader isOpen={isConfigSectionOpen} toggleCard={toggleConfigSection} />
      {isConfigSectionOpen && (
        <div className="space-y-4">
          {executionPlan.map((group, index) => (
            <GroupDetailItem
              key={group.id}
              group={group}
              patternType={patternType}
              showActionButtons={isGlobalEditMode}
              handleDeleteGroup={handleDeleteGroup}
              handleEditGroup={handleEditGroup}
              isEditLoading={loadingStates.update}
              isDeleteLoading={mutations.delete.isDeleting(group.id)}
              deletable={isDeletable(index)}
            />
          ))}
          {isGlobalEditMode && (
            <AddGroupSection
              patternType={patternType}
              showAddEditor={showAddEditor}
              toggleAddEditor={toggleAddEditor}
              handleCreateGroup={handleCreateGroup}
              isLoading={loadingStates.create}
            />
          )}
        </div>
      )}
    </div>
  );
}

interface GroupDetailConfigurationHeaderProps {
  isOpen: boolean;
  toggleCard: () => void;
}

function GroupDetailConfigurationHeader({ isOpen, toggleCard }: GroupDetailConfigurationHeaderProps) {
  return (
    <header className="mb-3 flex items-center justify-between pr-2">
      <Title title="그룹별 설정 정보" fontSize="text-lg" fontWeight="font-medium" />
      {isOpen ? (
        <IconButton iconName={ICONS.arrowUp} iconPosition="right" onClick={toggleCard} className="text-blue-500">
          <span>접기</span>
        </IconButton>
      ) : (
        <IconButton iconName={ICONS.arrowDown} iconPosition="right" onClick={toggleCard} className="text-blue-500">
          <span>펼치기</span>
        </IconButton>
      )}
    </header>
  );
}

interface AddGroupSectionProps {
  patternType: PatternType;
  showAddEditor: boolean;
  toggleAddEditor: () => void;
  handleCreateGroup: (data: GroupExecutionDetailFormData) => void;
  isLoading: boolean;
}

function AddGroupSection({
  patternType,
  showAddEditor,
  toggleAddEditor,
  handleCreateGroup,
  isLoading,
}: AddGroupSectionProps) {
  const title = `새로운 ${PATTERN_CONFIGS[patternType].unit} 추가`;

  if (showAddEditor) {
    return (
      <Container bgColor="bg-blue-10" borderColor="border-blue-100">
        <div className="px-6 pt-6 font-semibold">{title}</div>
        <GroupItemEditor
          patternType={patternType}
          onCancel={toggleAddEditor}
          onSubmit={handleCreateGroup}
          isLoading={isLoading}
        />
      </Container>
    );
  }

  return (
    <IconButton
      iconName={ICONS.add}
      iconPosition="right"
      onClick={toggleAddEditor}
      className="px-2 text-blue-500 hover:text-blue-600"
    >
      <span>{title}</span>
    </IconButton>
  );
}

const createDeleteRequestData = (patternType: PatternType, groupId: number): DeletePatternGroupRequest => {
  return patternType === "sequential" ? { step: { stepOrder: groupId } } : { group: { groupId: groupId } };
};
