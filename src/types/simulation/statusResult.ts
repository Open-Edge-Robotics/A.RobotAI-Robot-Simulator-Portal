import type { ParallelGroupDetail, SequentialGroupDetail } from "./groupDetail";

export type GetStatusResponseFinal = SequentialResponseBase | ParallelResponseBase;

interface SequentialResponseBase {
  simulationId: number;
  patternType: "sequential";
  currentStatus: GetSequentialStatusResult;
}

interface ParallelResponseBase {
  simulationId: number;
  patternType: "parallel";
  currentStatus: GetParallelStatusResult;
}

type GetSequentialStatusResult =
  | GetSequentialInitiatingStatusResult
  | GetSequentialPendingStatusResult
  | GetSequentialRunningStatusResult
  | GetSequentialCompletedStatusResult
  | GetSequentialFailedStatusResult
  | GetSequentialStoppedStatusResult;

type GetParallelStatusResult =
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
  progress: {
    overallProgress: number;
    currentStep: number;
    totalSteps: number;
    completedSteps: number;
  };
  stepDetails: SequentialGroupDetail[];
}

interface GetParallelPendingStatusResult {
  status: "PENDING";
  message: string;
  timestamps: {
    createdAt: string;
    lastUpdated: string;
  };
  progress: {
    overallProgress: number;
    runningGroups: number;
    totalGroups: number;
    completedGroups: number;
  };
  groupDetails: ParallelGroupDetail[];
}

interface GetSequentialRunningStatusResult {
  status: "RUNNING";
  message: string;
  timestamps: {
    createdAt: string;
    lastUpdated: string;
    startedAt: string;
  };
  progress: {
    overallProgress: number;
    currentStep: number;
    totalSteps: number;
    completedSteps: number;
  };
  stepDetails: SequentialGroupDetail[];
}

interface GetParallelRunningStatusResult {
  status: "RUNNING";
  message: string;
  timestamps: {
    createdAt: string;
    lastUpdated: string;
    startedAt: string;
  };
  progress: {
    overallProgress: number;
    runningGroups: number;
    totalGroups: number;
    completedGroups: number;
  };
  groupDetails: ParallelGroupDetail[];
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
  progress: {
    overallProgress: number;
    totalSteps: number;
    completedSteps: number;
  };
  stepDetails: SequentialGroupDetail[];
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
  progress: {
    overallProgress: number;
    totalGroups: number;
    completedGroups: number;
  };
  groupDetails: ParallelGroupDetail[];
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
  progress: {
    overallProgress: number;
    currentStep: number;
    totalSteps: number;
    completedSteps: number;
  };
  stepDetails: SequentialGroupDetail[];
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
  progress: {
    overallProgress: number;
    runningGroups: number;
    totalGroups: number;
    completedGroups: number;
  };
  groupDetails: ParallelGroupDetail[];
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
  progress: {
    overallProgress: number;
    currentStep: number;
    totalSteps: number;
    completedSteps: number;
  };
  stepDetails: SequentialGroupDetail[];
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
  progress: {
    overallProgress: number;
    runningGroups: number;
    totalGroups: number;
    completedGroups: number;
  };
  groupDetails: ParallelGroupDetail[];
}
