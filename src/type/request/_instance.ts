import {
  InstanceCountField,
  InstanceDescriptionField,
  InstanceIdField,
  InstanceNameField,
  SimulationIdField,
  TemplateIdField,
} from "@/type/_field";

export type ActionType = "start" | "stop";

export interface InstancePostRequest
  extends InstanceNameField,
    InstanceDescriptionField,
    SimulationIdField,
    InstanceCountField,
    TemplateIdField {}

export interface InstanceActionPostRequest extends InstanceIdField {
  action: ActionType;
}
