export interface SignupFormData {
  email: string;
  password: string;
  passwordConfirm: string;
  role: UserRole;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export type UserRole = "admin" | "general";

export interface User {
  email: string;
  role: UserRole;
}
