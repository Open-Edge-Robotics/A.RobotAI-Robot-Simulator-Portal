import {
  INSTANCE_OPTION_LIST,
  SIMULATION_OPTION_LIST,
} from "@/constants/_filterOption";
import { z } from "zod";

export const SCHEMA_NAME = {
  SEARCH_KEYWORD: "searchKeyword",
  INSTANCE: {
    ID: INSTANCE_OPTION_LIST[0].value,
    NAME: INSTANCE_OPTION_LIST[1].value,
    DESCRIPTION: INSTANCE_OPTION_LIST[2].value,
    COUNT: "instanceCount",
  },
  SIMULATION: {
    ID: SIMULATION_OPTION_LIST[0].value,
    NAME: SIMULATION_OPTION_LIST[1].value,
    DESCRIPTION: SIMULATION_OPTION_LIST[2].value,
  },
  TEMPLATE: {
    ID: "templateId",
    TYPE: "templateType",
    DESCRIPTION: "templateDescription",
  },
};

export const KEYWORD_LENGTH_LIMIT = {
  MIN: 1,
  MAX: 20,
};

export const SIMULATION_LENGTH_LIMIT = {
  NAME: {
    MIN: 2,
    MAX: 30,
  },
  DESCRIPTION: {
    MIN: 2,
    MAX: 100,
  },
};

export const INSTANCE_LENGTH_LIMIT = {
  NAME: {
    MIN: 2,
    MAX: 30,
  },
  DESCRIPTION: {
    MIN: 2,
    MAX: 100,
  },
  COUNT: {
    MIN: 1,
    MAX: 2,
  },
};

export const filterShema = z.object({
  [SCHEMA_NAME.SEARCH_KEYWORD]: z
    .string()
    .min(KEYWORD_LENGTH_LIMIT.MIN)
    .max(KEYWORD_LENGTH_LIMIT.MAX),
});

export const createSimulationShema = z.object({
  [SCHEMA_NAME.SIMULATION.NAME]: z
    .string()
    .min(SIMULATION_LENGTH_LIMIT.NAME.MIN)
    .max(SIMULATION_LENGTH_LIMIT.NAME.MAX),
  [SCHEMA_NAME.SIMULATION.DESCRIPTION]: z
    .string()
    .min(SIMULATION_LENGTH_LIMIT.DESCRIPTION.MIN)
    .max(SIMULATION_LENGTH_LIMIT.DESCRIPTION.MAX),
});

export const createInstanceSchema = z.object({
  [SCHEMA_NAME.INSTANCE.NAME]: z
    .string()
    .min(INSTANCE_LENGTH_LIMIT.NAME.MIN)
    .max(INSTANCE_LENGTH_LIMIT.NAME.MAX),
  [SCHEMA_NAME.INSTANCE.DESCRIPTION]: z
    .string()
    .min(INSTANCE_LENGTH_LIMIT.DESCRIPTION.MIN)
    .max(INSTANCE_LENGTH_LIMIT.DESCRIPTION.MAX),
  [SCHEMA_NAME.INSTANCE.COUNT]: z
    .string()
    .min(INSTANCE_LENGTH_LIMIT.COUNT.MIN)
    .max(INSTANCE_LENGTH_LIMIT.COUNT.MAX),
});
