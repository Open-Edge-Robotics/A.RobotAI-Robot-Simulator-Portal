import { useReducer } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { SEGMENTS } from "@/constants/navigation";

import { useAuth } from "@/hooks/auth/useAuth";
import { useScreenSize } from "@/hooks/useScreenSize";

import Header from "./Header";
import { DesktopNavigationBar, MobileNavigationBar } from "./NavigationBar";
import AuthFallback from "../common/Fallback/AuthFallback";

// 인증이 필요 없는 페이지 목록
const PUBLIC_ROUTES = [SEGMENTS.absolute.login, SEGMENTS.absolute.signup];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isMobile } = useScreenSize();
  const [isMobileNavOpen, toggleMobileNav] = useReducer((x) => !x, false);

  const { isAuthenticated } = useAuth();

  const location = useLocation();
  const isPublicRoute = PUBLIC_ROUTES.some((route) => route === location.pathname);

  // 로그인한 상태에서 로그인/회원가입 페이지 접근 시 홈으로 리다이렉트
  if (isPublicRoute && isAuthenticated) {
    return <Navigate to={SEGMENTS.absolute.home} replace />;
  }

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr] lg:grid-cols-[auto_1fr]">
      {isMobile ? (
        <>
          <MobileNavigationBar isOpen={isMobileNavOpen} onClose={toggleMobileNav} />
          <Header onMenuToggle={toggleMobileNav} />
        </>
      ) : (
        <>
          <DesktopNavigationBar />
          <Header />
        </>
      )}
      <main className="overflow-auto">
        {!isPublicRoute && !isAuthenticated ? (
          // 인증이 필요한 페이지인데 로그인하지 않은 경우
          <AuthFallback />
        ) : (
          // children
          children
        )}
      </main>
    </div>
  );
}
