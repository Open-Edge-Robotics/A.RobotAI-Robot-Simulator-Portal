import type { UserRole } from "./domain";

export interface SignupRequest {
  email: string;
  password: string;
  password_confirm: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  role: UserRole;
  email: string;
}

export interface TokenVerificationResponse {
  isValid: boolean;
  email: string;
  role: UserRole;
}
