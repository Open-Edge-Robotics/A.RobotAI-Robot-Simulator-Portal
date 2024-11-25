import { SimulationDescriptionField, SimulationNameField } from "@/type/_field";

export interface PostSimulationRequest
  extends SimulationNameField,
    SimulationDescriptionField {}
