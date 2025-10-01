import { useAuth } from "@/hooks/auth/useAuth";

interface LoginVisibleProps {
  fallback?: React.ReactNode;
  adminOnly?: boolean;
  children: React.ReactNode;
}

export default function LoginVisible({ fallback, children, adminOnly = false }: LoginVisibleProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return fallback;

  if (adminOnly && user?.role !== "admin") return fallback;

  return children;
}
