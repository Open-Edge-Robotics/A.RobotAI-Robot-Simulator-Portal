import { useReducer } from "react";

import { useScreenSize } from "@/hooks/useScreenSize";

import Header from "./Header";
import { DesktopNavigationBar, MobileNavigationBar } from "./NavigationBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isMobile } = useScreenSize();
  const [isMobileNavOpen, toggleMobileNav] = useReducer((x) => !x, false);

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
      <main className="overflow-auto">{children}</main>
    </div>
  );
}
