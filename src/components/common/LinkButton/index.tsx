import { Link } from "react-router-dom";

import { Button } from "innogrid-ui";

interface LinkButtonProps {
  to: string;
  title?: string;
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "tertiary";
  children: React.ReactNode;
}

export default function LinkButton({ to, children, title, size = "large", color = "primary" }: LinkButtonProps) {
  return (
    <Link to={to}>
      <Button size={size} title={title} color={color}>
        {children}
      </Button>
    </Link>
  );
}
