import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { authAPI } from "@/apis/auth";

import { SEGMENTS } from "@/constants/navigation";

import type { SignupRequest } from "@/types/auth/api";

import { successToast } from "@/utils/common/toast";

export function useSignup() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (signupData: SignupRequest) => {
      return authAPI.signup(signupData);
    },
    onSuccess: () => {
      successToast("회원가입을 완료했습니다.");
      navigate(SEGMENTS.absolute.login);
    },
  });
}
