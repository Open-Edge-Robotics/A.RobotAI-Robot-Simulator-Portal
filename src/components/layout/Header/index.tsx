import { Link } from "react-router-dom";

import { Button } from "innogrid-ui";

import IconButton from "@/components/common/IconButton.tsx";

import { ICONS } from "@/constants/icon";

import { useScreenSize } from "@/hooks/useScreenSize";

interface HeaderProps {
  onMenuToggle?: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const { isMobile } = useScreenSize();

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

      <Button color="secondary" title="로그아웃">
        로그아웃
      </Button>
    </header>
  );
}
