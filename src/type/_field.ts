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

export interface BaseInstance
  extends InstanceIdField,
    InstanceNameField,
    InstanceDescriptionField,
    InstanceCreatedAtField {}

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
