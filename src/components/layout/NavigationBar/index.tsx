import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function NavigationBar() {
  const pathname = useLocation().pathname;

  return (
    <nav className="row-span-full w-64 bg-amber-300">
      <div className="flex h-screen flex-col border-r border-neutral-200 bg-white">
        {/* <!-- Logo Section --> */}
        <div className="flex h-24 items-center gap-2 border-b border-neutral-200 p-6">
          <div className="h-10 w-10 bg-blue-600">로고</div>
          <div>
            <div className="text-xl font-bold text-gray-900">RoboSim</div>
            <div className="text-xs text-gray-500">K8s Dashboard</div>
          </div>
        </div>
        {/* <!-- User Info Section --> */}
        <div className="border-b border-neutral-200 p-4">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-blue-600">프로필</div>
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
            // const isSelected = pathname.includes(item.href.slice(1));
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

const NAV_ITEMS = [
  {
    title: "대시보드",
    icon: "home",
    href: "/",
  },
  {
    title: "시뮬레이션",
    icon: "play_arrow",
    href: "/simulation",
  },
  {
    title: "템플릿",
    icon: "content_copy",
    href: "/template",
  },
  {
    title: "MEC",
    icon: "dns",
    href: "/mec",
  },
];

interface NavItemProps {
  title: string;
  iconName: string;
  href: string;
  isSelected: boolean;
}

function NavItem({ title, iconName, href, isSelected }: NavItemProps) {
  const defaultStyle = "border border-white text-gray-600";
  const selectedStyle = "border border-red-400 bg-red-100 text-red-500";
  const currentStyle = isSelected ? selectedStyle : defaultStyle;

  return (
    <li className="rounded-lg">
      <Link
        to={href}
        className={`flex items-center rounded-lg px-4 py-3 text-sm font-semibold transition-colors duration-200 ${currentStyle}`}
      >
        <div className="mr-3 flex h-5 w-5 items-center justify-center">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {iconName}
          </span>
        </div>
        {title}
      </Link>
    </li>
  );
}
