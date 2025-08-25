import { Link } from "react-router-dom";

import StatusBadge from "@/components/common/Badge/StatusBadge";
import { PATTERN_CONFIGS } from "@/constants/simulation";
import type { Simulation } from "@/types/simulation/api";
import type { SimulationActionHandler } from "@/types/simulation/domain";
import { formatDateTime } from "@/utils/formatting";

import ActionButtons from "./SimulationActionButtons";

interface TableBodyProps {
  simulations: Simulation[];
  actionHandlers: SimulationActionHandler[];
  isLoading: boolean;
}

export default function TableBody({ simulations, actionHandlers, isLoading }: TableBodyProps) {
  return (
    <ul className="divide-y divide-gray-100">
      {simulations.map((simulation) => (
        <TableBodyRow
          simulation={simulation}
          actionHandlers={actionHandlers}
          key={simulation.simulationId}
          isLoading={isLoading}
        />
      ))}
    </ul>
  );
}

interface TableBodyRowProps {
  simulation: Simulation;
  actionHandlers: SimulationActionHandler[];
  isLoading: boolean;
}

function TableBodyRow({ simulation, actionHandlers, isLoading }: TableBodyRowProps) {
  return (
    <Link to={`${simulation.simulationId}/edit`}>
      <li
        key={simulation.simulationId}
        className={`hover:bg-gray-10 grid grid-cols-[1fr_188px_148px_220px_220px_152px_164px]`}
      >
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
            status={simulation.status}
            simulationId={simulation.simulationId}
            actionHandlers={actionHandlers}
            isLoading={isLoading}
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
