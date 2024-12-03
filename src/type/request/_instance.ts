import {
  InstanceCountField,
  InstanceDescriptionField,
  InstanceIdField,
  InstanceNameField,
  podNamespaceField,
  SimulationIdField,
  TemplateIdField,
} from "@/type/_field";

export type ActionType = "start" | "stop";

export interface InstancePostRequest
  extends InstanceNameField,
    InstanceDescriptionField,
    SimulationIdField,
    TemplateIdField,
    InstanceCountField,
    podNamespaceField {}

export interface InstanceActionPostRequest extends InstanceIdField {
  action: ActionType;
}

export interface GetInstanceListRequest {
  simulationId?: number;
}
