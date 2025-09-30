export const API_BASE_URL = {
  local: "http://localhost:8000/api",
  dev: "/api",
} as const;

export const ENDPOINTS = {
  dashboard: "/dashboard",
  simulation: "/simulation",
  template: "/template",
  mec: "/mec",
} as const;

export const API_DEFAULT_TIMEOUT = 30000;

export const QUERY_KEYS = {
  dashboard: {
    all: ["dashboard"] as const,
  },
  simulation: {
    all: ["simulation"] as const,

    // 1. Simulation List
    list: (type: "lite" | "full", searchParams?: URLSearchParams) =>
      [...QUERY_KEYS.simulation.all, "list", type, searchParams?.toString()].filter((x) => x !== undefined),

    // 2. Specific Simulation (by ID)
    bySimulationId: (
      id: number,
      type: "detail" | "summary" | "status" | "deletion" | "history",
      searchParams?: URLSearchParams,
    ) => [...QUERY_KEYS.simulation.all, id, type, searchParams?.toString()].filter((x) => x !== undefined),

    // 3. Specific Result of Simulation (by IDs)
    byExecutionId: (simulationId: number, executionId: number) => [
      ...QUERY_KEYS.simulation.all,
      simulationId,
      executionId,
    ],
  },
  template: {
    all: ["template"] as const,
    byId: (id: number) => [...QUERY_KEYS.template.all, id] as const,
  },
  mec: {
    all: ["mec"] as const,
  },
} as const;
