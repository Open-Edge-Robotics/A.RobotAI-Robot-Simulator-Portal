import InformationFallback from "@/components/common/Fallback/InformationFallback";
import LinkButton from "@/components/common/LinkButton";

import { useScreenSize } from "@/hooks/useScreenSize";

import type { Simulation } from "@/types/simulation/domain";

import SimulationCard from "../SimulationCard";
import SimulationTable from "../SimulationTable";

interface SimulationListProps {
  simulations: Simulation[];
}

export default function SimulationList({ simulations }: SimulationListProps) {
  const { screenSize } = useScreenSize();

  if (simulations.length === 0) {
    return <Fallback />;
  }

  return screenSize === "xl" ? (
    <SimulationTable simulations={simulations} />
  ) : (
    <div className="space-y-3">
      {simulations.map((simulation) => (
        <SimulationCard key={simulation.simulationId} simulation={simulation} />
      ))}
    </div>
  );
}

function Fallback() {
  return (
    <InformationFallback message="시뮬레이션이 없습니다" subMessage="새로운 시뮬레이션을 생성해보세요.">
      <LinkButton to="/simulation/create" title="시뮬레이션 생성">
        시뮬레이션 생성
      </LinkButton>
    </InformationFallback>
  );
}
