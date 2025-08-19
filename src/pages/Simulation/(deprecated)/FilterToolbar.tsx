// import { Select } from "innogrid-ui";

// import Divider from "@/components/common/Divider";
// import Icon from "@/components/common/Icon";

// import { FILTER_OPTIONS, ORDER_OPTIONS, SORT_OPTIONS } from "./constants";
// import type { OrderOption, PatternTypeFilterOption, SortOption, StatusFilterOption } from "./types";

// import "./style.css";

// interface FilterToolbarProps {
//   sortValue: SortOption;
//   onSortChange: (value: SortOption) => void;
//   orderValue: OrderOption;
//   onOrderChange: (value: OrderOption) => void;
//   statusFilterValue: StatusFilterOption | null;
//   onStatusFilterChange: (value: StatusFilterOption | null) => void;
//   patternTypeFilterValue: PatternTypeFilterOption | null;
//   onPatternTypeFilterChange: (value: PatternTypeFilterOption | null) => void;
//   onReset: () => void;
// }

// export default function FilterToolbar({
//   sortValue,
//   onSortChange,
//   orderValue,
//   onOrderChange,
//   statusFilterValue,
//   onStatusFilterChange,
//   patternTypeFilterValue,
//   onPatternTypeFilterChange,
//   onReset,
// }: FilterToolbarProps) {
//   return (
//     <div className="flex h-10 items-center gap-5">
//       <SortSelect selected={sortValue} onChange={onSortChange} />
//       <Divider orientation="vertical" />
//       {sortValue !== "status" && (
//         <>
//           <OrderRadio selected={orderValue} onChange={onOrderChange} />
//           <Divider orientation="vertical" />
//         </>
//       )}
//       <FilterSelect
//         selectedStatus={statusFilterValue}
//         selectedPatternType={patternTypeFilterValue}
//         onStatusChange={onStatusFilterChange}
//         onPatternTypeChange={onPatternTypeFilterChange}
//       />
//       <Divider orientation="vertical" />
//       <ResetButton onClick={onReset} />
//     </div>
//   );
// }

// interface SortSelectProps {
//   selected: SortOption;
//   onChange: (value: SortOption) => void;
// }

// function SortSelect({ selected, onChange }: SortSelectProps) {
//   return (
//     <div className="flex items-center gap-3">
//       <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-50">
//         <Icon name="sort" className="text-gray-500" />
//       </div>
//       <Select
//         options={SORT_OPTIONS}
//         value={SORT_OPTIONS.find((option) => option.value === selected)}
//         getOptionLabel={(option) => option.label}
//         getOptionValue={(option) => option.value}
//         size="l-small"
//         onChange={(option) => onChange(option ? option.value : SORT_OPTIONS[0].value)}
//       />
//     </div>
//   );
// }

// interface OrderRadioProps {
//   selected: OrderOption;
//   onChange: (value: OrderOption) => void;
// }

// function OrderRadio({ selected, onChange }: OrderRadioProps) {
//   return (
//     <div className="flex items-center gap-4">
//       <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-50">
//         <Icon name="swap_vert" className="text-gray-500" />
//       </div>
//       <div className="flex items-center gap-3">
//         {ORDER_OPTIONS.map((option) => (
//           <label className="flex cursor-pointer items-center gap-1.5" key={option.value}>
//             <input
//               type="radio"
//               name="sortOrder"
//               value={option.value}
//               checked={option.value === selected}
//               onChange={() => onChange(option.value)}
//               className="h-4 w-4 text-blue-600"
//             />
//             <span className="text-sm font-medium">{option.label}</span>
//           </label>
//         ))}
//       </div>
//     </div>
//   );
// }

// interface FilterSelectProps {
//   selectedStatus: StatusFilterOption | null;
//   selectedPatternType: PatternTypeFilterOption | null;
//   onStatusChange: (value: StatusFilterOption | null) => void;
//   onPatternTypeChange: (value: PatternTypeFilterOption | null) => void;
// }

// function FilterSelect({ selectedStatus, selectedPatternType, onStatusChange, onPatternTypeChange }: FilterSelectProps) {
//   return (
//     <div className="flex items-center gap-3">
//       <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-50">
//         <Icon name="filter_alt" className="text-gray-500" />
//       </div>
//       {/* TODO: 체크박스 select 사용하기 */}
//       <Select
//         options={FILTER_OPTIONS.status}
//         value={FILTER_OPTIONS.status.find((option) => option.value === selectedStatus)}
//         getOptionLabel={(option) => option.label}
//         getOptionValue={(option) => option.value}
//         size="l-small"
//         onChange={(option) => onStatusChange(option ? option.value : FILTER_OPTIONS.status[0].value)}
//         placeholder="상태"
//         isClearable
//       />
//       <Select
//         options={FILTER_OPTIONS.patternType}
//         value={FILTER_OPTIONS.patternType.find((option) => option.value === selectedPatternType)}
//         getOptionLabel={(option) => option.label}
//         getOptionValue={(option) => option.value}
//         size="l-small"
//         onChange={(option) => onPatternTypeChange(option ? option.value : FILTER_OPTIONS.patternType[0].value)}
//         placeholder="패턴 타입"
//         isClearable
//       />
//     </div>
//   );
// }

// function ResetButton({ onClick }: { onClick: () => void }) {
//   return (
//     <button
//       onClick={onClick}
//       className="flex cursor-pointer items-center gap-1 text-sm text-gray-400 hover:text-gray-700"
//     >
//       <span>전체 초기화</span>
//       <Icon name="refresh" className="mt-px" />
//     </button>
//   );
// }
