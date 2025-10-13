import type { ParallelProgress, SequentialProgress } from "./domain";
import type { ParallelPatternGroupDetail, SequentialPatternGroupDetail } from "./groupDetail";

export type GetExecutionRecordResponse = {
  execution: GetSequentialExecutionRecordResponse | ParallelExecutionRecordResponse;
};

interface GetSequentialExecutionRecordResponse {
  simulationId: number;
  patternType: "sequential";
  currentStatus: SequentialStatusResponse;
  executionId: number;
}

interface ParallelExecutionRecordResponse {
  simulationId: number;
  patternType: "parallel";
  currentStatus: ParallelStatusResponse;
  executionId: number;
}

export type SequentialStatusResponse =
  | SequentialInitiatingStatus
  | SequentialPendingStatus
  | SequentialRunningStatus
  | SequentialCompletedStatus
  | SequentialFailedStatus
  | SequentialStoppedStatus;

export type ParallelStatusResponse =
  | ParallelInitiatingStatus
  | ParallelPendingStatus
  | ParallelRunningStatus
  | ParallelCompletedStatus
  | ParallelFailedStatus
  | ParallelStoppedStatus;

interface SequentialInitiatingStatus {
  status: "INITIATING";
  message: string;
  timestamps: {
    createdAt: string;
    lastUpdated: string;
  };
}

interface ParallelInitiatingStatus {
  status: "INITIATING";
  message: string;
  timestamps: {
    createdAt: string;
    lastUpdated: string;
  };
}

interface SequentialPendingStatus {
  status: "PENDING";
  message: string;
  timestamps: {
    createdAt: string;
    lastUpdated: string;
  };
  progress: Required<SequentialProgress>;
  stepDetails: SequentialPatternGroupDetail[];
}

interface ParallelPendingStatus {
  status: "PENDING";
  message: string;
  timestamps: {
    createdAt: string;
    lastUpdated: string;
  };
  progress: Required<ParallelProgress>;
  groupDetails: ParallelPatternGroupDetail[];
}

export interface SequentialRunningStatus {
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

export interface ParallelRunningStatus {
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

interface SequentialCompletedStatus {
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

interface ParallelCompletedStatus {
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

interface SequentialFailedStatus {
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

interface ParallelFailedStatus {
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

interface SequentialStoppedStatus {
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

interface ParallelStoppedStatus {
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
