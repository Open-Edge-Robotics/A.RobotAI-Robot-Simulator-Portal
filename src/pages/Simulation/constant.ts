import type { PatternCardData, PatternType, StepsInfoType } from "./types";

export const STEPS = ["기본 정보", "패턴 선택", "상세 설정", "검토 및 완료"];

// 각 단계에 대한 정보
export const STEPS_INFO: StepsInfoType = {
  1: {
    title: "1단계: 기본 정보 입력",
    description: "시뮬레이션의 이름과 정보를 설정하세요.",
  },
  2: {
    title: "2단계: 실행 패턴 선택",
    description: "가상 자율행동체들이 어떤 방식으로 실행될지 선택하세요.",
  },
  3: {
    sequential: {
      title: "3단계: 순차 실행 상세 설정",
      description: "단계별로 실행할 템플릿들을 순서대로 추가하세요.",
    },
    parallel: {
      title: "3단계: 병렬 실행 상세 설정",
      description: "동시에 실행할 템플릿들을 추가하세요.",
    },
    repeat: {
      title: "3단계: 반복 실행 상세 설정",
      description: "반복적으로 실행할 템플릿들을 추가하세요.",
    },
  },
  4: {
    title: "4단계: 검토 및 완료",
    description: "입력한 정보를 검토하고 시뮬레이션을 생성하세요.",
  },
};

// 패턴별 안내 정보
export const PATTERN_DATA: { [K in PatternType]: PatternCardData } = {
  sequential: {
    title: "순차 실행",
    unit: "단계",
    iconName: "arrow_right_alt",
    bgColor: "bg-blue-50",
    iconBgColor: "bg-blue-100",
    iconTextColor: "text-blue-600",
    description:
      "가상 자율행동체들이 단계별로 순서대로 실행됩니다.\n(첫 번째 그룹 완료 → 두 번째 그룹 시작)",
  },
  parallel: {
    title: "병렬 실행",
    unit: "에이전트 그룹",
    iconName: "arrow_split",
    bgColor: "bg-orange-50",
    iconBgColor: "bg-orange-100",
    iconTextColor: "text-orange-600",
    description:
      "서로 다른 유형의 가상 자율행동체들이 동시에 실행됩니다.\n(모든 그룹이 같은 시간에 시작)",
  },
};
