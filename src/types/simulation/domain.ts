// types/simulation/domain.ts

import type { ALLOWED_PARAMS, FILTER_OPTIONS, SIMULATION_ACTION_TYPES } from "@/constants/simulation";

import type { Timestamp } from "../common";
import type { ParallelProgress, SequentialProgress } from "./api";

// ========== 기본 엔티티 타입 ==========

export interface Simulation {
  simulationId: number;
  simulationName: string;
  patternType: PatternType;
  status: SimulationStatus;
  mecId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Template {
  id: number;
  name: string;
}

export interface Mec {
  id: string;
  name: string;
}

export interface SimulationOverview {
  total: number;
  pending: number;
  running: number;
  completed: number;
  failed: number;
}

// ========== 각종 열거형 타입 ==========

export type SimulationStatus = "INITIATING" | "RUNNING" | "COMPLETED" | "FAILED" | "PENDING" | "STOPPED" | "READY";
export type GroupStatus = "RUNNING" | "COMPLETED" | "FAILED" | "PENDING" | "STOPPED";
export type StepType = 1 | 2 | 3 | 4;
export type PatternType = "sequential" | "parallel";
export type SimulationActionType = (typeof SIMULATION_ACTION_TYPES)[number];
export type PodStatus = "PENDING" | "RUNNING" | "SUCCESS" | "FAILED" | "STOPPED";

// ========== 에이전트 그룹 타입 ==========

interface BaseAgentGroup {
  templateId: number | null;
  autonomousAgentCount: number;
  executionTime: number; // in seconds
  repeatCount: number;
}

export interface SequentialAgentGroup extends BaseAgentGroup {
  stepOrder: number;
  delayAfterCompletion: number; // in seconds
}

export interface ParallelAgentGroup extends BaseAgentGroup {} // 병렬 그룹에는 추가 필드 없음

// ========== 패턴 타입 ==========

export type SimulationPattern =
  | { type: "sequential"; agentGroups: SequentialAgentGroup[] }
  | { type: "parallel"; agentGroups: ParallelAgentGroup[] }
  | null;

// ========== 폼 데이터 타입 ==========

export interface SimulationFormData {
  name: string;
  description: string;
  mecId: string | null;
  pattern: SimulationPattern;
}

// ========== UI 구성 타입 ==========

export interface StepInfo {
  title: string;
  description: string;
}

export interface StepsInfoType {
  1: StepInfo;
  2: StepInfo;
  3: {
    sequential: StepInfo;
    parallel: StepInfo;
    repeat: StepInfo;
  };
  4: StepInfo;
}

export interface PatternConfig {
  title: string;
  unit: string;
  iconName: string;
  bgColor: string;
  iconBgColor: string;
  iconTextColor: string;
  description: string;
}

export interface SimulationStatusConfig {
  bgColor: string;
  highlightColor: string;
  textColor: string;
  text: string;
}

export interface SimulationOverviewConfig {
  label: string;
  iconName: string;
  textColor: string;
  bgColor: string;
}

export interface PodStatusConfig {
  bgColor: string;
  borderColor: string;
  textColor: string;
  highlightColor: string;
  text: string;
}

// ========== 액션 관련 타입 ==========

export interface SimulationActions {
  onStart: (id: number) => void;
  onStop: (id: number) => void;
  onDelete: (id: number) => void;
}

export interface SimulationActionHandler {
  type: SimulationActionType;
  handler: (id: number) => void;
}

export interface SimulationActionConfig {
  iconName: string;
  color: string;
  label?: string;
}

// ========== 필터 및 검색 관련 타입 ==========

export type AllowedParam = (typeof ALLOWED_PARAMS)[number];
export type StatusFilterOption = (typeof FILTER_OPTIONS.status)[number]["value"];
export type PatternTypeFilterOption = (typeof FILTER_OPTIONS.patternType)[number]["value"];

export interface ResourceUsageData {
  cpu: { usagePercent: number; status: string };
  memory: { usagePercent: number; status: string };
  disk: { usagePercent: number; status: string };
}

export interface PodStatusData {
  totalCount: number;
  overallHealthPercent: number;
  statusBreakdown: PodStatusBreakdownData | {};
}

export type PodStatusBreakdownData = {
  [K in PodStatus]: { count: number; percentage: number };
};

export interface SequentialProgressData {
  patternType: "sequential";
  progress: SequentialProgress;
}

export interface ParallelProgressData {
  patternType: "parallel";
  progress: ParallelProgress;
}
