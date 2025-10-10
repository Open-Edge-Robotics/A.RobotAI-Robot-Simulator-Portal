import type { ParallelProgress, SequentialProgress } from "./domain";
import type { ParallelPatternGroupDetail, SequentialPatternGroupDetail } from "./groupDetail";

export type GetStatusResponse = { execution: SequentialResponseBase | ParallelResponseBase };

interface SequentialResponseBase {
  simulationId: number;
  patternType: "sequential";
  currentStatus: GetSequentialStatusResponse;
  executionId: number;
}

interface ParallelResponseBase {
  simulationId: number;
  patternType: "parallel";
  currentStatus: GetParallelStatusResponse;
  executionId: number;
}

export type GetSequentialStatusResponse =
  | GetSequentialInitiatingStatusResponse
  | GetSequentialPendingStatusResponse
  | GetSequentialRunningStatusResponse
  | GetSequentialCompletedStatusResponse
  | GetSequentialFailedStatusResponse
  | GetSequentialStoppedStatusResponse;

export type GetParallelStatusResponse =
  | GetParallelInitiatingStatusResponse
  | GetParallelPendingStatusResponse
  | GetParallelRunningStatusResponse
  | GetParallelCompletedStatusResponse
  | GetParallelFailedStatusResponse
  | GetParallelStoppedStatusResponse;

interface GetSequentialInitiatingStatusResponse {
  status: "INITIATING";
  message: string;
  timestamps: {
    createdAt: string;
    lastUpdated: string;
  };
}

interface GetParallelInitiatingStatusResponse {
  status: "INITIATING";
  message: string;
  timestamps: {
    createdAt: string;
    lastUpdated: string;
  };
}

interface GetSequentialPendingStatusResponse {
  status: "PENDING";
  message: string;
  timestamps: {
    createdAt: string;
    lastUpdated: string;
  };
  progress: Required<SequentialProgress>;
  stepDetails: SequentialPatternGroupDetail[];
}

interface GetParallelPendingStatusResponse {
  status: "PENDING";
  message: string;
  timestamps: {
    createdAt: string;
    lastUpdated: string;
  };
  progress: Required<ParallelProgress>;
  groupDetails: ParallelPatternGroupDetail[];
}

export interface GetSequentialRunningStatusResponse {
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

export interface GetParallelRunningStatusResponse {
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

interface GetSequentialCompletedStatusResponse {
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

interface GetParallelCompletedStatusResponse {
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

interface GetSequentialFailedStatusResponse {
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

interface GetParallelFailedStatusResponse {
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

interface GetSequentialStoppedStatusResponse {
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

interface GetParallelStoppedStatusResponse {
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
