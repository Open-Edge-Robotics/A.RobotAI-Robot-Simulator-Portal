import { Button } from "innogrid-ui";

import Icon from "@/components/common/Icon";

import { ICONS } from "@/constants/icon";
import { ACTION_CONFIGS } from "@/constants/simulation";

interface ActionButtonProps {
  onClick: () => void;
  disabled: boolean;
  isPending: boolean;
  color?: "primary" | "secondary" | "tertiary" | "negative";
  iconName?: string;
  buttonText?: string;
}

function ActionButton({ onClick, disabled, isPending, color, iconName, buttonText }: ActionButtonProps) {
  return (
    <Button
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault(); // Link 이동 방지
        e.stopPropagation(); // 행 클릭 이벤트 방지
        onClick();
      }}
      color={color}
    >
      {iconName && (
        <Icon
          name={isPending ? ICONS.loading : iconName}
          size="22px"
          className={isPending ? "animate-spin" : ""}
          fill
        />
      )}
      {buttonText && <span className="mr-1.5 ml-0.5">{buttonText}</span>}
    </Button>
  );
}

interface StopButtonProps {
  onClick: () => void;
  disabled: boolean;
  isPending: boolean;
}

export function StopButton({ onClick, disabled, isPending }: StopButtonProps) {
  return (
    <ActionButton
      buttonText="중지"
      disabled={disabled}
      onClick={onClick}
      color="negative"
      iconName={ACTION_CONFIGS.stop.iconName}
      isPending={isPending}
    />
  );
}

interface StartButtonProps {
  onClick: () => void;
  disabled: boolean;
  isPending: boolean;
}

export function StartButton({ onClick, disabled, isPending }: StartButtonProps) {
  return (
    <ActionButton
      buttonText="시작"
      disabled={disabled}
      onClick={onClick}
      color="primary"
      iconName={ACTION_CONFIGS.start.iconName}
      isPending={isPending}
    />
  );
}

interface DeleteButtonProps {
  onClick: () => void;
  disabled: boolean;
  isPending: boolean;
}

export function DeleteButton({ onClick, disabled, isPending }: DeleteButtonProps) {
  return (
    <ActionButton
      iconName={ACTION_CONFIGS.delete.iconName}
      onClick={onClick}
      disabled={disabled}
      isPending={isPending}
      color="negative"
    />
  );
}
