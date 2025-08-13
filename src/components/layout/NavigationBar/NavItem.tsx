import { Link } from "react-router-dom";

import Container from "@/components/common/Container.tsx";

interface NavItemProps {
  title: string;
  iconName: string;
  href: string;
  isSelected: boolean;
}

export default function NavItem({ title, iconName, href, isSelected }: NavItemProps) {
  return (
    <li>
      <Link to={href} className={`${isSelected ? "font-semibold text-gray-900" : "font-medium text-gray-600"}`}>
        <Container
          borderColor={isSelected ? "border-gray-50" : "border-white"}
          // TODO: bg-white로 하면 hover가 안 먹힘. 디버깅해볼것.
          bgColor={isSelected ? "bg-gray-50" : "bg-[#ffffff]"}
          flexDirection="flex-row"
          hoverBgColor="hover:bg-gray-50"
          padding="px-4 py-3"
          alignItems="items-center"
        >
          <NavIcon iconName={iconName} />
          <span>{title}</span>
        </Container>
      </Link>
    </li>
  );
}

function NavIcon({ iconName }: { iconName: string }) {
  return (
    <div className="mr-3 flex h-5 w-5 items-center justify-center">
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
        {iconName}
      </span>
    </div>
  );
}
