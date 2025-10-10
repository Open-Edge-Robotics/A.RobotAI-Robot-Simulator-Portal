import { Link } from "react-router-dom";

import StatusBadge from "@/components/common/Badge/StatusBadge";
import Container from "@/components/common/Container.tsx";
import ProgressBar from "@/components/common/ProgressBar";

import { SEGMENTS } from "@/constants/navigation";
import { POLLING_REQUIRED_STATUSES, STATUS_CONFIGS } from "@/constants/simulation";

import { useSimulationExecutionRecord } from "@/hooks/simulation/detail/useSimulationExecutionRecord";

import type { SimulationExecutionRecord } from "@/types/simulation/domain";
import type {
  GetParallelRunningStatusResponse,
  GetSequentialRunningStatusResponse,
} from "@/types/simulation/statusResult";

import { formatDateTime } from "@/utils/common/formatting";

interface SimulationHistoryTableProps {
  history: SimulationExecutionRecord[];
}

export default function ExecutionHistoryTable({ history }: SimulationHistoryTableProps) {
  return (
    <Container shadow className="mb-2 overflow-hidden">
      <TableHeader />
      <TableBody history={history} />
    </Container>
  );
}

// 실행 ID | 상태 | 시작 일시 | 업데이트 일시 | 진행률
const TABLE_GRID_COLS =
  "grid-cols-[minmax(60px,100px)_minmax(140px,220px)_minmax(180px,260px)_minmax(180px,260px)_minmax(200px,260px)]";

function TableHeader() {
  return (
    <div className={`bg-gray-25 grid ${TABLE_GRID_COLS}`}>
      <TableHeaderCell>실행 ID</TableHeaderCell>
      <TableHeaderCell justifyCenter>상태</TableHeaderCell>
      <TableHeaderCell>시작 일시</TableHeaderCell>
      <TableHeaderCell>최종 업데이트 일시</TableHeaderCell>
      <TableHeaderCell>진행률</TableHeaderCell>
    </div>
  );
}

interface TableHeaderCellProps {
  justifyCenter?: boolean;
  children: React.ReactNode;
}

function TableHeaderCell({ justifyCenter, children }: TableHeaderCellProps) {
  return (
    <div
      className={`flex px-4 py-4 text-left text-sm whitespace-nowrap text-gray-600 ${justifyCenter && "justify-center"}`}
    >
      {children}
    </div>
  );
}

interface TableBodyProps {
  history: SimulationExecutionRecord[];
}

function TableBody({ history }: TableBodyProps) {
  return (
    <ul className="divide-y divide-gray-100">
      {history.map((record) => (
        <TableBodyRow record={record} key={record.executionId} />
      ))}
    </ul>
  );
}

interface TableBodyRowProps {
  record: SimulationExecutionRecord;
}

function TableBodyRow({ record }: TableBodyRowProps) {
  const { currentStatus, executionId, simulationId } = record;

  const isRunning = POLLING_REQUIRED_STATUSES.includes(currentStatus.status);
  const { data: liveStatus } = useSimulationExecutionRecord(simulationId, executionId, isRunning);

  const displayStatus =
    liveStatus && isRunning
      ? (liveStatus.data.execution.currentStatus as
          | GetSequentialRunningStatusResponse
          | GetParallelRunningStatusResponse)
      : currentStatus;

  return (
    <Link to={`${SEGMENTS.absolute.simulation}/${simulationId}/result/${executionId}`}>
      <li key={executionId} className={`hover:bg-gray-10 grid ${TABLE_GRID_COLS}`}>
        <TableBodyCell>{executionId}</TableBodyCell>
        <TableBodyCell justifyCenter>
          <StatusBadge status={currentStatus.status} />
        </TableBodyCell>
        <TableBodyCell>{formatDateTime(currentStatus.timestamps.startedAt)}</TableBodyCell>
        <TableBodyCell>{formatDateTime(currentStatus.timestamps.lastUpdated)}</TableBodyCell>
        <TableBodyCell>
          <div className="flex grow flex-col items-end gap-1.5">
            <ProgressBar
              progress={displayStatus.progress.overallProgress * 100}
              color={STATUS_CONFIGS[displayStatus.status].highlightColor}
              className="w-full"
            />
            <span>{displayStatus.progress.overallProgress * 100}%</span>
          </div>
        </TableBodyCell>
      </li>
    </Link>
  );
}

interface TableBodyCellProps {
  justifyCenter?: boolean;
  children: React.ReactNode;
}

function TableBodyCell({ justifyCenter = false, children }: TableBodyCellProps) {
  return (
    <div className={`flex items-center ${justifyCenter && "justify-center"} px-4 py-4 text-sm text-gray-700`}>
      {children}
    </div>
  );
}
