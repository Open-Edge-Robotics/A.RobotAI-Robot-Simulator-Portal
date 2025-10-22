import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { authAPI } from "@/apis/auth";

import { SEGMENTS } from "@/constants/navigation";

import { errorToast, successToast } from "@/utils/common/toast";

import { useAuth } from "./useAuth";

export function useLogout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return useMutation({
    mutationFn: () => {
      return authAPI.logout();
    },
    onSuccess: () => {
      logout();
      successToast("로그아웃했습니다.");
      navigate(SEGMENTS.absolute.login);
    },
    onError: () => {
      logout();
      errorToast("에러가 발생했습니다. 다시 로그인해주세요.");
      navigate(SEGMENTS.absolute.login);
    },
  });
}
