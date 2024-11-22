import {
  InstanceCountField,
  InstanceDescriptionField,
  InstanceNameField,
} from "@/type/_field";

export interface CreateInstanceFormType
  extends InstanceNameField,
    InstanceDescriptionField,
    InstanceCountField {}
