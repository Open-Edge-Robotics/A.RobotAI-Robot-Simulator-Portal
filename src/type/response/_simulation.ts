import { BaseSimulation, SimulationIdField } from "@/type/_field";

// 추후 추가 예정
type SimulationStatusType = "RUNNING";

interface Simulation extends BaseSimulation {
  simulationStatus: SimulationStatusType;
}

export type SimulationListResponse = Simulation[];

export interface SimulationPostResponse extends BaseSimulation {}

export interface SimulationActionResponse extends SimulationIdField {
  result: string;
}
