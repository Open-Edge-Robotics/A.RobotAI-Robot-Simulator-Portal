import React from "react";
import { Link } from "react-router-dom";

import { Button } from "innogrid-ui";

import StatusBadge from "@/components/common/Badge/StatusBadge";
import Container from "@/components/common/Container.tsx";
import Icon from "@/components/common/Icon";
import type { Simulation } from "@/types/simulation/api";
import { formatDateTime } from "@/utils/formatting";

import { PATTERN_CONFIG } from "../../../constants/simulation";
import type { Status } from "../../../types/simulation/domain";

interface SimulationActions {
  onStart: (id: number) => void;
  onPause: (id: number) => void;
  onDelete: (id: number) => void;
}

interface SimulationTableProps {
  simulations: Simulation[];
  actions: SimulationActions;
  isLoading: boolean;
}

export default function SimulationTable({ simulations, actions, isLoading }: SimulationTableProps) {
  return (
    <Container shadow overflowHidden>
      {simulations.length === 0 ? (
        <Fallback />
      ) : (
        <div>
          <TableHeader />
          <TableBody simulations={simulations} actions={actions} isLoading={isLoading} />
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
  isLoading: boolean;
}

function TableBody({ simulations, actions, isLoading }: TableBodyProps) {
  return (
    <ul className="divide-y divide-gray-100">
      {simulations.map((simulation) => (
        <TableBodyRow simulation={simulation} actions={actions} key={simulation.simulationId} isLoading={isLoading} />
      ))}
    </ul>
  );
}

interface TableBodyRowProps {
  simulation: Simulation;
  actions: SimulationActions;
  isLoading: boolean;
}

function TableBodyRow({ simulation, actions, isLoading }: TableBodyRowProps) {
  return (
    // temp
    <Link to={`${simulation.simulationId}/edit`}>
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
          <ActionButtons
            status={simulation.status}
            onStart={() => actions.onStart(simulation.simulationId)}
            onPause={() => actions.onPause(simulation.simulationId)}
            onDelete={() => actions.onDelete(simulation.simulationId)}
            isLoading={isLoading}
          />
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

interface ActionButtonsProps {
  status: Status;
  onStart: () => void;
  onPause: () => void;
  onDelete: () => void;
  isLoading: boolean;
}

function ActionButtons({ status, onStart, onPause, onDelete, isLoading }: ActionButtonsProps) {
  const pauseStyle = "hover:border-yellow-200 hover:bg-yellow-50 hover:text-yellow-500 active:text-yellow-700";
  const playStyle = "hover:border-green-200 hover:bg-green-50 hover:text-green-500 active:text-green-700";
  const deleteStyle = "hover:border-red-200 hover:bg-red-50 hover:text-red-500 active:text-red-700";

  return (
    <div className="flex items-center gap-3">
      {status === "RUNNING" ? (
        <ActionButton iconName="pause" onClick={onPause} color={pauseStyle} disabled={isLoading} />
      ) : (
        <ActionButton iconName="play_arrow" onClick={onStart} color={playStyle} disabled={isLoading} />
      )}
      <ActionButton iconName="delete" onClick={onDelete} color={deleteStyle} disabled={isLoading} />
    </div>
  );
}

interface ActionButtonProps {
  iconName: string;
  color: string;
  onClick: () => void;
  disabled: boolean;
}

function ActionButton({ iconName, color, onClick, disabled }: ActionButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault(); // Link 이동 방지
        e.stopPropagation();
        onClick();
      }}
      disabled={disabled}
      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-gray-100 text-gray-500 ${
        disabled ? "opacity-50" : `${color}`
      }`}
    >
      <Icon name={iconName} size="22px" />
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
