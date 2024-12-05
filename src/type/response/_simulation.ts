import {
  BaseSimulation,
  SimulationDescriptionField,
  SimulationIdField,
  SimulationNameField,
  SimulationNamespaceField,
  SimulationStatusField,
} from "@/type/_field";

// 타입 추후 추가 예정
// type SimulationStatusType = "RUNNING";

export interface SimulationType
  extends BaseSimulation,
    SimulationStatusField,
    SimulationNamespaceField {
  [key: string]: string | number;
}

export type SimulationListResponse = SimulationType[];

export interface SimulationPostResponse
  extends SimulationNameField,
    SimulationIdField,
    SimulationDescriptionField,
    SimulationNamespaceField {}

export interface SimulationActionResponse extends SimulationIdField {
  result: string;
}

export interface SimulaionDeleteResponse extends SimulationIdField {}
