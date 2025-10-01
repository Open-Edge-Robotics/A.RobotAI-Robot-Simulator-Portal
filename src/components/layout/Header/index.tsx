import { Link } from "react-router-dom";

import { Button } from "innogrid-ui";

import IconButton from "@/components/common/IconButton.tsx";
import LinkButton from "@/components/common/LinkButton";

import { ICONS } from "@/constants/icon";
import { SEGMENTS } from "@/constants/navigation";

import { useAuth } from "@/hooks/auth/useAuth";
import { useLogout } from "@/hooks/auth/useLogout";
import { useScreenSize } from "@/hooks/useScreenSize";

interface HeaderProps {
  onMenuToggle?: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const { isMobile } = useScreenSize();
  const { isAuthenticated } = useAuth();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  return (
    <header className="flex h-18 items-center justify-between border-b border-gray-100 bg-white px-4 py-5 lg:h-24 lg:px-6">
      <div className="flex items-center gap-3">
        {isMobile ? (
          // 모바일 버전
          <>
            <IconButton
              iconName={ICONS.menu}
              onClick={onMenuToggle}
              aria-label="메뉴 열기"
              title="메뉴 열기"
              className="rounded-md p-2 hover:bg-gray-50"
            />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-800 text-xs font-bold text-white">
                로고
              </div>
              <div className="text-lg font-bold">자율행동체 시뮬레이터</div>
            </div>
          </>
        ) : (
          // 데스크탑 버전
          <Link to="/">
            <h1 className="text-xl font-bold lg:text-2xl">자율행동체 시뮬레이터</h1>
            <h3 className="text-sm text-gray-600 lg:text-base">실시간 모니터링 대시보드</h3>
          </Link>
        )}
      </div>

      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <LogoutButton onClick={logout} disabled={isLoggingOut} />
        ) : (
          <>
            <LinkButton to={SEGMENTS.absolute.signup} title="회원가입" color="tertiary" size="medium">
              회원가입
            </LinkButton>
            <LinkButton to={SEGMENTS.absolute.login} title="로그인" color="secondary" size="medium">
              로그인
            </LinkButton>
          </>
        )}
      </div>
    </header>
  );
}

function LogoutButton({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  return (
    <Button color="secondary" onClick={onClick} disabled={disabled}>
      로그아웃
    </Button>
  );
}
