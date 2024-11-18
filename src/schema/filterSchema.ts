import { z } from "zod";

export const SCHEMA_NAME = {
  SEARCH_KEYWORD: "searchKeyword",
  NAME: "name",
  DESCRIPTION: "description",
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
