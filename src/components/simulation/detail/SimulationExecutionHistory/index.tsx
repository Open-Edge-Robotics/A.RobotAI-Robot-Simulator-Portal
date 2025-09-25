import Container from "@/components/common/Container.tsx";
import Title from "@/components/common/Title";

import type { ExecutionRecord } from "@/types/simulation/domain";

import ExecutionHistoryTable from "./ExecutionHistoryTable";

export default function SimulationExecutionHistory() {
  const history = historyMockData;

  return (
    <Container className="p-6">
      <Title title="시뮬레이션 실행 내역" fontSize="text-xl" margin="mb-4" />
      <ExecutionHistoryTable history={history} />
    </Container>
  );
}

const historyMockData: ExecutionRecord[] = [
  {
    executionId: 1001,
    status: "COMPLETED",
    startedAt: "2025-09-24T09:15:30.000Z",
    finishedAt: "2025-09-24T09:45:22.000Z",
    updatedAt: "2025-09-24T09:45:22.000Z",
    totalSteps: 10,
    completedSteps: 10,
    simulationId: 1,
  },
  {
    executionId: 1002,
    status: "RUNNING",
    startedAt: "2025-09-24T10:30:15.000Z",
    finishedAt: "",
    updatedAt: "2025-09-24T10:42:18.000Z",
    totalSteps: 8,
    completedSteps: 5,
    simulationId: 1,
  },
  {
    executionId: 1003,
    status: "FAILED",
    startedAt: "2025-09-24T08:20:45.000Z",
    finishedAt: "2025-09-24T08:35:12.000Z",
    updatedAt: "2025-09-24T08:35:12.000Z",
    totalSteps: 12,
    completedSteps: 7,
    simulationId: 1,
  },
  {
    executionId: 1004,
    status: "STOPPED",
    startedAt: "2025-09-24T07:45:00.000Z",
    finishedAt: "2025-09-24T08:10:33.000Z",
    updatedAt: "2025-09-24T08:10:33.000Z",
    totalSteps: 15,
    completedSteps: 9,
    simulationId: 1,
  },
  {
    executionId: 1005,
    status: "COMPLETED",
    startedAt: "2025-09-24T11:00:12.000Z",
    finishedAt: "2025-09-24T11:25:48.000Z",
    updatedAt: "2025-09-24T11:25:48.000Z",
    totalSteps: 6,
    completedSteps: 6,
    simulationId: 1,
  },
];
