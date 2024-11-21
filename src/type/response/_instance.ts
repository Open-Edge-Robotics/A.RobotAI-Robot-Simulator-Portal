interface Instance {
  instanceId: string;
  instanceName: string;
  instanceDescription: string;
  instanceCreatedAt: string;
}

export type InstanceListResponse = Instance[];

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

export interface InstancePostResponse {
  instanceName: string;
  instanceDescription: string;
  simulationId: string;
  templateId: string;
  instanceCount: string;
}

export interface InstanceActionResponse {
  result: string;
  instanceId: string;
}
