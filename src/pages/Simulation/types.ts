export interface SimulationFormData {
  name: string;
  description: string;
  mec: Mec | null;
  pattern: Pattern;
}

export type StepType = 1 | 2 | 3 | 4;

export type PatternType = "sequential" | "parallel";

export interface PatternCardData {
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
  id: string;
  name: string;
}

export interface SequentialAgentGroup {
  stepOrder: number;
  template: Template | null;
  autonomousAgentCount: number;
  executionTime: number; // in seconds
  delayAfterCompletion: number; // in seconds
  repeatCount: number;
}

export interface ParallelAgentGroup {
  template: Template | null;
  autonomousAgentCount: number;
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
