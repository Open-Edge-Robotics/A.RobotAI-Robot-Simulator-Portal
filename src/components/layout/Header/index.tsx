import { Button } from "innogrid-ui";

export default function Header() {
  return (
    <header className="border-b-px flex h-24 justify-between border-b border-gray-100 px-6 py-4">
      <div>
        <h1 className="mb-1 text-2xl font-bold">자율행동체 시뮬레이터</h1>
        <h3>실시간 모니터링 대시보드</h3>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-sm text-gray-600">
          마지막 업데이트: 오전 10:34:21
        </div>
        <Button color="secondary">로그아웃</Button>
      </div>
    </header>
  );
}
