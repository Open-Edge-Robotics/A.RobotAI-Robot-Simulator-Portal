import type {
  GetSimulationsResult,
  GetSimulationStaticResult,
  GetSimulationSummaryResult,
} from "@/types/simulation/api";
import type { GetStatusResponseFinal } from "@/types/simulation/status";

// Sequential Pattern Mock Data
export const mockSimulationSequentialPending: GetSimulationStaticResult = {
  simulationId: 12345,
  simulationName: "IoT Device Load Test Simulation",
  simulationDescription: "IoT 디바이스의 부하 테스트를 위한 순차적 실행 시뮬레이션",
  mecId: "mec-001-seoul",
  namespace: "iot-simulation",
  createdAt: "2024-08-30T09:30:00Z",
  currentStatus: {
    status: "PENDING",
    timestamps: {
      createdAt: "2024-08-30T09:30:00Z",
      lastUpdated: "2024-08-30T10:30:00Z",
    },
  },
  patternType: "sequential",

  executionPlan: {
    steps: [
      {
        stepOrder: 1,
        templateId: 101,
        templateName: "Device Connection Template",
        autonomousAgentCount: 100,
        repeatCount: 3,
        executionTime: 300,
        delayAfterCompletion: 30,
      },
      {
        stepOrder: 2,
        templateId: 102,
        templateName: "Data Transmission Template",
        autonomousAgentCount: 150,
        repeatCount: 5,
        executionTime: 600,
        delayAfterCompletion: 60,
      },
      {
        stepOrder: 3,
        templateId: 103,
        templateName: "Stress Test Template",
        autonomousAgentCount: 200,
        repeatCount: 2,
        executionTime: 900,
        delayAfterCompletion: 0,
      },
    ],
  },
};

// Parallel Pattern Mock Data
export const mockSimulationParallelRunning: GetSimulationStaticResult = {
  simulationId: 67890,
  simulationName: "Multi-Service Parallel Test",
  simulationDescription: "여러 서비스의 동시 부하 테스트를 위한 병렬 실행 시뮬레이션",
  mecId: "mec-002-busan",
  namespace: "parallel-test",
  createdAt: "2024-08-30T08:15:00Z",
  currentStatus: {
    status: "RUNNING",
    timestamps: {
      createdAt: "2024-08-30T08:15:00Z",
      lastUpdated: "2024-08-30T09:00:00Z",
    },
  },

  patternType: "parallel",

  executionPlan: {
    groups: [
      {
        groupId: 1,
        templateId: 201,
        templateName: "API Gateway Load Test",
        autonomousAgentCount: 80,
        repeatCount: 10,
        executionTime: 1200,
      },
      {
        groupId: 2,
        templateId: 202,
        templateName: "Database Query Test",
        autonomousAgentCount: 50,
        repeatCount: 15,
        executionTime: 800,
      },
      {
        groupId: 3,
        templateId: 203,
        templateName: "File Upload Test",
        autonomousAgentCount: 30,
        repeatCount: 5,
        executionTime: 1500,
      },
    ],
  },
};

export const mockSimulationParallelCompleted: GetSimulationStaticResult = {
  simulationId: 78901,
  simulationName: "E-Commerce Platform Load Test",
  simulationDescription: "온라인 쇼핑몰의 주요 기능들에 대한 종합적인 부하 테스트 완료",
  mecId: "mec-003-seoul",
  namespace: "ecommerce-test",
  createdAt: "2024-08-30T10:00:00Z",
  currentStatus: {
    status: "COMPLETED",
    timestamps: {
      createdAt: "2024-08-30T10:00:00Z",
      lastUpdated: "2024-08-30T11:45:00Z",
    },
  },
  patternType: "parallel",
  executionPlan: {
    groups: [
      {
        groupId: 1,
        templateId: 301,
        templateName: "User Authentication Test",
        autonomousAgentCount: 100,
        repeatCount: 20,
        executionTime: 900,
      },
      {
        groupId: 2,
        templateId: 302,
        templateName: "Product Search Test",
        autonomousAgentCount: 150,
        repeatCount: 25,
        executionTime: 1200,
      },
      {
        groupId: 3,
        templateId: 303,
        templateName: "Shopping Cart Test",
        autonomousAgentCount: 80,
        repeatCount: 15,
        executionTime: 800,
      },
      {
        groupId: 4,
        templateId: 304,
        templateName: "Payment Process Test",
        autonomousAgentCount: 60,
        repeatCount: 10,
        executionTime: 1500,
      },
    ],
  },
};

export const mockSimulationsLite = [
  {
    simulationId: 1,
    simulationName: "순차 실행 반복 시뮬레이션 테스트",
  },
  {
    simulationId: 2,
    simulationName: "병렬 실행 로봇 군집 테스트",
  },
  {
    simulationId: 3,
    simulationName: "자율주행 알고리즘 검증",
  },
  {
    simulationId: 4,
    simulationName: "센서 융합 테스트",
  },
  {
    simulationId: 5,
    simulationName: "드론 군집 비행 시뮬레이션",
  },
];

export const mockSimulationSummaryData: GetSimulationSummaryResult = {
  simulationId: 12345,
  simulationName: "대규모 트래픽 시뮬레이션 v2.1",
  status: "RUNNING",
  patternType: "parallel",
  totalExecutionTime: 3600, // 1시간 (초 단위)
  autonomousAgentCount: 1500,
  resourceUsage: {
    cpu: { usagePercent: 85.6, status: "normal" },
    memory: { usagePercent: 64.2, status: "normal" }, // 12.8GB를 %로 환산
    disk: { usagePercent: 51.3, status: "normal" }, // 256.4GB를 %로 환산
  },
  podStatus: {
    totalCount: 24,
    overallHealthPercent: 83.3, // (18+2)/24*100 기준으로 계산
    statusBreakdown: {
      RUNNING: { count: 15, percentage: 62.5 },
      STOPPED: { count: 15, percentage: 62.5 },
      SUCCESS: { count: 3, percentage: 12.5 },
      PENDING: { count: 4, percentage: 16.7 },
      FAILED: { count: 2, percentage: 8.3 },
    },
  },
};

// 1. INITIATING (생성 중) - 순차
export const mockInitiatingSequential: GetSimulationSummaryResult = {
  simulationId: 1,
  simulationName: "순차 시뮬레이션 예시",
  status: "INITIATING",
  patternType: "sequential",
  totalExecutionTime: 0,
  autonomousAgentCount: 0,
  resourceUsage: {
    cpu: { usagePercent: 0, status: "normal" },
    memory: { usagePercent: 0, status: "normal" },
    disk: { usagePercent: 0, status: "normal" },
  },
  podStatus: {
    totalCount: 0,
    overallHealthPercent: 0,
    statusBreakdown: {},
  },
};

// 1. INITIATING (생성 중) - 병렬
export const mockInitiatingParallel: GetSimulationSummaryResult = {
  simulationId: 2,
  simulationName: "병렬 시뮬레이션 예시",
  status: "INITIATING",
  patternType: "parallel",
  totalExecutionTime: 0,
  autonomousAgentCount: 0,
  resourceUsage: {
    cpu: { usagePercent: 0, status: "normal" },
    memory: { usagePercent: 0, status: "normal" },
    disk: { usagePercent: 0, status: "normal" },
  },
  podStatus: {
    totalCount: 0,
    overallHealthPercent: 0,
    statusBreakdown: {},
  },
};

// 2. PENDING (대기 중) - 순차
export const mockPendingSequential: GetSimulationSummaryResult = {
  simulationId: 3,
  simulationName: "순차 대기 시뮬레이션",
  status: "PENDING",
  patternType: "sequential",
  totalExecutionTime: 200,
  autonomousAgentCount: 2,
  resourceUsage: {
    cpu: { usagePercent: 10, status: "normal" },
    memory: { usagePercent: 15, status: "normal" },
    disk: { usagePercent: 5, status: "normal" },
  },
  podStatus: {
    totalCount: 2,
    overallHealthPercent: 0,
    statusBreakdown: {
      PENDING: { count: 2, percentage: 100 },
      SUCCESS: { count: 0, percentage: 0 },
      FAILED: { count: 0, percentage: 0 },
      STOPPED: { count: 0, percentage: 0 },
      RUNNING: { count: 0, percentage: 0 },
    },
  },
};

// 2. PENDING (대기 중) - 병렬
export const mockPendingParallel: GetSimulationSummaryResult = {
  simulationId: 4,
  simulationName: "병렬 대기 시뮬레이션",
  status: "PENDING",
  patternType: "parallel",
  totalExecutionTime: 300,
  autonomousAgentCount: 6,
  resourceUsage: {
    cpu: { usagePercent: 20, status: "normal" },
    memory: { usagePercent: 10, status: "normal" },
    disk: { usagePercent: 5, status: "normal" },
  },
  podStatus: {
    totalCount: 6,
    overallHealthPercent: 0,
    statusBreakdown: {
      PENDING: { count: 6, percentage: 100 },
      SUCCESS: { count: 0, percentage: 0 },
      FAILED: { count: 0, percentage: 0 },
      STOPPED: { count: 0, percentage: 0 },
      RUNNING: { count: 0, percentage: 0 },
    },
  },
};

// 3. RUNNING (실행 중) - 순차
export const mockRunningSequential: GetSimulationSummaryResult = {
  simulationId: 5,
  simulationName: "순차 실행 중 시뮬레이션",
  status: "RUNNING",
  patternType: "sequential",
  totalExecutionTime: 200,
  autonomousAgentCount: 2,
  resourceUsage: {
    cpu: { usagePercent: 50, status: "normal" },
    memory: { usagePercent: 30, status: "normal" },
    disk: { usagePercent: 40, status: "normal" },
  },
  podStatus: {
    totalCount: 2,
    overallHealthPercent: 50,
    statusBreakdown: {
      SUCCESS: { count: 1, percentage: 50 },
      RUNNING: { count: 1, percentage: 50 },
      FAILED: { count: 0, percentage: 0 },
      PENDING: { count: 0, percentage: 0 },
      STOPPED: { count: 0, percentage: 0 },
    },
  },
};

// 3. RUNNING (실행 중) - 병렬
export const mockRunningParallel: GetSimulationSummaryResult = {
  simulationId: 6,
  simulationName: "병렬 실행 중 시뮬레이션",
  status: "RUNNING",
  patternType: "parallel",
  totalExecutionTime: 300,
  autonomousAgentCount: 6,
  resourceUsage: {
    cpu: { usagePercent: 70, status: "warning" },
    memory: { usagePercent: 40, status: "normal" },
    disk: { usagePercent: 20, status: "normal" },
  },
  podStatus: {
    totalCount: 6,
    overallHealthPercent: 66.67,
    statusBreakdown: {
      SUCCESS: { count: 4, percentage: 66.67 },
      RUNNING: { count: 2, percentage: 33.33 },
      FAILED: { count: 0, percentage: 0 },
      STOPPED: { count: 0, percentage: 0 },
      PENDING: { count: 0, percentage: 0 },
    },
  },
};

// 4. COMPLETED (완료) - 순차
export const mockCompletedSequential: GetSimulationSummaryResult = {
  simulationId: 7,
  simulationName: "순차 완료 시뮬레이션",
  status: "COMPLETED",
  patternType: "sequential",
  totalExecutionTime: 200,
  autonomousAgentCount: 2,
  resourceUsage: {
    cpu: { usagePercent: 50, status: "normal" },
    memory: { usagePercent: 30, status: "normal" },
    disk: { usagePercent: 40, status: "normal" },
  },
  podStatus: {
    totalCount: 2,
    overallHealthPercent: 100,
    statusBreakdown: {
      SUCCESS: { count: 2, percentage: 100 },
      RUNNING: { count: 0, percentage: 0 },
      FAILED: { count: 0, percentage: 0 },
      STOPPED: { count: 0, percentage: 0 },
      PENDING: { count: 0, percentage: 0 },
    },
  },
};

// 4. COMPLETED (완료) - 병렬
export const mockCompletedParallel: GetSimulationSummaryResult = {
  simulationId: 8,
  simulationName: "병렬 완료 시뮬레이션",
  status: "COMPLETED",
  patternType: "parallel",
  totalExecutionTime: 450,
  autonomousAgentCount: 8,
  resourceUsage: {
    cpu: { usagePercent: 30, status: "normal" },
    memory: { usagePercent: 25, status: "normal" },
    disk: { usagePercent: 35, status: "normal" },
  },
  podStatus: {
    totalCount: 8,
    overallHealthPercent: 100,
    statusBreakdown: {
      SUCCESS: { count: 8, percentage: 100 },
      RUNNING: { count: 0, percentage: 0 },
      FAILED: { count: 0, percentage: 0 },
      STOPPED: { count: 0, percentage: 0 },
      PENDING: { count: 0, percentage: 0 },
    },
  },
};

// 5. FAILED (오류) - 병렬
export const mockFailedParallel: GetSimulationSummaryResult = {
  simulationId: 9,
  simulationName: "병렬 오류 시뮬레이션",
  status: "FAILED",
  patternType: "parallel",
  totalExecutionTime: 180,
  autonomousAgentCount: 6,
  resourceUsage: {
    cpu: { usagePercent: 90, status: "critical" },
    memory: { usagePercent: 80, status: "warning" },
    disk: { usagePercent: 70, status: "normal" },
  },
  podStatus: {
    totalCount: 6,
    overallHealthPercent: 50,
    statusBreakdown: {
      SUCCESS: { count: 3, percentage: 50 },
      STOPPED: { count: 1, percentage: 16.67 },
      FAILED: { count: 2, percentage: 33.33 },
      PENDING: { count: 0, percentage: 0 },
      RUNNING: { count: 0, percentage: 0 },
    },
  },
};

// 5. FAILED (오류) - 순차
export const mockFailedSequential: GetSimulationSummaryResult = {
  simulationId: 10,
  simulationName: "순차 오류 시뮬레이션",
  status: "FAILED",
  patternType: "sequential",
  totalExecutionTime: 120,
  autonomousAgentCount: 3,
  resourceUsage: {
    cpu: { usagePercent: 95, status: "critical" },
    memory: { usagePercent: 85, status: "critical" },
    disk: { usagePercent: 60, status: "warning" },
  },
  podStatus: {
    totalCount: 3,
    overallHealthPercent: 33.33,
    statusBreakdown: {
      SUCCESS: { count: 1, percentage: 33.33 },
      STOPPED: { count: 0, percentage: 0 },
      FAILED: { count: 2, percentage: 66.67 },
      PENDING: { count: 0, percentage: 0 },
      RUNNING: { count: 0, percentage: 0 },
    },
  },
};

export const mockSimulations: GetSimulationsResult = {
  overview: {
    total: 5,
    pending: 1,
    running: 2,
    completed: 1,
    failed: 1,
  },
  simulations: [
    {
      simulationId: 1,
      simulationName: "Traffic Flow Analysis",
      patternType: "sequential",
      status: "RUNNING",
      mecId: "mec-001",
      createdAt: "2024-08-15T09:00:00Z",
      updatedAt: "2024-08-15T11:20:15Z",
    },
    {
      simulationId: 2,
      simulationName: "Smart Grid Optimization",
      patternType: "parallel",
      status: "COMPLETED",
      mecId: "mec-002",
      createdAt: "2024-08-10T13:25:00Z",
      updatedAt: "2024-08-10T15:40:00Z",
    },
    {
      simulationId: 3,
      simulationName: "Autonomous Vehicle Test",
      patternType: "sequential",
      status: "FAILED",
      mecId: "mec-003",
      createdAt: "2024-08-12T08:00:00Z",
      updatedAt: "2024-08-12T09:10:00Z",
    },
    {
      simulationId: 4,
      simulationName: "Drone Delivery Pathfinding",
      patternType: "parallel",
      status: "PENDING",
      mecId: "mec-004",
      createdAt: "2024-08-16T10:00:00Z",
      updatedAt: "2024-08-16T10:00:00Z",
    },
    {
      simulationId: 5,
      simulationName: "Energy Consumption Forecast",
      patternType: "sequential",
      status: "RUNNING",
      mecId: "mec-005",
      createdAt: "2024-08-17T09:30:00Z",
      updatedAt: "2024-08-17T11:00:00Z",
    },
  ],
  pagination: {
    currentPage: 1,
    pageSize: 5,
    totalItems: 5,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
  },
};

// ------------ Status Mock Data ---------------

// 🔹 INITIATING 상태
export const mockSequentialInitiatingStatus: GetStatusResponseFinal = {
  simulationId: 1,
  patternType: "sequential",
  currentStatus: {
    status: "INITIATING",
    message: "시뮬레이션 초기화 중...",
    timestamps: {
      createdAt: "2025-09-01T10:00:00Z",
      lastUpdated: "2025-09-01T10:01:00Z",
    },
  },
};

export const mockParallelInitiatingStatus: GetStatusResponseFinal = {
  simulationId: 7,
  patternType: "parallel",
  currentStatus: {
    status: "INITIATING",
    message: "시뮬레이션 초기화 중...",
    timestamps: {
      createdAt: "2025-09-01T11:00:00Z",
      lastUpdated: "2025-09-01T11:01:00Z",
    },
  },
};

// 🔹 PENDING 상태
export const mockSequentialPendingStatus: GetStatusResponseFinal = {
  simulationId: 2,
  patternType: "sequential",
  currentStatus: {
    status: "PENDING",
    message: "대기 중...",
    timestamps: {
      createdAt: "2025-09-01T10:00:00Z",
      lastUpdated: "2025-09-01T10:02:00Z",
    },
    progress: {
      overallProgress: 0,
      totalSteps: 3,
      completedSteps: 0,
      currentStep: 0,
    },
    stepDetails: [
      { stepOrder: 1, status: "PENDING", progress: 0, autonomousAgents: 2, currentRepeat: 0, totalRepeats: 1 },
      { stepOrder: 2, status: "PENDING", progress: 0, autonomousAgents: 2, currentRepeat: 0, totalRepeats: 1 },
      { stepOrder: 3, status: "PENDING", progress: 0, autonomousAgents: 2, currentRepeat: 0, totalRepeats: 1 },
    ],
  },
};

export const mockParallelPendingStatus: GetStatusResponseFinal = {
  simulationId: 8,
  patternType: "parallel",
  currentStatus: {
    status: "PENDING",
    message: "대기 중...",
    timestamps: {
      createdAt: "2025-09-01T11:00:00Z",
      lastUpdated: "2025-09-01T11:02:00Z",
    },
    progress: {
      overallProgress: 0,
      totalGroups: 3,
      completedGroups: 0,
      runningGroups: 0,
    },
    groupDetails: [
      { groupId: 1, status: "PENDING", progress: 0, autonomousAgents: 3, currentRepeat: 0, totalRepeats: 1 },
      { groupId: 2, status: "PENDING", progress: 0, autonomousAgents: 2, currentRepeat: 0, totalRepeats: 1 },
      { groupId: 3, status: "PENDING", progress: 0, autonomousAgents: 1, currentRepeat: 0, totalRepeats: 1 },
    ],
  },
};

// 🔹 RUNNING 상태
export const mockSequentialRunningStatus: GetStatusResponseFinal = {
  simulationId: 3,
  patternType: "sequential",
  currentStatus: {
    status: "RUNNING",
    message: "단계 실행 중...",
    timestamps: {
      createdAt: "2025-09-01T10:00:00Z",
      lastUpdated: "2025-09-01T10:05:00Z",
      startedAt: "2025-09-01T10:02:00Z",
    },
    progress: {
      overallProgress: 50,
      currentStep: 2,
      totalSteps: 4,
      completedSteps: 1,
    },
    stepDetails: [
      {
        stepOrder: 1,
        status: "COMPLETED",
        progress: 100,
        startedAt: "2025-09-01T10:02:00Z",
        completedAt: "2025-09-01T10:03:00Z",
        autonomousAgents: 2,
        currentRepeat: 1,
        totalRepeats: 1,
      },
      {
        stepOrder: 2,
        status: "RUNNING",
        progress: 50,
        startedAt: "2025-09-01T10:03:30Z",
        autonomousAgents: 3,
        currentRepeat: 1,
        totalRepeats: 2,
      },
      { stepOrder: 3, status: "PENDING", progress: 0, autonomousAgents: 4, currentRepeat: 0, totalRepeats: 1 },
      { stepOrder: 4, status: "PENDING", progress: 0, autonomousAgents: 5, currentRepeat: 0, totalRepeats: 1 },
    ],
  },
};

export const mockParallelRunningStatus: GetStatusResponseFinal = {
  simulationId: 9,
  patternType: "parallel",
  currentStatus: {
    status: "RUNNING",
    message: "병렬 그룹 실행 중...",
    timestamps: {
      createdAt: "2025-09-01T11:00:00Z",
      lastUpdated: "2025-09-01T11:05:00Z",
      startedAt: "2025-09-01T11:02:00Z",
    },
    progress: {
      overallProgress: 60,
      runningGroups: 2,
      totalGroups: 3,
      completedGroups: 1,
    },
    groupDetails: [
      {
        groupId: 1,
        status: "COMPLETED",
        progress: 100,
        startedAt: "2025-09-01T11:02:00Z",
        completedAt: "2025-09-01T11:03:00Z",
        autonomousAgents: 2,
        currentRepeat: 1,
        totalRepeats: 1,
      },
      {
        groupId: 2,
        status: "RUNNING",
        progress: 40,
        startedAt: "2025-09-01T11:03:30Z",
        autonomousAgents: 4,
        currentRepeat: 1,
        totalRepeats: 3,
      },
      { groupId: 3, status: "PENDING", progress: 0, autonomousAgents: 3, currentRepeat: 0, totalRepeats: 2 },
    ],
  },
};

// 🔹 COMPLETED 상태
export const mockSequentialCompletedStatus: GetStatusResponseFinal = {
  simulationId: 4,
  patternType: "sequential",
  currentStatus: {
    status: "COMPLETED",
    message: "모든 단계 완료",
    timestamps: {
      createdAt: "2025-09-01T10:00:00Z",
      lastUpdated: "2025-09-01T10:20:00Z",
      startedAt: "2025-09-01T10:02:00Z",
      completedAt: "2025-09-01T10:20:00Z",
    },
    progress: {
      overallProgress: 100,
      totalSteps: 3,
      completedSteps: 3,
    },
    stepDetails: [
      {
        stepOrder: 1,
        status: "COMPLETED",
        progress: 100,
        startedAt: "2025-09-01T10:02:00Z",
        completedAt: "2025-09-01T10:05:00Z",
        autonomousAgents: 2,
        currentRepeat: 1,
        totalRepeats: 1,
      },
      {
        stepOrder: 2,
        status: "COMPLETED",
        progress: 100,
        startedAt: "2025-09-01T10:05:30Z",
        completedAt: "2025-09-01T10:10:00Z",
        autonomousAgents: 3,
        currentRepeat: 2,
        totalRepeats: 2,
      },
      {
        stepOrder: 3,
        status: "COMPLETED",
        progress: 100,
        startedAt: "2025-09-01T10:11:00Z",
        completedAt: "2025-09-01T10:20:00Z",
        autonomousAgents: 4,
        currentRepeat: 1,
        totalRepeats: 1,
      },
    ],
  },
};

export const mockParallelCompletedStatus: GetStatusResponseFinal = {
  simulationId: 10,
  patternType: "parallel",
  currentStatus: {
    status: "COMPLETED",
    message: "모든 그룹 완료",
    timestamps: {
      createdAt: "2025-09-01T11:00:00Z",
      lastUpdated: "2025-09-01T11:20:00Z",
      startedAt: "2025-09-01T11:02:00Z",
      completedAt: "2025-09-01T11:20:00Z",
    },
    progress: {
      overallProgress: 100,
      totalGroups: 3,
      completedGroups: 3,
    },
    groupDetails: [
      {
        groupId: 1,
        status: "COMPLETED",
        progress: 100,
        startedAt: "2025-09-01T11:02:00Z",
        completedAt: "2025-09-01T11:05:00Z",
        autonomousAgents: 2,
        currentRepeat: 1,
        totalRepeats: 1,
      },
      {
        groupId: 2,
        status: "COMPLETED",
        progress: 100,
        startedAt: "2025-09-01T11:06:00Z",
        completedAt: "2025-09-01T11:10:00Z",
        autonomousAgents: 5,
        currentRepeat: 3,
        totalRepeats: 3,
      },
      {
        groupId: 3,
        status: "COMPLETED",
        progress: 100,
        startedAt: "2025-09-01T11:11:00Z",
        completedAt: "2025-09-01T11:20:00Z",
        autonomousAgents: 3,
        currentRepeat: 2,
        totalRepeats: 2,
      },
    ],
  },
};

// 🔹 FAILED 상태
export const mockSequentialFailedStatus: GetStatusResponseFinal = {
  simulationId: 5,
  patternType: "sequential",
  currentStatus: {
    status: "FAILED",
    message: "2단계에서 오류 발생",
    timestamps: {
      createdAt: "2025-09-01T10:00:00Z",
      lastUpdated: "2025-09-01T10:07:00Z",
      startedAt: "2025-09-01T10:02:00Z",
      failedAt: "2025-09-01T10:07:00Z",
    },
    progress: {
      overallProgress: 30,
      currentStep: 2,
      totalSteps: 4,
      completedSteps: 1,
    },
    stepDetails: [
      {
        stepOrder: 1,
        status: "COMPLETED",
        progress: 100,
        startedAt: "2025-09-01T10:02:00Z",
        completedAt: "2025-09-01T10:03:30Z",
        autonomousAgents: 2,
        currentRepeat: 1,
        totalRepeats: 1,
      },
      {
        stepOrder: 2,
        status: "FAILED",
        progress: 20,
        failedAt: "2025-09-01T10:07:00Z",
        autonomousAgents: 3,
        currentRepeat: 1,
        totalRepeats: 2,
        error: "네트워크 연결 실패",
        startedAt: "2025-09-01T10:03:30Z",
      },
      { stepOrder: 3, status: "PENDING", progress: 0, autonomousAgents: 4, currentRepeat: 0, totalRepeats: 1 },
      { stepOrder: 4, status: "PENDING", progress: 0, autonomousAgents: 5, currentRepeat: 0, totalRepeats: 1 },
    ],
  },
};

export const mockParallelFailedStatus: GetStatusResponseFinal = {
  simulationId: 11,
  patternType: "parallel",
  currentStatus: {
    status: "FAILED",
    message: "2번 그룹에서 오류 발생",
    timestamps: {
      createdAt: "2025-09-01T11:00:00Z",
      lastUpdated: "2025-09-01T11:07:00Z",
      startedAt: "2025-09-01T11:02:00Z",
      failedAt: "2025-09-01T11:07:00Z",
    },
    progress: {
      overallProgress: 40,
      runningGroups: 2,
      totalGroups: 3,
      completedGroups: 1,
    },
    groupDetails: [
      {
        groupId: 1,
        status: "COMPLETED",
        progress: 100,
        startedAt: "2025-09-01T11:02:00Z",
        completedAt: "2025-09-01T11:03:30Z",
        autonomousAgents: 1,
        currentRepeat: 1,
        totalRepeats: 1,
      },
      {
        groupId: 2,
        status: "FAILED",
        progress: 30,
        failedAt: "2025-09-01T11:07:00Z",
        autonomousAgents: 4,
        currentRepeat: 1,
        totalRepeats: 3,
        error: "메모리 부족 오류",
        startedAt: "2025-09-01T11:03:30Z",
      },
      { groupId: 3, status: "PENDING", progress: 0, autonomousAgents: 3, currentRepeat: 0, totalRepeats: 2 },
    ],
  },
};

// 🔹 STOPPED 상태
export const mockSequentialStoppedStatus: GetStatusResponseFinal = {
  simulationId: 6,
  patternType: "sequential",
  currentStatus: {
    status: "STOPPED",
    message: "사용자에 의해 중지됨",
    timestamps: {
      createdAt: "2025-09-01T10:00:00Z",
      lastUpdated: "2025-09-01T10:08:00Z",
      startedAt: "2025-09-01T10:02:00Z",
      stoppedAt: "2025-09-01T10:08:00Z",
    },
    progress: {
      overallProgress: 40,
      currentStep: 2,
      totalSteps: 4,
      completedSteps: 1,
    },
    stepDetails: [
      {
        stepOrder: 1,
        status: "COMPLETED",
        progress: 100,
        startedAt: "2025-09-01T10:02:00Z",
        completedAt: "2025-09-01T10:03:00Z",
        autonomousAgents: 1,
        currentRepeat: 1,
        totalRepeats: 1,
      },
      {
        stepOrder: 2,
        status: "STOPPED",
        progress: 40,
        stoppedAt: "2025-09-01T10:08:00Z",
        autonomousAgents: 3,
        currentRepeat: 1,
        totalRepeats: 2,
        startedAt: "2025-09-01T10:03:30Z",
      },
      { stepOrder: 3, status: "PENDING", progress: 0, autonomousAgents: 4, currentRepeat: 0, totalRepeats: 1 },
      { stepOrder: 4, status: "PENDING", progress: 0, autonomousAgents: 5, currentRepeat: 0, totalRepeats: 1 },
    ],
  },
};

export const mockParallelStoppedStatus: GetStatusResponseFinal = {
  simulationId: 12,
  patternType: "parallel",
  currentStatus: {
    status: "STOPPED",
    message: "사용자에 의해 중지됨",
    timestamps: {
      createdAt: "2025-09-01T11:00:00Z",
      lastUpdated: "2025-09-01T11:08:00Z",
      startedAt: "2025-09-01T11:02:00Z",
      stoppedAt: "2025-09-01T11:08:00Z",
    },
    progress: {
      overallProgress: 50,
      runningGroups: 2,
      totalGroups: 3,
      completedGroups: 1,
    },
    groupDetails: [
      {
        groupId: 1,
        status: "COMPLETED",
        progress: 100,
        startedAt: "2025-09-01T11:02:00Z",
        completedAt: "2025-09-01T11:03:00Z",
        autonomousAgents: 2,
        currentRepeat: 1,
        totalRepeats: 1,
      },
      {
        groupId: 2,
        status: "STOPPED",
        progress: 40,
        stoppedAt: "2025-09-01T11:08:00Z",
        autonomousAgents: 4,
        currentRepeat: 1,
        totalRepeats: 3,
        startedAt: "2025-09-01T11:03:30Z",
      },
      { groupId: 3, status: "PENDING", progress: 0, autonomousAgents: 3, currentRepeat: 0, totalRepeats: 2 },
    ],
  },
};

export const mockStatusData = {
  initiating: { sequential: mockSequentialInitiatingStatus, parallel: mockParallelInitiatingStatus },
  pending: { sequential: mockSequentialPendingStatus, parallel: mockParallelPendingStatus },
  running: { sequential: mockSequentialRunningStatus, parallel: mockParallelRunningStatus },
  completed: { sequential: mockSequentialCompletedStatus, parallel: mockParallelCompletedStatus },
  failed: { sequential: mockSequentialFailedStatus, parallel: mockParallelFailedStatus },
  stopped: { sequential: mockSequentialStoppedStatus, parallel: mockParallelStoppedStatus },
};
