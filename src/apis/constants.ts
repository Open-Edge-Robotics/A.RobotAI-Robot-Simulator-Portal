export const API_BASE_URL = {
  LOCAL: "http://localhost:8000/api",
  DEV: "/api",
} as const;

export const ENDPOINTS = {
  SIMULATION: "/simulation",
  TEMPLATE: "/template",
  MECTL: "/mec",
} as const;

export const API_DEFAULT_TIMEOUT = 30000;
