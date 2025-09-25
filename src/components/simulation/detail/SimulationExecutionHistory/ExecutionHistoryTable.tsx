import { Link } from "react-router-dom";

import StatusBadge from "@/components/common/Badge/StatusBadge";
import Container from "@/components/common/Container.tsx";
import ProgressBar from "@/components/common/ProgressBar";

import { SEGMENTS } from "@/constants/navigation";

import type { ExecutionRecord } from "@/types/simulation/domain";

import { formatDateTime } from "@/utils/common/formatting";

interface SimulationHistoryTableProps {
  history: ExecutionRecord[];
}

export default function ExecutionHistoryTable({ history }: SimulationHistoryTableProps) {
  return (
    <Container shadow className="overflow-hidden">
      <TableHeader />
      <TableBody simulations={history} />
    </Container>
  );
}

// 실행 ID | 상태 | 시작 일시 | 업데이트 일시 | 진행률
const TABLE_GRID_COLS =
  "grid-cols-[minmax(100px,140px)_minmax(140px,220px)_minmax(180px,260px)_minmax(180px,260px)_minmax(200px,260px)]";

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
  simulations: ExecutionRecord[];
}

function TableBody({ simulations }: TableBodyProps) {
  return (
    <ul className="divide-y divide-gray-100">
      {simulations.map((simulation) => (
        <TableBodyRow simulation={simulation} key={simulation.executionId} />
      ))}
    </ul>
  );
}

interface TableBodyRowProps {
  simulation: ExecutionRecord;
}

function TableBodyRow({ simulation }: TableBodyRowProps) {
  return (
    <Link to={`${SEGMENTS.absolute.simulation}/${simulation.simulationId}/result/${simulation.executionId}`}>
      <li key={simulation.executionId} className={`hover:bg-gray-10 grid ${TABLE_GRID_COLS}`}>
        <TableBodyCell>{simulation.executionId}</TableBodyCell>
        <TableBodyCell justifyCenter>
          <StatusBadge status={simulation.status} />
        </TableBodyCell>
        <TableBodyCell>{formatDateTime(simulation.startedAt)}</TableBodyCell>
        <TableBodyCell>{formatDateTime(simulation.updatedAt)}</TableBodyCell>
        <TableBodyCell>
          <div className="flex grow flex-col items-end gap-1.5">
            <ProgressBar
              progress={(simulation.completedSteps / simulation.totalSteps) * 100}
              color="bg-blue-500"
              className="w-full"
            />
            <span>
              {simulation.completedSteps}/{simulation.totalSteps}
            </span>
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
