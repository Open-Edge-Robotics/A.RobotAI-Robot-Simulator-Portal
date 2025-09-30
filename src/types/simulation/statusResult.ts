import type { ParallelProgress, SequentialProgress } from "./domain";
import type { ParallelPatternGroupDetail, SequentialPatternGroupDetail } from "./groupDetail";

export type GetStatusResponseFinal = { execution: SequentialResponseBase | ParallelResponseBase };

interface SequentialResponseBase {
  simulationId: number;
  patternType: "sequential";
  currentStatus: GetSequentialStatusResult;
  executionId: number;
}

interface ParallelResponseBase {
  simulationId: number;
  patternType: "parallel";
  currentStatus: GetParallelStatusResult;
  executionId: number;
}

export type GetSequentialStatusResult =
  | GetSequentialInitiatingStatusResult
  | GetSequentialPendingStatusResult
  | GetSequentialRunningStatusResult
  | GetSequentialCompletedStatusResult
  | GetSequentialFailedStatusResult
  | GetSequentialStoppedStatusResult;

export type GetParallelStatusResult =
  | GetParallelInitiatingStatusResult
  | GetParallelPendingStatusResult
  | GetParallelRunningStatusResult
  | GetParallelCompletedStatusResult
  | GetParallelFailedStatusResult
  | GetParallelStoppedStatusResult;

interface GetSequentialInitiatingStatusResult {
  status: "INITIATING";
  message: string;
  timestamps: {
    createdAt: string;
    lastUpdated: string;
  };
}

interface GetParallelInitiatingStatusResult {
  status: "INITIATING";
  message: string;
  timestamps: {
    createdAt: string;
    lastUpdated: string;
  };
}

interface GetSequentialPendingStatusResult {
  status: "PENDING";
  message: string;
  timestamps: {
    createdAt: string;
    lastUpdated: string;
  };
  progress: Required<SequentialProgress>;
  stepDetails: SequentialPatternGroupDetail[];
}

interface GetParallelPendingStatusResult {
  status: "PENDING";
  message: string;
  timestamps: {
    createdAt: string;
    lastUpdated: string;
  };
  progress: Required<ParallelProgress>;
  groupDetails: ParallelPatternGroupDetail[];
}

export interface GetSequentialRunningStatusResult {
  status: "RUNNING";
  message: string;
  timestamps: {
    createdAt: string;
    lastUpdated: string;
    startedAt: string;
  };
  progress: Required<SequentialProgress>;
  stepDetails: SequentialPatternGroupDetail[];
}

export interface GetParallelRunningStatusResult {
  status: "RUNNING";
  message: string;
  timestamps: {
    createdAt: string;
    lastUpdated: string;
    startedAt: string;
  };
  progress: Required<ParallelProgress>;
  groupDetails: ParallelPatternGroupDetail[];
}

interface GetSequentialCompletedStatusResult {
  status: "COMPLETED";
  message: string;
  timestamps: {
    createdAt: string;
    lastUpdated: string;
    startedAt: string;
    completedAt: string;
  };
  progress: Omit<SequentialProgress, "currentStep">;
  stepDetails: SequentialPatternGroupDetail[];
}

interface GetParallelCompletedStatusResult {
  status: "COMPLETED";
  message: string;
  timestamps: {
    createdAt: string;
    lastUpdated: string;
    startedAt: string;
    completedAt: string;
  };
  progress: Omit<ParallelProgress, "runningGroups">;
  groupDetails: ParallelPatternGroupDetail[];
}

interface GetSequentialFailedStatusResult {
  status: "FAILED";
  message: string;
  timestamps: {
    createdAt: string;
    lastUpdated: string;
    startedAt: string;
    failedAt: string;
  };
  progress: Required<SequentialProgress>;
  stepDetails: SequentialPatternGroupDetail[];
}

interface GetParallelFailedStatusResult {
  status: "FAILED";
  message: string;
  timestamps: {
    createdAt: string;
    lastUpdated: string;
    startedAt: string;
    failedAt: string;
  };
  progress: Required<ParallelProgress>;
  groupDetails: ParallelPatternGroupDetail[];
}

interface GetSequentialStoppedStatusResult {
  status: "STOPPED";
  message: string;
  timestamps: {
    createdAt: string;
    lastUpdated: string;
    startedAt: string;
    stoppedAt: string;
  };
  progress: Required<SequentialProgress>;

  stepDetails: SequentialPatternGroupDetail[];
}

interface GetParallelStoppedStatusResult {
  status: "STOPPED";
  message: string;
  timestamps: {
    createdAt: string;
    lastUpdated: string;
    startedAt: string;
    stoppedAt: string;
  };
  progress: Required<ParallelProgress>;
  groupDetails: ParallelPatternGroupDetail[];
}
