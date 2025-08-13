import { useLocation } from "react-router-dom";

import { NAV_ITEMS } from "./constants";
import NavItem from "./NavItem";

export default function NavigationBar() {
  const pathname = useLocation().pathname;

  return (
    <nav className="row-span-full w-64">
      <div className="flex h-screen flex-col border-r border-gray-100 bg-white">
        {/* <!-- Logo Section --> */}
        <div className="flex h-24 items-center gap-2 border-b border-gray-100 p-6">
          <div className="h-10 w-10 bg-blue-800">로고</div>
          <div>
            <div className="text-xl font-bold text-gray-900">RoboSim</div>
            <div className="text-xs text-gray-500">K8s Dashboard</div>
          </div>
        </div>
        {/* <!-- User Info Section --> */}
        <div className="border-b border-gray-100 p-4">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-blue-800">프로필</div>
            <div>
              <div className="text-sm font-semibold text-gray-900">
                admin@robotics.ai
              </div>
              <div className="text-xs text-gray-500">관리자</div>
            </div>
          </div>
        </div>

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
      </div>
    </nav>
  );
}
