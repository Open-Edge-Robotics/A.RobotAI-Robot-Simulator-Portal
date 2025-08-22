import type { ALLOWED_PARAMS, FILTER_OPTIONS, STATUS_CONFIG } from "./constants";

export interface SimulationFormData {
  name: string;
  description: string;
  mecId: string | null;
  pattern: Pattern;
}

export type StepType = 1 | 2 | 3 | 4;

export type PatternType = "sequential" | "parallel";

export interface PatternCardConfig {
  title: string;
  unit: string;
  iconName: string;
  bgColor: string;
  iconBgColor: string;
  iconTextColor: string;
  description: string;
}

export interface Mec {
  id: string;
  name: string;
}

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

export interface Template {
  id: number;
  name: string;
}

export interface SequentialAgentGroup {
  stepOrder: number;
  templateId: number | null;
  agentCount: number;
  executionTime: number; // in seconds
  delayAfterCompletion: number; // in seconds
  repeatCount: number;
}

export interface ParallelAgentGroup {
  templateId: number | null;
  agentCount: number;
  executionTime: number; // in seconds
  repeatCount: number;
}

export type Pattern =
  | {
      type: "sequential";
      agentGroups: SequentialAgentGroup[];
    }
  | { type: "parallel"; agentGroups: ParallelAgentGroup[] }
  | null;

export interface SimulationOverviewConfig {
  label: string;
  iconName: string;
  textColor: string;
  bgColor: string;
}

export type AllowedParam = (typeof ALLOWED_PARAMS)[number];

export type StatusFilterOption = (typeof FILTER_OPTIONS.status)[number]["value"];

export type PatternTypeFilterOption = (typeof FILTER_OPTIONS.patternType)[number]["value"];

export type Status = keyof typeof STATUS_CONFIG;
