import {
  INSTANCE_OPTION_LIST,
  SIMULATION_OPTION_LIST,
} from "@/constants/_filterOption";
import { z } from "zod";

export const SCHEMA_NAME = {
  SEARCH_KEYWORD: "searchKeyword",
  INSTANCE: {
    NAME: INSTANCE_OPTION_LIST[0].value,
    ID: INSTANCE_OPTION_LIST[1].value,
    DESCRIPTION: INSTANCE_OPTION_LIST[2].value,
    COUNT: "instanceCount",
    POD_NAMESPACE: "podNamespace",
  },
  SIMULATION: {
    NAME: SIMULATION_OPTION_LIST[0].value,
    ID: SIMULATION_OPTION_LIST[1].value,
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
  POD_NAMESPACE: {
    MIN: 2,
    MAX: 30,
  },
  COUNT: {
    MIN: 1,
    MAX: 100,
  },
};

export const ERROR_MESSAGE = {
  SIMULATION: {
    NAME: {
      MIN: `최소 ${SIMULATION_LENGTH_LIMIT.NAME.MIN}자 이상이어야 합니다`,
      MAX: `최대 ${SIMULATION_LENGTH_LIMIT.NAME.MAX}자 입니다`,
    },
    DESCRIPTION: {
      MIN: `최소 ${SIMULATION_LENGTH_LIMIT.DESCRIPTION.MIN}자 이상이어야 합니다`,
      MAX: `최대 ${SIMULATION_LENGTH_LIMIT.DESCRIPTION.MAX}자 입니다`,
    },
  },
  INSTANCE: {
    NAME: {
      MIN: `최소 ${INSTANCE_LENGTH_LIMIT.NAME.MIN}자 이상이어야 합니다`,
      MAX: `최대 ${INSTANCE_LENGTH_LIMIT.NAME.MAX}자 입니다`,
    },
    DESCRIPTION: {
      MIN: `최소 ${INSTANCE_LENGTH_LIMIT.DESCRIPTION.MIN}자 이상이어야 합니다`,
      MAX: `최대 ${INSTANCE_LENGTH_LIMIT.DESCRIPTION.MAX}자 입니다`,
    },
    POD_NAMESPACE: {
      MIN: `최소 ${INSTANCE_LENGTH_LIMIT.POD_NAMESPACE.MIN}자 이상이어야 합니다`,
      MAX: `최대 ${INSTANCE_LENGTH_LIMIT.POD_NAMESPACE.MAX}자 입니다`,
    },
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
    .min(SIMULATION_LENGTH_LIMIT.NAME.MIN, {
      message: ERROR_MESSAGE.SIMULATION.NAME.MIN,
    })
    .max(SIMULATION_LENGTH_LIMIT.NAME.MAX, {
      message: ERROR_MESSAGE.SIMULATION.NAME.MAX,
    }),
  [SCHEMA_NAME.SIMULATION.DESCRIPTION]: z
    .string()
    .min(SIMULATION_LENGTH_LIMIT.DESCRIPTION.MIN, {
      message: ERROR_MESSAGE.SIMULATION.DESCRIPTION.MIN,
    })
    .max(SIMULATION_LENGTH_LIMIT.DESCRIPTION.MAX, {
      message: ERROR_MESSAGE.SIMULATION.DESCRIPTION.MAX,
    }),
});

export const createInstanceSchema = z.object({
  [SCHEMA_NAME.INSTANCE.NAME]: z
    .string()
    .min(INSTANCE_LENGTH_LIMIT.NAME.MIN, {
      message: ERROR_MESSAGE.INSTANCE.NAME.MIN,
    })
    .max(INSTANCE_LENGTH_LIMIT.NAME.MAX, {
      message: ERROR_MESSAGE.INSTANCE.NAME.MAX,
    }),
  [SCHEMA_NAME.INSTANCE.DESCRIPTION]: z
    .string()
    .min(INSTANCE_LENGTH_LIMIT.DESCRIPTION.MIN, {
      message: ERROR_MESSAGE.INSTANCE.DESCRIPTION.MIN,
    })
    .max(INSTANCE_LENGTH_LIMIT.DESCRIPTION.MAX, {
      message: ERROR_MESSAGE.INSTANCE.DESCRIPTION.MAX,
    }),
  [SCHEMA_NAME.INSTANCE.POD_NAMESPACE]: z
    .string()
    .min(INSTANCE_LENGTH_LIMIT.POD_NAMESPACE.MIN, {
      message: ERROR_MESSAGE.INSTANCE.POD_NAMESPACE.MIN,
    })
    .max(INSTANCE_LENGTH_LIMIT.DESCRIPTION.MAX, {
      message: ERROR_MESSAGE.INSTANCE.POD_NAMESPACE.MAX,
    }),
  [SCHEMA_NAME.INSTANCE.COUNT]: z
    .string()
    .min(INSTANCE_LENGTH_LIMIT.COUNT.MIN)
    .max(INSTANCE_LENGTH_LIMIT.COUNT.MAX),
});
