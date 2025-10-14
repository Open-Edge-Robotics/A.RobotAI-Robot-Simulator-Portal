import Container from "@/components/common/Container.tsx";

import type { Simulation } from "@/types/simulation/domain";

import TableBody from "./SimulationTableBody";
import TableHeader from "./SimulationTableHeader";

interface SimulationTableProps {
  simulations: Simulation[];
}

export default function SimulationTable({ simulations }: SimulationTableProps) {
  return (
    <Container shadow className="overflow-hidden">
      <TableHeader />
      <TableBody simulations={simulations} />
    </Container>
  );
}

// 시뮬레이션 이름 | 상태 | 실행 패턴 | 생성 일시 | 업데이트 일시 | MEC ID | 액션
export const TABLE_GRID_COLS =
  "grid-cols-[minmax(60px,80px)_minmax(148px,1fr)_minmax(120px,188px)_minmax(88px,148px)_minmax(160px,220px)_minmax(160px,220px)_minmax(120px,152px)_164px]";
