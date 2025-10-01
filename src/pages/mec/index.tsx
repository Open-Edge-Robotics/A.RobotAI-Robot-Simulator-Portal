import type { PropsWithChildren } from "react";

import Container from "@/components/common/Container.tsx";
import Title from "@/components/common/Title";

import type { MecLite } from "@/types/mec/domain";

export default function MecPage() {
  return (
    <div className="bg-gray-10 min-h-full p-6">
      <Title title="MEC 목록" margin="mb-4" />
      <MecTable />
    </div>
  );
}

function MecTable() {
  return (
    <Container shadow className="mb-2 overflow-hidden">
      <TableHeader />
      <TableBody mecList={mockMecList} />
    </Container>
  );
}

const TABLE_GRID_COLS = "grid-cols-[minmax(100px,200px)_minmax(140px,240px)]";

function TableHeader() {
  return (
    <div className={`bg-gray-25 grid ${TABLE_GRID_COLS}`}>
      <TableHeaderCell>MEC ID</TableHeaderCell>
      <TableHeaderCell>이름</TableHeaderCell>
    </div>
  );
}

function TableHeaderCell({ children }: PropsWithChildren) {
  return <div className={`flex px-4 py-4 text-left text-sm whitespace-nowrap text-gray-600`}>{children}</div>;
}

function TableBody({ mecList }: { mecList: MecLite[] }) {
  return (
    <ul className="divide-y divide-gray-100">
      {mecList.map((mec) => (
        <TableBodyRow mec={mec} key={mec.id} />
      ))}
    </ul>
  );
}

function TableBodyRow({ mec }: { mec: MecLite }) {
  return (
    <li className={`hover:bg-gray-10 grid ${TABLE_GRID_COLS}`}>
      <TableBodyCell>{mec.id}</TableBodyCell>
      <TableBodyCell>{mec.name}</TableBodyCell>
    </li>
  );
}

function TableBodyCell({ children }: PropsWithChildren) {
  return <div className="flex items-center px-4 py-4 text-sm text-gray-700">{children}</div>;
}

const mockMecList: MecLite[] = [
  { id: "MEC-001", name: "Seoul Central MEC" },
  { id: "MEC-002", name: "Busan Edge MEC" },
  { id: "MEC-003", name: "Incheon Gateway MEC" },
  { id: "MEC-004", name: "Daegu Processing MEC" },
  { id: "MEC-005", name: "Gwangju Network MEC" },
  { id: "MEC-006", name: "Daejeon Data MEC" },
  { id: "MEC-007", name: "Ulsan Industrial MEC" },
  { id: "MEC-008", name: "Jeju Island MEC" },
];
