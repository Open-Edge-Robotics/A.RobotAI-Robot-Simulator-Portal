import { useLocation } from "react-router-dom";

import { NAV_ITEMS } from "../constants";
import LogoSection from "../LogoSection";
import NavItem from "../NavItem";
import UserInfoSection from "../UserInfoSection";

export default function DesktopNavigationBar() {
  const pathname = useLocation().pathname;

  return (
    <nav className="row-span-full flex h-full w-64 flex-col border-r border-gray-100 bg-white">
      <LogoSection />
      <UserInfoSection />

      {/* <!-- Navigation Menu --> */}
      <ul className="flex flex-col p-2">
        {NAV_ITEMS.map((item) => {
          const isSelected = pathname.split("/")[1] === item.href.slice(1);

          return (
            <NavItem
              title={item.title}
              iconName={item.icon}
              href={item.href}
              isSelected={isSelected}
              key={item.title}
            />
          );
        })}
      </ul>
    </nav>
  );
}
