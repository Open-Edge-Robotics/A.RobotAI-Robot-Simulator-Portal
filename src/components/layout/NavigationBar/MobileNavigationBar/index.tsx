import { useLocation } from "react-router-dom";

import Backdrop from "@/components/common/Backdrop";

import UserInfoSection from "@/components/layout/NavigationBar/UserInfoSection";

import { NAV_ITEMS } from "../constants";
import LogoSection from "../LogoSection";
import NavItem from "../NavItem";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNavigationBar({ isOpen, onClose }: MobileNavProps) {
  const pathname = useLocation().pathname;

  if (!isOpen) return null;

  return (
    <>
      <Backdrop onClick={onClose} />
      {/* Mobile Navigation Panel */}
      <nav className="fixed top-0 left-0 z-50 flex h-screen w-80 max-w-[80vw] flex-col bg-white">
        <LogoSection onClose={onClose} />
        <UserInfoSection />

        {/* Navigation Menu */}
        <ul className="flex flex-1 flex-col p-2">
          {NAV_ITEMS.map((item) => {
            const isSelected = pathname.split("/")[1] === item.href.slice(1);

            return (
              <NavItem
                title={item.title}
                iconName={item.icon}
                href={item.href}
                isSelected={isSelected}
                key={item.title}
                onClick={onClose}
              />
            );
          })}
        </ul>
      </nav>
    </>
  );
}
