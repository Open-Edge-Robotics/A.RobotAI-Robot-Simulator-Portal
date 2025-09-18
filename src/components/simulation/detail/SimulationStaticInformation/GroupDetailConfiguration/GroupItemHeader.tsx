import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Modal } from "innogrid-ui";

import Icon from "@/components/common/Icon";
import IconButton from "@/components/common/IconButton.tsx";

import { SEGMENTS } from "@/constants/navigation";
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
        <GroupTemplate id={group.templateId} name={group.templateName} type={group.templateType} />
      </div>
      {!isEditMode && (
        <div className="flex items-center gap-4">
          {showActionButtons && (
            <ActionButtons
              isLoading={isDeleteLoading}
              isDeleteDisabled={isDeleteDisabled}
              onDeleteClick={handleDeleteClick}
              onEditClick={handleEditClick}
            />
          )}
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

interface GroupTemplateProps {
  id: number;
  name: string;
  type: string;
}

function GroupTemplate({ id, name, type }: GroupTemplateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <button
        className="mt-0.5 mr-auto ml-[-6px] cursor-pointer rounded-md p-1.5 text-sm text-gray-600 hover:bg-gray-50"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        type="button"
      >
        템플릿
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        size="small"
        title="템플릿 정보"
        action={() => {
          navigate(`${SEGMENTS.absolute.template}?id=${id}`);
        }}
        buttonTitle="템플릿 페이지로 이동"
        allowOutsideInteraction
      >
        <p>템플릿 ID: {id}</p>
        <p>템플릿 이름: {name}</p>
        <p>템플릿 유형: {type}</p>
      </Modal>
    </>
  );
}

interface ActionButtonsProps {
  onEditClick: () => void;
  onDeleteClick: () => void;
  isLoading: boolean;
  isDeleteDisabled: boolean;
}

function ActionButtons({ onEditClick, onDeleteClick, isLoading, isDeleteDisabled }: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-4">
      <EditButton isDisabled={isLoading} onClick={onEditClick} />
      <DeleteButton isLoading={isLoading} isDisabled={isDeleteDisabled} onClick={onDeleteClick} />
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
