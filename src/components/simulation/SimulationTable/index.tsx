import Container from "@/components/common/Container.tsx";
import InformationFallback from "@/components/common/Fallback/InformationFallback";
import LinkButton from "@/components/common/LinkButton";
import type { Simulation } from "@/types/simulation/api";
import type { ActionHandler } from "@/types/simulation/domain";

import TableBody from "./SimulationTableBody";
import TableHeader from "./SimulationTableHeader";

interface SimulationTableProps {
  simulations: Simulation[];
  actionHandlers: ActionHandler[];
  isLoading: boolean;
}

export default function SimulationTable({ simulations, actionHandlers, isLoading }: SimulationTableProps) {
  return (
    <Container shadow overflowHidden>
      {simulations.length === 0 ? (
        <Fallback />
      ) : (
        <div>
          <TableHeader />
          <TableBody simulations={simulations} actionHandlers={actionHandlers} isLoading={isLoading} />
        </div>
      )}
    </Container>
  );
}

function Fallback() {
  return (
    <InformationFallback message="시뮬레이션이 없습니다" subMessage="새로운 시뮬레이션을 생성해보세요.">
      <LinkButton to="/simulation/create">시뮬레이션 생성</LinkButton>
    </InformationFallback>
  );
}
