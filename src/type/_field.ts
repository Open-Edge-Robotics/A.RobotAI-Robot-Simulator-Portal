// instance 필드
export interface InstanceIdField {
  instanceId: number;
}

export interface InstanceNameField {
  instanceName: string;
}
export interface InstanceDescriptionField {
  instanceDescription: string;
}

export interface InstanceCountField {
  instanceCount: number;
}

export interface InstanceCreatedAtField {
  instanceCreatedAt: string;
}

export interface PodNameField {
  podName: string;
}
export interface podNamespaceField {
  podNamespace: string;
}

export interface PodStatusField {
  podStatus: string;
}

export interface BaseInstance
  extends InstanceIdField,
    InstanceNameField,
    InstanceDescriptionField,
    InstanceCreatedAtField,
    PodNameField,
    podNamespaceField,
    PodStatusField {}

export interface BasePostInstance
  extends InstanceIdField,
    InstanceNameField,
    InstanceDescriptionField,
    PodNameField,
    SimulationIdField,
    TemplateIdField {}

// simulaiton 필드
export interface SimulationIdField {
  simulationId: number;
}

export interface SimulationNameField {
  simulationName: string;
}

export interface SimulationDescriptionField {
  simulationDescription: string;
}

export interface SimulationCreatedAtField {
  simulationCreatedAt: string;
}

export interface SimulationStatusField {
  simulationStatus: string;
}
export interface SimulationNamespaceField {
  simulationNamespace: string;
}

type ActionType = "start" | "stop";
export interface ActionField {
  action: ActionType;
}

export interface BaseSimulation
  extends SimulationIdField,
    SimulationNameField,
    SimulationDescriptionField,
    SimulationCreatedAtField {}

// template 필드
export interface TemplateIdField {
  templateId: number;
}
export interface TemplateTypeField {
  templateType: string;
}
export interface TemplateDescriptionField {
  templateDescription: string;
}

export interface TopicsField {
  topics: string;
}

export interface CreatedAtField {
  createdAt: string;
}
