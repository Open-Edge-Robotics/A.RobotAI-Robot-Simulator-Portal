import {
  InstanceCountField,
  InstanceDescriptionField,
  InstanceNameField,
  SimulationIdField,
  TemplateIdField,
} from "@/type/_field";

export type ActionType = "start" | "stop";

export interface InstancePostRequest
  extends InstanceNameField,
    InstanceDescriptionField,
    SimulationIdField,
    TemplateIdField,
    InstanceCountField {}

export interface GetInstanceListRequest {
  simulationId?: number;
}

export interface InstanceListActionPostRequest {
  instanceIds: number[];
  action: ActionType;
}
