import {
  ActionField,
  InstanceCountField,
  InstanceDescriptionField,
  InstanceIdsField,
  InstanceNameField,
  SimulationIdField,
  TemplateIdField,
} from "@/type/_field";

export interface InstancePostRequest
  extends InstanceNameField,
    InstanceDescriptionField,
    SimulationIdField,
    TemplateIdField,
    InstanceCountField {}

export interface GetInstanceListRequest {
  simulationId?: number;
}

export interface InstanceListActionPostRequest
  extends InstanceIdsField,
    ActionField {}

export interface InstanceListStatusCheckPostRequest extends InstanceIdsField {}
