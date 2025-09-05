import Icon from "@/components/common/Icon";

import { ACTION_CONFIGS } from "@/constants/simulation";

import type { SimulationActionHandler, SimulationActionType } from "@/types/simulation/domain";

interface ActionButtonsProps {
  actions: SimulationActionType[];
  simulationId: number;
  actionHandlers: SimulationActionHandler[];
  isLoading: boolean;
  disableButton?: (actionType: SimulationActionType) => boolean;
  className?: string;
}

export default function ActionButtons({
  actions,
  simulationId,
  actionHandlers,
  isLoading,
  disableButton,
  className,
}: ActionButtonsProps) {
  // 핸들러를 타입별로 매핑
  const handlerMap = actionHandlers.reduce(
    (acc, { type, handler }) => {
      acc[type] = handler;
      return acc;
    },
    {} as Record<SimulationActionType, (id: number) => void>,
  );

  if (actions.length === 0) {
    return <span>-</span>;
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {actions.map((actionType) => {
        const config = ACTION_CONFIGS[actionType];
        const handler = handlerMap[actionType];

        return (
          <ActionButton
            key={actionType}
            iconName={config.iconName}
            color={config.color}
            label={config.label}
            onClick={() => handler(simulationId)}
            disabled={disableButton?.(actionType) || isLoading}
          />
        );
      })}
    </div>
  );
}

interface ActionButtonProps {
  iconName: string;
  color: string;
  label?: string;
  onClick: () => void;
  disabled: boolean;
}

function ActionButton({ iconName, color, label, onClick, disabled }: ActionButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault(); // Link 이동 방지
        e.stopPropagation(); // 행 클릭 이벤트 방지
        onClick();
      }}
      disabled={disabled}
      title={label} // 툴팁으로 액션 이름 표시
      className={`flex h-8 w-8 items-center justify-center rounded-md border border-gray-100 text-gray-500 ${
        disabled ? "cursor-default opacity-50" : `cursor-pointer ${color}`
      }`}
    >
      <Icon name={iconName} size="22px" />
    </button>
  );
}
