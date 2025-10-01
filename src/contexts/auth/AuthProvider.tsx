import { useEffect, useMemo, useState, type PropsWithChildren } from "react";

import { authAPI } from "@/apis/auth";

import type { User } from "@/types/auth/domain";

import { clearAuthData, getAccessToken, getStoredUser, saveAuthData } from "@/utils/auth/storage";

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
          // 토큰이 유효하지 않음
          clearAuthData();
        }
      } catch (error) {
        // 검증 실패 (만료, 유효하지 않음 등)
        console.error("Token verification failed:", error);
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
