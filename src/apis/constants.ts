export const API_BASE_URL = {
  local: "http://localhost:8000/api",
  dev: "/api",
} as const;

export const ENDPOINTS = {
  simulation: "/simulation",
  template: "/template",
  mec: "/mec",
} as const;

export const API_DEFAULT_TIMEOUT = 30000;

export const QUERY_KEYS = {
  simulation: ["simulation"],
  template: ["template"],
  mec: ["mec"],
} as const;
