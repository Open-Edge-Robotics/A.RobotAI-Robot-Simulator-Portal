import {
  InstanceCountField,
  InstanceDescriptionField,
  InstanceNameField,
  podNamespaceField,
} from "@/type/_field";

export interface CreateInstanceFormType
  extends InstanceNameField,
    InstanceDescriptionField,
    InstanceCountField,
    podNamespaceField {}
