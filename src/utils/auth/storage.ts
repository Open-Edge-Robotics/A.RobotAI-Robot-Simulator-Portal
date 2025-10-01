import type { User } from "@/types/auth/domain";

const ACCESS_TOKEN_KEY = "accessToken";
const USER_KEY = "user";

export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getStoredUser = (): User | null => {
  const userJson = localStorage.getItem(USER_KEY);
  if (!userJson) return null;

  try {
    return JSON.parse(userJson) as User;
  } catch {
    return null;
  }
};

export const getStoredAuthData = () => {
  return {
    accessToken: getAccessToken(),
    user: getStoredUser(),
  };
};

export const saveAuthData = (accessToken: string, user: User) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const updateAccessToken = (accessToken: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

export const clearAuthData = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
