import {
  BaseInstance,
  BasePostInstance,
  InstanceIdField,
  PodNameField,
} from "@/type/_field";

export type InstanceListResponse = BaseInstance[];

export interface InstanceDetailResponse extends PodNameField {
  instanceNamespace: string;
  instancePortNumber: string;
  instanceAge: string;
  templateType: string;
  instanceVolume: string;
  instanceStatus: string;
  topics: string;
}

export type InstancePostResponse = BasePostInstance[];

export interface InstanceActionResponse extends InstanceIdField {
  result: string;
}
