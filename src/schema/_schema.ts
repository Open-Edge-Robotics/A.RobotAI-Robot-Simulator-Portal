import { z } from "zod";

export const SCHEMA_NAME = {
  SEARCH_KEYWORD: "searchKeyword",
  NAME: "name",
  DESCRIPTION: "description",
  INSTANCE: {
    NAME: "instanceName",
    DESCRIPTION: "instanceDescription",
    COUNT: "instanceCount",
  },
  SIMULATION: {
    ID: "simulationId",
  },
  TEMPLATE: {
    ID: "templateId",
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
  [SCHEMA_NAME.NAME]: z
    .string()
    .min(SIMULATION_LENGTH_LIMIT.NAME.MIN)
    .max(SIMULATION_LENGTH_LIMIT.NAME.MAX),
  [SCHEMA_NAME.DESCRIPTION]: z
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
