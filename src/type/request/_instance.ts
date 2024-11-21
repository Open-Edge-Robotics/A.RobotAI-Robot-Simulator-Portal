export type ActionType = "start" | "stop";

export interface InstanceIdParam {
  instanceId: string;
}

export interface InstancePostRequest {
  instanceName: string;
  instanceDescription: string;
  simulationId: string;
  templateId: string;
  instanceCount: string;
}

export interface InstanceActionPostRequest {
  instanceId: string;
  action: ActionType;
}
