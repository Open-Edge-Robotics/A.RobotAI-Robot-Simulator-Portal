import type { OverviewConfig } from "@/types/common";
import type {
  PatternConfig,
  PatternType,
  PodStatus,
  PodStatusConfig,
  SimulationActionConfig,
  SimulationActionType,
  SimulationOverviewConfig,
  SimulationStatus,
  SimulationStatusConfig,
  StepsInfoType,
} from "@/types/simulation/domain";

// ========== 스텝 관련 상수 ==========

export const STEPS = ["기본 정보", "패턴 선택", "상세 설정", "검토 및 완료"];

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
} as const;

// ========== 패턴 관련 상수 ==========

export const PATTERN_CONFIGS: Record<PatternType, PatternConfig> = {
  sequential: {
    title: "순차 실행",
    unit: "단계",
    iconName: "arrow_right_alt",
    bgColor: "bg-blue-10",
    iconBgColor: "bg-blue-50",
    iconTextColor: "text-blue-500",
    description: "가상 자율행동체들이 단계별로 순서대로 실행됩니다.\n(첫 번째 그룹 완료 → 두 번째 그룹 시작)",
  },
  parallel: {
    title: "병렬 실행",
    unit: "에이전트 그룹",
    iconName: "arrow_split",
    bgColor: "bg-orange-10",
    iconBgColor: "bg-orange-50",
    iconTextColor: "text-orange-500",
    description: "서로 다른 유형의 가상 자율행동체들이 동시에 실행됩니다.\n(모든 그룹이 같은 시간에 시작)",
  },
} as const;

// ========== 시뮬레이션 상태 관련 상수 ==========

export const STATUS_CONFIGS: Record<SimulationStatus, SimulationStatusConfig> = {
  INITIATING: {
    bgColor: "bg-gray-50",
    highlightColor: "bg-gray-500",
    textColor: "text-gray-700",
    text: "생성중",
  },
  RUNNING: {
    bgColor: "bg-blue-50",
    highlightColor: "bg-blue-500",
    textColor: "text-blue-700",
    text: "실행중",
  },
  COMPLETED: {
    bgColor: "bg-green-50",
    highlightColor: "bg-green-500",
    textColor: "text-green-700",
    text: "완료",
  },
  FAILED: {
    bgColor: "bg-red-50",
    highlightColor: "bg-red-500",
    textColor: "text-red-700",
    text: "실패",
  },
  PENDING: {
    bgColor: "bg-yellow-50",
    highlightColor: "bg-yellow-500",
    textColor: "text-yellow-700",
    text: "대기중",
  },
  STOPPED: {
    bgColor: "bg-gray-50",
    highlightColor: "bg-gray-500",
    textColor: "text-gray-700",
    text: "중지",
  },
  READY: {
    bgColor: "bg-yellow-50",
    highlightColor: "bg-yellow-500",
    textColor: "text-yellow-700",
    text: "대기중",
  },
} as const;

// Pod Status별 설정 상수
export const POD_STATUS_CONFIGS: Record<PodStatus, PodStatusConfig> = {
  PENDING: {
    bgColor: "bg-yellow-10",
    borderColor: "border-yellow-200",
    textColor: "text-yellow-700",
    highlightColor: "bg-yellow-500",
    text: "대기",
  },
  RUNNING: {
    bgColor: "bg-blue-10",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    highlightColor: "bg-blue-500",
    text: "실행중",
  },
  SUCCESS: {
    bgColor: "bg-green-10",
    borderColor: "border-green-200",
    textColor: "text-green-700",
    highlightColor: "bg-green-500",
    text: "성공",
  },
  FAILED: {
    bgColor: "bg-red-10",
    borderColor: "border-red-200",
    textColor: "text-red-700",
    highlightColor: "bg-red-500",
    text: "실패",
  },
  STOPPED: {
    bgColor: "bg-gray-10",
    borderColor: "border-gray-200",
    textColor: "text-gray-700",
    highlightColor: "bg-gray-500",
    text: "중지",
  },
} as const;

// ========== 개요 관련 상수 ==========

export const SIMULATION_OVERVIEW_CONFIGS: { [key: string]: SimulationOverviewConfig } = {
  TOTAL: {
    label: "전체 시뮬레이션",
    iconName: "insert_chart",
    textColor: "text-gray-500",
    bgColor: "bg-gray-50",
  },
  RUNNING: {
    label: "실행중",
    iconName: "play_arrow",
    textColor: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  COMPLETED: {
    label: "완료",
    iconName: "check_box",
    textColor: "text-green-500",
    bgColor: "bg-green-50",
  },
  FAILED: {
    label: "실패",
    iconName: "error",
    textColor: "text-red-500",
    bgColor: "bg-red-50",
  },
};

export const SIMULATION_PROGRESS_OVERVIEW_CONFIGS: { [key: string]: OverviewConfig } = {
  total: {
    label: "전체 단계",
    iconName: "layers",
    iconColor: "text-gray-500",
    iconBgColor: "bg-gray-50",
  },
  current: {
    label: "현재 단계",
    iconName: "adjust",
    iconColor: "text-blue-500",
    iconBgColor: "bg-blue-50",
  },
  completed: {
    label: "완료된 단계",
    iconName: "check_circle",
    iconColor: "text-green-500",
    iconBgColor: "bg-green-50",
  },
} as const;

// ========== 액션 관련 상수 ==========

export const SIMULATION_ACTION_TYPES = ["start", "stop", "edit", "delete"] as const;

// 액션별 설정 정의
export const ACTION_CONFIGS: Record<SimulationActionType, SimulationActionConfig> = {
  start: {
    iconName: "play_arrow",
    color: "hover:border-blue-200 hover:bg-blue-50 hover:text-blue-500 active:text-blue-700",
    label: "시작",
  },
  stop: {
    iconName: "stop",
    color: "hover:border-magenta-200 hover:bg-magenta-50 hover:text-magenta-500 active:text-magenta-700",
    label: "중지",
  },
  edit: {
    iconName: "edit",
    color: "hover:border-gray-200 hover:bg-gray-50 hover:text-gray-500 active:text-gray-700",
    label: "편집",
  },
  delete: {
    iconName: "delete",
    color: "hover:border-red-200 hover:bg-red-50 hover:text-red-500 active:text-red-700",
    label: "삭제",
  },
};

// 상태별로 허용되는 액션
export const ALLOWED_ACTIONS_BY_STATUS: Record<SimulationStatus, SimulationActionType[]> = {
  INITIATING: [],
  PENDING: ["start", "edit", "delete"],
  READY: ["start", "edit", "delete"],
  RUNNING: ["stop"],
  STOPPED: ["start", "edit", "delete"],
  COMPLETED: ["delete"],
  FAILED: ["delete"],
};

// ========== 필터 옵션 ==========

// TODO: 이거 활용해서 config랑 type 만들기
export const FILTER_OPTIONS = {
  status: [
    { value: "", label: "전체 상태" },
    { value: "PENDING", label: "대기중" },
    { value: "RUNNING", label: "실행중" },
    { value: "COMPLETED", label: "완료" },
    { value: "FAILED", label: "실패" },
    { value: "STOPPED", label: "중지" },
  ],
  patternType: [
    { value: "", label: "전체 패턴 타입" },
    { value: "sequential", label: "순차실행" },
    { value: "parallel", label: "병렬실행" },
  ],
} as const;

// ========== 허용된 URL 파라미터 ==========

export const ALLOWED_PARAMS = ["page", "size", "status", "pattern_type"] as const;
