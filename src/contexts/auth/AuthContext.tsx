import { createContext } from "react";

import type { User } from "@/types/auth/domain";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (accessToken: string, user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
