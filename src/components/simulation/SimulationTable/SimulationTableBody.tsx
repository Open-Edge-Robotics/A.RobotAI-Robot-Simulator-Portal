import { Link } from "react-router-dom";

import StatusBadge from "@/components/common/Badge/StatusBadge";

import { PATTERN_CONFIGS } from "@/constants/simulation";

import { useSimulationActions } from "@/hooks/simulation/detail/useSimulationActions";

import type { Simulation } from "@/types/simulation/domain";

import { formatDateTime } from "@/utils/common/formatting";
import { getAllowedActions } from "@/utils/simulation/data";

import { TABLE_GRID_COLS } from ".";
import ActionButtons from "../SimulationActionButtons";

interface TableBodyProps {
  simulations: Simulation[];
}

export default function TableBody({ simulations }: TableBodyProps) {
  return (
    <ul className="divide-y divide-gray-100">
      {simulations.map((simulation) => (
        <TableBodyRow simulation={simulation} key={simulation.simulationId} />
      ))}
    </ul>
  );
}

interface TableBodyRowProps {
  simulation: Simulation;
}

function TableBodyRow({ simulation }: TableBodyRowProps) {
  const { actionHandlers, loadingStates } = useSimulationActions();
  const allowedActions = getAllowedActions(simulation.status, "list");

  return (
    <Link to={`${simulation.simulationId}`}>
      <li key={simulation.simulationId} className={`hover:bg-gray-10 grid ${TABLE_GRID_COLS}`}>
        <TableBodyCell>{simulation.simulationName}</TableBodyCell>
        <TableBodyCell justifyCenter>
          <StatusBadge status={simulation.status} />
        </TableBodyCell>
        <TableBodyCell>{PATTERN_CONFIGS[simulation.patternType].title}</TableBodyCell>
        <TableBodyCell>{formatDateTime(simulation.createdAt)}</TableBodyCell>
        <TableBodyCell>{formatDateTime(simulation.updatedAt)}</TableBodyCell>
        <TableBodyCell>{simulation.mecId}</TableBodyCell>
        <TableBodyCell>
          <ActionButtons
            actions={allowedActions}
            simulationId={simulation.simulationId}
            actionHandlers={actionHandlers}
            loadingStates={loadingStates}
          />
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
