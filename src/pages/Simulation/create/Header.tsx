import { Link } from "react-router-dom";

import { Button } from "innogrid-ui";

import Title from "./Title";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <Title title={title} />
      <SimulationListButton />
    </div>
  );
}

function SimulationListButton() {
  return (
    <Link to="/simulation">
      <Button size="large">시뮬레이션 목록</Button>
    </Link>
  );
}
