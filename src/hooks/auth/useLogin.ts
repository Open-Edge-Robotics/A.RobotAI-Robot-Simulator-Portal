import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { authAPI } from "@/apis/auth";

import { SEGMENTS } from "@/constants/navigation";

import type { LoginRequest } from "@/types/auth/api";

import { successToast } from "@/utils/common/toast";

import { useAuth } from "./useAuth";

export function useLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  return useMutation({
    mutationFn: (loginData: LoginRequest) => {
      return authAPI.login(loginData);
    },
    onSuccess: (response) => {
      const { accessToken, role, email } = response.data;

      login(accessToken, { role, email });
      successToast("로그인을 완료했습니다.");
      navigate(SEGMENTS.absolute.home);
    },
  });
}
