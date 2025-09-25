import { STATUS_CONFIGS } from "@/constants/simulation";

import type { PatternGroupDetail } from "@/types/simulation/groupDetail";

import { formatDateTime, formatMsToGeneralForm } from "@/utils/common/formatting";

interface FieldConfig {
  label: string;
  value: string;
}
// 시간 필드를 생성하는 헬퍼 함수들
const createTimeFields = {
  duration: (label: string, startTime: string, endTime: string) => ({
    label,
    value: formatMsToGeneralForm(new Date(endTime).getTime() - new Date(startTime).getTime()),
  }),

  startTime: (time: string) => ({
    label: "시작 시간",
    value: formatDateTime(time),
  }),

  endTime: (label: string, time: string) => ({
    label,
    value: formatDateTime(time),
  }),

  error: (error: string) => ({
    label: "오류",
    value: error,
  }),
};

// 상태별 필드 설정을 생성하는 함수
export function getFieldConfigs(group: PatternGroupDetail, lastUpdatedAt: string): FieldConfig[] {
  const baseFields: FieldConfig[] = [
    { label: "상태", value: STATUS_CONFIGS[group.status].text },
    { label: "자율행동체 수", value: group.autonomousAgents.toString() },
    { label: "반복 횟수", value: `${group.currentRepeat}/${group.totalRepeats}` },
  ];

  switch (group.status) {
    case "PENDING": {
      return baseFields;
    }

    case "RUNNING": {
      return [
        ...baseFields,
        createTimeFields.startTime(group.startedAt),
        createTimeFields.duration("경과 시간", group.startedAt, lastUpdatedAt),
      ];
    }
    case "COMPLETED": {
      return [
        ...baseFields,
        createTimeFields.startTime(group.startedAt),
        createTimeFields.endTime("완료 시간", group.completedAt),
        createTimeFields.duration("소요 시간", group.startedAt, group.completedAt),
      ];
    }

    case "FAILED": {
      return [
        ...baseFields,
        createTimeFields.startTime(group.startedAt),
        createTimeFields.endTime("실패 시간", group.failedAt),
        createTimeFields.duration("경과 시간", group.startedAt, group.failedAt),
        createTimeFields.error(group.error),
      ];
    }

    case "STOPPED": {
      return [
        ...baseFields,
        createTimeFields.startTime(group.startedAt),
        createTimeFields.endTime("중지 시간", group.stoppedAt),
        createTimeFields.duration("경과 시간", group.startedAt, group.stoppedAt),
      ];
    }

    default: {
      // Exhaustiveness check - 새로운 상태가 추가되면 컴파일 에러 발생
      const _exhaustiveCheck: never = group;
      return baseFields;
    }
  }
}
