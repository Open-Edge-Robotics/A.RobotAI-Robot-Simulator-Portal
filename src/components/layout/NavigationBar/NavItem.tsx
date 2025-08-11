import { Link } from "react-router-dom";
import Container from "../../common/Container.tsx";

interface NavItemProps {
  title: string;
  iconName: string;
  href: string;
  isSelected: boolean;
}

export default function NavItem({
  title,
  iconName,
  href,
  isSelected,
}: NavItemProps) {
  return (
    <li>
      <Link
        to={href}
        className={`${isSelected ? "text-red-600" : "text-neutral-600"}`}
      >
        <Container
          borderColor={isSelected ? "border-red-200" : "border-white"}
          bgColor={isSelected ? "bg-red-50" : "bg-white"}
          flexDirection="flex-row"
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
      <span
        className="material-symbols-outlined"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        {iconName}
      </span>
    </div>
  );
}
