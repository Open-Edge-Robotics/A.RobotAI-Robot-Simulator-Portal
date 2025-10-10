import { ENDPOINTS } from "@/constants/api";

import type { LoginRequest, LoginResponse, SignupRequest, TokenVerificationResponse } from "@/types/auth/api";

import { apiClient } from ".";

const ENDPOINT = ENDPOINTS.auth;

export const authAPI = {
  signup: (data: SignupRequest) => apiClient.postApi<Pick<SignupRequest, "email" | "role">>(`${ENDPOINT}/signup`, data),

  login: (data: LoginRequest) => apiClient.postApi<LoginResponse>(`${ENDPOINT}/signin`, data),

  logout: () => apiClient.postApi<unknown>(`${ENDPOINT}/logout`),

  verifyToken: (accessToken: string) =>
    apiClient.postApi<TokenVerificationResponse>(`${ENDPOINT}/verify`, { accessToken }),

  renewAccessToken: () =>
    apiClient.postApi<{ accessToken: string }>(`${ENDPOINT}/refresh`, {}, { withCredentials: true }),
};
