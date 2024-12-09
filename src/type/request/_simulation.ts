import {
  ActionField,
  SimulationDescriptionField,
  SimulationIdField,
  SimulationNameField,
} from "@/type/_field";

export interface PostSimulationRequest
  extends SimulationNameField,
    SimulationDescriptionField {}

export interface PostSimulationActionRequest
  extends SimulationIdField,
    ActionField {}
