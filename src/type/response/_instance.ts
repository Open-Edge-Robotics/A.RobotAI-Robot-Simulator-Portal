import {
  BaseInstance,
  InstanceCountField,
  InstanceDescriptionField,
  InstanceIdField,
  InstanceNameField,
  SimulationIdField,
  TemplateIdField,
} from "@/type/_field";

export type InstanceListResponse = BaseInstance[];

export interface InstanceDetailResponse {
  instanceNamespace: string;
  instancePortNumber: string;
  instanceAge: string;
  templateType: string;
  instanceVolume: string;
  instanceLog: string;
  instanceStatus: string;
  topics: string;
}

export interface InstancePostResponse
  extends InstanceNameField,
    InstanceDescriptionField,
    InstanceCountField,
    SimulationIdField,
    TemplateIdField {}

export interface InstanceActionResponse extends InstanceIdField {
  result: string;
}
