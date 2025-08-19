import React from "react";
import { Link } from "react-router-dom";

import { Button } from "innogrid-ui";

import type { Simulation } from "@/apis/simulation/types";
import Badge from "@/components/common/Badge";
import Container from "@/components/common/Container.tsx";
import Icon from "@/components/common/Icon";
import { formatDateTime } from "@/utils/formatting";

import { PATTERN_CONFIG, STATUS_CONFIG } from "./constants";
import type { Status } from "./types";

interface SimulationActions {
  onStart: () => void;
  onPause: () => void;
  onDelete: () => void;
}

interface SimulationTableProps {
  simulations: Simulation[];
  actions: SimulationActions;
}

export default function SimulationTable({ simulations, actions }: SimulationTableProps) {
  return (
    <Container shadow overflowHidden>
      {simulations.length === 0 ? (
        <Fallback />
      ) : (
        <div>
          <TableHeader />
          <TableBody simulations={simulations} actions={actions} />
        </div>
      )}
    </Container>
  );
}

function TableHeader() {
  return (
    <div className="bg-gray-25 grid grid-cols-[1fr_152px_164px_224px_224px_152px_152px]">
      <TableHeaderCell>시뮬레이션 이름</TableHeaderCell>
      <TableHeaderCell>상태</TableHeaderCell>
      <TableHeaderCell>실행 패턴</TableHeaderCell>
      <TableHeaderCell>생성 일시</TableHeaderCell>
      <TableHeaderCell>최종 업데이트 일시</TableHeaderCell>
      <TableHeaderCell>MEC ID</TableHeaderCell>
      <TableHeaderCell>액션</TableHeaderCell>
    </div>
  );
}

function TableHeaderCell({ children }: { children: React.ReactNode }) {
  return <div className="px-4 py-4 text-left text-sm whitespace-nowrap text-gray-600">{children}</div>;
}

interface TableBodyProps {
  simulations: Simulation[];
  actions: SimulationActions;
}

function TableBody({ simulations, actions }: TableBodyProps) {
  return (
    <ul className="divide-y divide-gray-100">
      {simulations.map((simulation) => (
        <TableBodyRow simulation={simulation} actions={actions} key={simulation.simulationId} />
      ))}
    </ul>
  );
}

interface TableBodyRowProps {
  simulation: Simulation;
  actions: SimulationActions;
}

function TableBodyRow({ simulation, actions }: TableBodyRowProps) {
  return (
    <Link to={`${simulation.simulationId}`}>
      <li
        key={simulation.simulationId}
        className={`hover:bg-gray-10 grid grid-cols-[1fr_152px_164px_224px_224px_152px_152px]`}
      >
        <TableBodyCell>{simulation.simulationName}</TableBodyCell>
        <TableBodyCell>
          <StatusBadge status={simulation.status} />
        </TableBodyCell>
        <TableBodyCell>{PATTERN_CONFIG[simulation.patternType].title}</TableBodyCell>
        <TableBodyCell>{formatDateTime(simulation.createdAt)}</TableBodyCell>
        <TableBodyCell>{formatDateTime(simulation.updatedAt)}</TableBodyCell>
        <TableBodyCell>{simulation.mecId}</TableBodyCell>
        <TableBodyCell>
          <ActionButtons status={simulation.status} actions={actions} />
        </TableBodyCell>
      </li>
    </Link>
  );
}

interface TableBodyCellProps {
  children: React.ReactNode;
}

function TableBodyCell({ children }: TableBodyCellProps) {
  return <div className={`flex items-center px-4 py-4 text-sm text-gray-700`}>{children}</div>;
}

function StatusBadge({ status }: { status: Status }) {
  const config = STATUS_CONFIG[status];

  return (
    <div className="w-16">
      <Badge text={config.text} bgColor={config.bgColor} textColor={config.textColor} fontSize="text-xs" />
    </div>
  );
}

interface ActionButtonsProps {
  status: Status;
  actions: SimulationActions;
}

function ActionButtons({ status, actions }: ActionButtonsProps) {
  const pauseStyle = "hover:border-yellow-200 hover:bg-yellow-50 hover:text-yellow-500 active:text-red-700";
  const playStyle = "hover:border-green-200 hover:bg-green-50 hover:text-green-500 active:text-red-700";
  const deleteStyle = "hover:border-red-200 hover:bg-red-50 hover:text-red-500 active:text-red-700";

  return (
    <div className="flex items-center gap-3">
      {status === "RUNNING" ? (
        <ActionButton iconName="pause" onClick={actions.onPause} color={pauseStyle} />
      ) : (
        <ActionButton iconName="play_arrow" onClick={actions.onStart} color={playStyle} />
      )}
      <ActionButton iconName="delete" onClick={actions.onDelete} color={deleteStyle} />
    </div>
  );
}

interface ActionButtonProps {
  iconName: string;
  color: string;
  onClick: () => void;
}

function ActionButton({ iconName, color, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex h-8 w-8 items-center justify-center rounded-md border border-gray-100 text-gray-500 ${color}`}
    >
      <Icon name={iconName} className="cursor-pointer" size="22px" />
    </button>
  );
}

function Fallback() {
  return (
    <div className="px-6 py-12 text-center">
      <h3 className="mb-2 text-lg font-semibold">시뮬레이션이 없습니다</h3>
      <p className="mb-3 text-gray-600">새로운 시뮬레이션을 생성해보세요.</p>
      <Link to="/simulation/create">
        <Button color="primary" size="large">
          시뮬레이션 생성
        </Button>
      </Link>
    </div>
  );
}
