import ProgressBar from "@/components/common/ProgressBar";

import { PATTERN_CONFIGS, STATUS_CONFIGS } from "@/constants/simulation";

import type { ParallelProgressData, SequentialProgressData, SimulationStatus } from "@/types/simulation/domain";

interface ProgressIndicatorProps {
  progressData: SequentialProgressData | ParallelProgressData;
  status: SimulationStatus;
}

export default function ProgressIndicator({ progressData, status }: ProgressIndicatorProps) {
  const { runningText, completedText } = getProgressTexts(progressData);
  const progressPercentage = progressData.progress.overallProgress;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">진행률</span>
        <span className="text-sm font-semibold">{progressPercentage}%</span>
      </div>
      <ProgressBar progress={progressPercentage} color={STATUS_CONFIGS[status].highlightColor} />
      <div className="mt-2.5 flex justify-between text-sm text-gray-500">
        <span>{runningText}</span>
        <span>{completedText}</span>
      </div>
    </div>
  );
}

// 진행 상황 텍스트 생성 로직 분리
const getProgressTexts = (
  progressData: ProgressIndicatorProps["progressData"],
): {
  runningText: string;
  completedText: string;
} => {
  const unit = PATTERN_CONFIGS[progressData.patternType].unit;
  const fallbackMessage = `실행 중인 ${unit} 없음`;

  switch (progressData.patternType) {
    case "sequential": {
      const progress = progressData.progress;
      return {
        runningText: progress.currentStep
          ? `${unit} ${progress.currentStep}/${progress.totalSteps} 실행 중`
          : fallbackMessage,
        completedText: `${progress.completedSteps}개 완료`,
      };
    }
    case "parallel": {
      const progress = progressData.progress;
      return {
        runningText: progress.runningGroups
          ? `${unit} ${progress.runningGroups}/${progress.totalGroups} 실행 중`
          : fallbackMessage,
        completedText: `${progress.completedGroups}개 완료`,
      };
    }
    default: {
      // Exhaustiveness Checking: 새로운 패턴 타입이 추가되었을 때
      // 이 함수에서 해당 케이스를 처리하지 않으면 TypeScript 컴파일 에러가 발생합니다.
      // 이를 통해 런타임 에러를 사전에 방지할 수 있습니다.
      const _exhaustive: never = progressData;
      throw new Error(`Unknown pattern type`);
    }
  }
};
