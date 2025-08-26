import { Link } from "react-router-dom";

import { Button } from "innogrid-ui";

export default function Header() {
  return (
    <header className="border-b-px flex h-24 items-center justify-between border-b border-gray-100 px-6 py-4">
      <Link to="/">
        <h1 className="mb-1 text-2xl font-bold">자율행동체 시뮬레이터</h1>
        <h3>실시간 모니터링 대시보드</h3>
      </Link>
      <Button color="secondary">로그아웃</Button>
    </header>
  );
}
