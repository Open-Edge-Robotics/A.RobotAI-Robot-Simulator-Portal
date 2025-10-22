import { TABLE_GRID_COLS } from ".";

export default function TableHeader() {
  return (
    <div className={`bg-gray-25 grid ${TABLE_GRID_COLS}`}>
      <TableHeaderCell>ID</TableHeaderCell>
      <TableHeaderCell>시뮬레이션 이름</TableHeaderCell>
      <TableHeaderCell justifyCenter>상태</TableHeaderCell>
      <TableHeaderCell>실행 패턴</TableHeaderCell>
      <TableHeaderCell>생성 일시</TableHeaderCell>
      <TableHeaderCell>최종 업데이트 일시</TableHeaderCell>
      <TableHeaderCell>MEC ID</TableHeaderCell>
      <TableHeaderCell>액션</TableHeaderCell>
    </div>
  );
}

interface TableHeaderCellProps {
  justifyCenter?: boolean;
  children: React.ReactNode;
}

function TableHeaderCell({ justifyCenter, children }: TableHeaderCellProps) {
  return (
    <div
      className={`flex px-4 py-4 text-left text-sm whitespace-nowrap text-gray-600 ${justifyCenter && "justify-center"}`}
    >
      {children}
    </div>
  );
}
