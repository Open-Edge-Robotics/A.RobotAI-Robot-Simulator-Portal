import { Link } from "react-router-dom";

import { Button } from "innogrid-ui";

interface LinkButtonProps {
  to: string;
  title?: string;
  children: React.ReactNode;
}

export default function LinkButton({ to, children, title }: LinkButtonProps) {
  return (
    <Link to={to}>
      <Button size="large" title={title}>
        {children}
      </Button>
    </Link>
  );
}
