// import React from "react";
// import { Link } from "react-router-dom";

// import { Button } from "innogrid-ui";

// import type { Simulation } from "@/apis/simulation/types";
// import Badge from "@/components/common/Badge";
// import Container from "@/components/common/Container.tsx";
// import Icon from "@/components/common/Icon";
// import { formatDateTime } from "@/utils/formatting";

// import { PATTERN_CONFIG, STATUS_CONFIG } from "./constants";

// type ActionType = "pause" | "resume" | "restart" | "delete" | "edit";

// interface SimulationTableProps {
//   simulations: Simulation[];
// }

// export default function SimulationTable({ simulations }: SimulationTableProps) {
//   return (
//     <Container shadow overflowHidden>
//       {simulations.length === 0 ? (
//         <Fallback />
//       ) : (
//         <div>
//           <TableHeader />
//           <TableBody simulations={simulations} />
//         </div>
//       )}
//     </Container>
//   );
// }

// function TableHeader() {
//   return (
//     <div className="bg-gray-25 grid grid-cols-[1fr_152px_164px_224px_224px_152px_152px]">
//       <TableHeaderCell>시뮬레이션 이름</TableHeaderCell>
//       <TableHeaderCell>상태</TableHeaderCell>
//       <TableHeaderCell>실행 패턴</TableHeaderCell>
//       <TableHeaderCell>생성 일시</TableHeaderCell>
//       <TableHeaderCell>최종 업데이트 일시</TableHeaderCell>
//       <TableHeaderCell>MEC ID</TableHeaderCell>
//       <TableHeaderCell>액션</TableHeaderCell>
//     </div>
//   );
// }

// function TableHeaderCell({ children }: { children: React.ReactNode }) {
//   return <div className="px-4 py-4 text-left text-sm whitespace-nowrap text-gray-600">{children}</div>;
// }

// function TableBody({ simulations }: { simulations: Simulation[] }) {
//   return (
//     <ul className="divide-y divide-gray-100">
//       {simulations.map((simulation) => (
//         <TableBodyRow simulation={simulation} onAction={() => {}} key={simulation.simulationId} />
//       ))}
//     </ul>
//   );
// }

// function TableBodyRow({ simulation, onAction }: { simulation: Simulation; onAction: () => void }) {
//   return (
//     <Link to={`${simulation.simulationId}`}>
//       <li
//         key={simulation.simulationId}
//         className={`hover:bg-gray-10 grid grid-cols-[1fr_152px_164px_224px_224px_152px_152px]`}
//       >
//         <TableBodyCell>{simulation.simulationName}</TableBodyCell>
//         <TableBodyCell>
//           <StatusBadge status={simulation.status} />
//         </TableBodyCell>
//         <TableBodyCell>{PATTERN_CONFIG[simulation.patternType].title}</TableBodyCell>
//         <TableBodyCell>{formatDateTime(simulation.createdAt)}</TableBodyCell>
//         <TableBodyCell>{formatDateTime(simulation.updatedAt)}</TableBodyCell>
//         <TableBodyCell>{simulation.mecId}</TableBodyCell>
//         <TableBodyCell>
//           <ActionButtons simulation={simulation} handleActions={onAction} />
//         </TableBodyCell>
//       </li>
//     </Link>
//   );
// }

// interface TableBodyCellProps {
//   children: React.ReactNode;
// }

// function TableBodyCell({ children }: TableBodyCellProps) {
//   return <div className={`flex items-center px-4 py-4 text-sm text-gray-700`}>{children}</div>;
// }

// function StatusBadge({ status }: { status: Simulation["status"] }) {
//   const config = STATUS_CONFIG[status];

//   return (
//     <div className="w-16">
//       <Badge text={config.text} bgColor={config.bgColor} textColor={config.textColor} fontSize="text-xs" />
//     </div>
//   );
// }

// function ActionButtons({
//   simulation,
//   handleActions,
// }: {
//   simulation: Simulation;
//   handleActions: (action: ActionType, id: number, name: string) => void;
// }) {
//   const { status } = simulation;

//   const buttonGroups = {
//     RUNNING: <ActionButton iconName="pause" onClick={handleActions} />,
//     PAUSED: <ActionButton iconName="play_arrow" onClick={handleActions} />,
//     FAILED: <ActionButton iconName="play_arrow" onClick={handleActions} />,
//     COMPLETED: <ActionButton iconName="play_arrow" onClick={handleActions} />,
//     READY: <ActionButton iconName="pause" onClick={handleActions} />,
//   };

//   return buttonGroups[status];
// }

// interface ActionButtonProps {
//   iconName: string;
//   onClick: (action: ActionType, id: number, name: string) => void;
// }

// function ActionButton({ iconName, onClick }: ActionButtonProps) {
//   return (
//     <>
//       <button
//         onClick={() => {
//           onClick("pause", 4, "s");
//         }}
//       >
//         <Icon name={iconName} className="cursor-pointer hover:text-red-500 active:text-red-700" fill />
//       </button>
//       <Icon name="delete" />
//     </>
//   );
// }

// function Fallback() {
//   return (
//     <div className="px-6 py-12 text-center">
//       <h3 className="mb-2 text-lg font-semibold">시뮬레이션이 없습니다</h3>
//       <p className="mb-3 text-gray-600">새로운 시뮬레이션을 생성해보세요.</p>
//       <Link to="/simulation/create">
//         <Button color="primary" size="large">
//           시뮬레이션 생성
//         </Button>
//       </Link>
//     </div>
//   );
// }
