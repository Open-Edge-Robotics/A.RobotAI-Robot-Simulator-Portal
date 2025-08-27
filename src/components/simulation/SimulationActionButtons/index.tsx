import Icon from "@/components/common/Icon";

import { ACTION_CONFIGS, ALLOWED_ACTIONS_BY_STATUS } from "@/constants/simulation";

import type { SimulationActionHandler, SimulationActionType, SimulationStatus } from "@/types/simulation/domain";

interface ActionButtonsProps {
  status: SimulationStatus;
  simulationId: number;
  actionHandlers: SimulationActionHandler[];
  isLoading: boolean;
  className?: string;
}

export default function ActionButtons({
  status,
  simulationId,
  actionHandlers,
  isLoading,
  className,
}: ActionButtonsProps) {
  // 현재 상태에서 허용되는 액션들 필터링
  const allowedActions = ALLOWED_ACTIONS_BY_STATUS[status];

  // 핸들러를 타입별로 매핑
  const handlerMap = actionHandlers.reduce(
    (acc, { type, handler }) => {
      acc[type] = handler;
      return acc;
    },
    {} as Record<SimulationActionType, (id: number) => void>,
  );

  if (allowedActions.length === 0) {
    return <span>-</span>;
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {allowedActions.map((actionType) => {
        const config = ACTION_CONFIGS[actionType];
        const handler = handlerMap[actionType];

        return (
          <ActionButton
            key={actionType}
            iconName={config.iconName}
            color={config.color}
            label={config.label}
            onClick={() => handler(simulationId)}
            disabled={isLoading}
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
      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-gray-100 text-gray-500 ${
        disabled ? "opacity-50" : color
      }`}
    >
      <Icon name={iconName} size="22px" />
    </button>
  );
}
