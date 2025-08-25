import type { PatternType, SimulationStatus } from "../../../types/simulation/domain";

import PodStatusOverview from "./PodStatusOverview";
import ResourceUsage from "./ResourceUsage";
import SimulationInformation from "./SimulationInformation";

interface SimulationDetailProps {
  simulation: SimulationDetailData;
}

export default function SimulationDetail({ simulation }: SimulationDetailProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <ResourceUsage resource={simulation.resource} />
      <SimulationInformation simulation={simulation} />
      <PodStatusOverview pods={simulation.pods} />
    </div>
  );
}

export interface SimulationDetailData {
  simulationId: number;
  simulationName: string;
  status: SimulationStatus;
  createdAt: string;
  updatedAt: string;
  patternType: PatternType;
  totalExecutionTime: number;
  autonomousAgentCount: number;
  resource: {
    cpu: number;
    memory: number;
    disk: number;
  };
  pods: {
    total: number;
    success: number;
    failed: number;
  };
}
