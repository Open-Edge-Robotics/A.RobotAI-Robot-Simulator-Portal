import { useEffect, useMemo, useState, type PropsWithChildren } from "react";

import { authAPI } from "@/apis/auth";

import type { User } from "@/types/auth/domain";

import { clearAuthData, getAccessToken, getStoredUser, saveAuthData, updateAccessToken } from "@/utils/auth/storage";

import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // 초기 로드 시 localStorage에서 토큰 확인
  useEffect(() => {
    const verifyAuth = async () => {
      const accessToken = getAccessToken();
      const storedUser = getStoredUser();

      if (!accessToken || !storedUser) return;

      try {
        // 토큰 유효성 검증
        const response = await authAPI.verifyToken(accessToken);

        if (response.data.isValid) {
          setIsAuthenticated(true);
          setUser({
            email: storedUser.email,
            role: storedUser.role,
          });
        } else {
          // 토큰이 유효하지 않음 - Refresh Token으로 갱신 시도
          await refreshTokenAndVerify(storedUser);
        }
      } catch (error) {
        // 검증 실패 (만료, 유효하지 않음 등) - Refresh Token으로 갱신 시도
        console.error("Token verification failed:", error);
        await refreshTokenAndVerify(storedUser);
      }
    };

    const refreshTokenAndVerify = async (storedUser: User) => {
      try {
        // Refresh Token으로 새 Access Token 요청
        const response = await authAPI.renewAccessToken();
        const { accessToken: newAccessToken } = response.data;

        // 새 토큰 저장
        updateAccessToken(newAccessToken);

        // 새 토큰으로 재검증
        const verifyResponse = await authAPI.verifyToken(newAccessToken);

        if (verifyResponse.data.isValid) {
          setIsAuthenticated(true);
          setUser({
            email: storedUser.email,
            role: storedUser.role,
          });
        } else {
          // 새 토큰도 유효하지 않음
          clearAuthData();
        }
      } catch (refreshError) {
        // Refresh Token도 만료되었거나 갱신 실패
        console.error("Token refresh failed:", refreshError);
        clearAuthData();
      }
    };

    verifyAuth();
  }, []);

  const login = (accessToken: string, userData: User) => {
    saveAuthData(accessToken, userData);
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    clearAuthData();
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      login,
      logout,
    }),
    [isAuthenticated, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
