import {
  BaseInstance,
  BasePostInstance,
  InstanceIdField,
  PodNameField,
  RunningStatusField,
  StatusField,
} from "@/type/_field";

export type InstanceListResponse = BaseInstance[];

export interface InstanceDetailResponse extends PodNameField {
  instanceNamespace: string;
  instanceStatus: string;
  instanceImage: string;
  instanceAge: string;
  instanceLabel: string;
  templateType: string;
  topics: string;
}

export type InstancePostResponse = BasePostInstance[];

export interface InstanceDeleteResponse extends InstanceIdField {}

export interface InstanceListActionPostResponse
  extends InstanceIdField,
    StatusField {}

export interface InstanceListStatusCheckPostResponseBase
  extends InstanceIdField,
    RunningStatusField {}

export type InstanceListStatusCheckPostResponse =
  InstanceListStatusCheckPostResponseBase[];
