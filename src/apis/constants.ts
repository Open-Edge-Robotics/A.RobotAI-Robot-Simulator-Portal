export const API_BASE_URL = {
  LOCAL: "http://localhost:8000/api",
} as const;

export const ENDPOINTS = {
  SIMULATIONS: "/simulation",
  TEMPLATE: "/template",
  MECTL: "/mec",
} as const;

export const API_TIMEOUT = 30000;
