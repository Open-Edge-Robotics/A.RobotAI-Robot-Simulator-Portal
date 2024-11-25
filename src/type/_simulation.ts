import { SimulationDescriptionField, SimulationNameField } from "@/type/_field";

export interface CreateSimulationFormType
  extends SimulationNameField,
    SimulationDescriptionField {}
