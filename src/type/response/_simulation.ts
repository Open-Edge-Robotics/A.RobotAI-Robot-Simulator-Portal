type SimulationStatusType = "RUNNING";

interface Simulation {
  simulationId: string;
  simulationName: string;
  simulationDescription: string;
  simulationCreatedAt: string;
  simulationStatus: SimulationStatusType;
}

export type SimulationListResponse = Simulation[];

export interface SimulationPostResponse {
  simulationId: string;
  simulationName: string;
  simulationDescription: string;
}

export interface SimulationActionResponse {
  result: string;
  simulationId: string;
}
