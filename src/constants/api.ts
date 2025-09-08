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
    list: (type: "lite" | "full", filters?: { status?: string; page?: number; limit?: number }) =>
      [...QUERY_KEYS.simulation.all, "list", type, { ...filters }] as const,

    // 2. Specific Simulation (by ID) - 통합된 함수
    byId: (id: number, type: "detail" | "summary" | "status") => [...QUERY_KEYS.simulation.all, id, type] as const,
  },
  template: {
    all: ["template"] as const,
  },
  mec: {
    all: ["mec"] as const,
  },
} as const;
