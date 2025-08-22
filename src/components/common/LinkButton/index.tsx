import { Link } from "react-router-dom";

import { Button } from "innogrid-ui";

interface LinkButtonProps {
  to: string;
  children: React.ReactNode;
}

export default function LinkButton({ to, children }: LinkButtonProps) {
  return (
    <Link to={to}>
      <Button size="large">{children}</Button>
    </Link>
  );
}
