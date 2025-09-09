import type { GroupStatus } from "./domain";

interface GroupDetailBase {
  status: GroupStatus;
  progress: number;
  autonomousAgents: number;
  currentRepeat: number;
  totalRepeats: number;
}

interface SequentialGroupDetailBase extends GroupDetailBase {
  stepOrder: number;
}

interface ParallelGroupDetailBase extends GroupDetailBase {
  groupId: number;
}

// Pending 상태의 그룹 세부 정보
interface PendingGroupDetail extends GroupDetailBase {
  status: "PENDING";
}

// Running 상태의 그룹 세부 정보
interface RunningGroupDetail extends GroupDetailBase {
  status: "RUNNING";
  startedAt: string;
}

// Completed 상태의 그룹 세부 정보
interface CompletedGroupDetail extends GroupDetailBase {
  status: "COMPLETED";
  startedAt: string;
  completedAt: string;
}

// Failed 상태의 그룹 세부 정보
interface FailedGroupDetail extends GroupDetailBase {
  status: "FAILED";
  startedAt: string;
  failedAt: string;
  error: string;
}

// Stopped 상태의 그룹 세부 정보
interface StoppedGroupDetail extends GroupDetailBase {
  status: "STOPPED";
  startedAt: string;
  stoppedAt: string;
}

// Sequential 그룹 세부 정보 타입들
export type SequentialRunningGroupDetail = SequentialGroupDetailBase & RunningGroupDetail;
export type SequentialCompletedGroupDetail = SequentialGroupDetailBase & CompletedGroupDetail;
export type SequentialFailedGroupDetail = SequentialGroupDetailBase & FailedGroupDetail;
export type SequentialStoppedGroupDetail = SequentialGroupDetailBase & StoppedGroupDetail;
export type SequentialPendingGroupDetail = SequentialGroupDetailBase & PendingGroupDetail;

// Parallel 그룹 세부 정보 타입들
export type ParallelRunningGroupDetail = ParallelGroupDetailBase & RunningGroupDetail;
export type ParallelCompletedGroupDetail = ParallelGroupDetailBase & CompletedGroupDetail;
export type ParallelFailedGroupDetail = ParallelGroupDetailBase & FailedGroupDetail;
export type ParallelStoppedGroupDetail = ParallelGroupDetailBase & StoppedGroupDetail;
export type ParallelPendingGroupDetail = ParallelGroupDetailBase & PendingGroupDetail;

// 모든 Sequential 그룹 세부 정보의 유니온 타입
export type SequentialGroupDetail =
  | SequentialRunningGroupDetail
  | SequentialCompletedGroupDetail
  | SequentialFailedGroupDetail
  | SequentialStoppedGroupDetail
  | SequentialPendingGroupDetail;

// 모든 Parallel 그룹 세부 정보의 유니온 타입
export type ParallelGroupDetail =
  | ParallelRunningGroupDetail
  | ParallelCompletedGroupDetail
  | ParallelFailedGroupDetail
  | ParallelStoppedGroupDetail
  | ParallelPendingGroupDetail;

// 전체 GroupDetail 유니온 타입
export type GroupDetail = SequentialGroupDetail | ParallelGroupDetail;
