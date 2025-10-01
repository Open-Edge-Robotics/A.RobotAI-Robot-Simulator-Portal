import type { SignupRequest } from "@/types/auth/api";
import type { SignupFormData } from "@/types/auth/domain";

export const signupFormToRequest = (data: SignupFormData): SignupRequest => {
  const request: SignupRequest = {
    email: data.email,
    password: data.password,
    password_confirm: data.passwordConfirm,
    role: data.role,
  };

  return request;
};
