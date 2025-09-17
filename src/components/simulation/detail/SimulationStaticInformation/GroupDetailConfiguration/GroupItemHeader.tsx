import Icon from "@/components/common/Icon";
import IconButton from "@/components/common/IconButton.tsx";

import { PATTERN_CONFIGS } from "@/constants/simulation";

import type { GroupExecutionDetail, PatternType } from "@/types/simulation/domain";

interface GroupHeaderProps {
  patternType: PatternType;
  group: GroupExecutionDetail;
  isOpen: boolean;
  toggleCard: () => void;
  isEditMode: boolean;
  showActionButtons: boolean;
  isDeleteLoading: boolean;
  isDeleteDisabled: boolean;
  handleDeleteClick: () => void;
  handleEditClick: () => void;
}

export default function GroupHeader({
  patternType,
  group,
  isOpen,
  toggleCard,
  isEditMode,
  showActionButtons,
  handleDeleteClick,
  handleEditClick,
  isDeleteDisabled,
  isDeleteLoading,
}: GroupHeaderProps) {
  return (
    <header
      className={`${!isEditMode && "hover:bg-gray-10 cursor-pointer"} flex items-center justify-between rounded-md p-6`}
      onClick={() => {
        if (!isEditMode) {
          toggleCard();
        }
      }}
    >
      <div className="flex items-center gap-4">
        <GroupIndexText index={group.index} unit={PATTERN_CONFIGS[patternType].unit} />
        <GroupTemplate />
      </div>
      {!isEditMode && (
        <div className="flex items-center gap-4">
          {showActionButtons && (
            <div className="flex items-center gap-4">
              <EditButton isDisabled={isDeleteLoading} onClick={handleEditClick} />
              <DeleteButton isLoading={isDeleteLoading} isDisabled={isDeleteDisabled} onClick={handleDeleteClick} />
            </div>
          )}
          {/* {showActionButtons && (
            <ActionButtons
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
              isDeleteLoading={isDeleteLoading}
              showDeleteButton={showDeleteButton} // 순차 실행일 때는 마지막 스텝만 삭제 가능
              disableButton={disableButton}
            />
          )} */}
          <div className="flex items-center text-gray-500">
            {isOpen ? <Icon name="keyboard_arrow_up " /> : <Icon name="keyboard_arrow_down" />}
          </div>
        </div>
      )}
    </header>
  );
}

function GroupIndexText({ index, unit }: { index: number; unit: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-sm font-bold">{index}</div>
      {unit}
    </div>
  );
}

function GroupTemplate() {
  return (
    <div
      className="mt-0.5 mr-auto ml-[-6px] rounded-md p-1.5 text-sm text-gray-600 hover:bg-gray-50"
      onClick={(e) => {
        alert("TODO: 템플릿 모달 띄우기");
        e.stopPropagation();
      }}
    >
      템플릿
    </div>
  );
}

interface ActionButtonsProps {
  onEditClick: () => void;
  onDeleteClick: () => void;
  isDeleteLoading: boolean;
  showDeleteButton: boolean;
  disableButton: boolean;
}

function ActionButtons({
  onEditClick,
  onDeleteClick,
  isDeleteLoading,
  showDeleteButton,
  disableButton,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-4">
      <EditButton isDisabled={disableButton} onClick={onEditClick} />
      {showDeleteButton && (
        <DeleteButton
          isLoading={isDeleteLoading}
          isDisabled={!showDeleteButton || disableButton}
          onClick={onDeleteClick}
        />
      )}
    </div>
  );
}

interface DeleteButtonProps {
  onClick: () => void;
  isLoading: boolean;
  isDisabled: boolean;
}

function DeleteButton({ onClick, isLoading, isDisabled }: DeleteButtonProps) {
  return (
    <IconButton
      iconName={isLoading ? "progress_activity" : "delete"}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`text-gray-500 hover:text-red-500 disabled:cursor-default disabled:text-gray-300 ${isLoading && "animate-spin"}`}
      disabled={isDisabled}
    />
  );
}

interface EditButtonProps {
  isDisabled: boolean;
  onClick: () => void;
}

function EditButton({ isDisabled, onClick }: EditButtonProps) {
  return (
    <IconButton
      iconName="edit"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="text-gray-500 hover:text-blue-500 disabled:cursor-default disabled:text-gray-300"
      disabled={isDisabled}
    />
  );
}
