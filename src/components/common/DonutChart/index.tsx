import { ICONS } from "@/constants/icon";

import Icon from "../Icon";

// 상수 정의
const DEFAULT_RADIUS = 40;
const DEFAULT_STROKE_WIDTH = 8;
const CIRCUMFERENCE = 2 * Math.PI * DEFAULT_RADIUS; // ≈ 251.2
const PERCENTAGE_TO_LENGTH_RATIO = CIRCUMFERENCE / 100; // ≈ 2.51

// 크기 프리셋
const SIZE_PRESETS = {
  small: { size: 60, strokeWidth: 6, textSize: "text-xs" },
  medium: { size: 80, strokeWidth: 8, textSize: "text-sm" },
  large: { size: 120, strokeWidth: 10, textSize: "text-base" },
} as const;

interface DonutChartProps {
  /** 차트 라벨 */
  label: string;
  /** 진행률 (0-100) */
  percentage: number;
  /** 차트 크기 프리셋 또는 커스텀 크기 */
  size?: keyof typeof SIZE_PRESETS | number;
  /** 진행률 바 색상 (CSS 변수 또는 색상값) */
  color?: string;
  /** 배경 색상 (CSS 변수 또는 색상값) */
  backgroundColor?: string;
  /** 라벨 표시 여부 */
  showLabel?: boolean;
  /** 퍼센트 표시 여부 */
  showPercentage?: boolean;
  /** 커스텀 중앙 텍스트 */
  centerText?: string;
}

export default function DonutChart({
  label,
  percentage,
  size = "medium",
  color = "var(--color-green-500)",
  backgroundColor = "var(--color-gray-100)",
  showLabel = true,
  showPercentage = true,
  centerText,
}: DonutChartProps) {
  // 크기 및 스타일 계산
  const sizeConfig =
    typeof size === "number" ? { size, strokeWidth: DEFAULT_STROKE_WIDTH, textSize: "text-sm" } : SIZE_PRESETS[size];

  // 진행률 계산 (0-100 범위로 제한)
  const clampedPercentage = Math.max(0, Math.min(100, percentage));
  const strokeDasharray = `${clampedPercentage * PERCENTAGE_TO_LENGTH_RATIO} ${CIRCUMFERENCE}`;

  // 중앙 텍스트 결정
  const displayText = centerText || (showPercentage ? `${clampedPercentage}%` : "");

  const isError = percentage < 0;

  return (
    <div className="text-center">
      <div className="relative mx-auto mb-3" style={{ width: sizeConfig.size, height: sizeConfig.size }}>
        <svg width={sizeConfig.size} height={sizeConfig.size} className="-rotate-90 transform" viewBox="0 0 100 100">
          {/* 배경 원 */}
          <circle
            cx="50"
            cy="50"
            r={DEFAULT_RADIUS}
            stroke={backgroundColor}
            strokeWidth={sizeConfig.strokeWidth}
            fill="none"
          />

          {/* 진행률 원 */}
          <circle
            cx="50"
            cy="50"
            r={DEFAULT_RADIUS}
            stroke={isError ? "var(--color-red-500)" : color}
            strokeWidth={sizeConfig.strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            className="transition-all duration-300 ease-in-out"
          />
        </svg>

        {/* 중앙 텍스트 */}
        {displayText && (
          <div className="absolute inset-0 flex items-center justify-center">
            {isError ? (
              <Icon name={ICONS.warning} className="text-red-600" />
            ) : (
              <span className={`font-semibold ${sizeConfig.textSize}`}>{displayText}</span>
            )}
          </div>
        )}
      </div>

      {/* 라벨 */}
      {showLabel && <p className="font-medium">{label}</p>}
    </div>
  );
}
