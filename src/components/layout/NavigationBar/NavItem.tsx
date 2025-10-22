import { NavLink } from "react-router-dom";

import Container from "@/components/common/Container.tsx";
import Icon from "@/components/common/Icon";

interface NavItemProps {
  title: string;
  iconName: string;
  href: string;
  isSelected: boolean;
  onClick?: () => void;
}

export default function NavItem({ title, iconName, href, isSelected, onClick }: NavItemProps) {
  return (
    <li onClick={onClick}>
      <NavLink
        to={href}
        className={({ isActive }) => (isActive ? "font-semibold text-gray-900" : "font-medium text-gray-600")}
      >
        <Container
          borderColor={isSelected ? "border-gray-50" : "border-white"}
          bgColor={isSelected ? "bg-gray-50" : "bg-transparent"}
          flexDirection="flex-row"
          className="items-center px-4 py-3 hover:bg-gray-50"
        >
          <NavIcon iconName={iconName} />
          <span>{title}</span>
        </Container>
      </NavLink>
    </li>
  );
}

function NavIcon({ iconName }: { iconName: string }) {
  return (
    <div className="mr-3 flex h-5 w-5 items-center justify-center">
      <Icon name={iconName} fill />
    </div>
  );
}
