import { useReducer } from "react";

import { useScreenSize } from "@/hooks/useScreenSize";

import Header from "./Header";
import { DesktopNavigationBar, MobileNavigationBar } from "./NavigationBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isMobile } = useScreenSize();
  const [isMobileNavOpen, toggleMobileNav] = useReducer((x) => !x, false);

  return isMobile ? (
    <>
      <div className="flex min-h-screen flex-col">
        <Header onMenuToggle={toggleMobileNav} />
        <main className="overflow-auto">{children}</main>
      </div>
      <MobileNavigationBar isOpen={isMobileNavOpen} onClose={toggleMobileNav} />
    </>
  ) : (
    <div className="grid min-h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      <DesktopNavigationBar />
      <Header />
      <main className="overflow-auto">{children}</main>
    </div>
  );
}
