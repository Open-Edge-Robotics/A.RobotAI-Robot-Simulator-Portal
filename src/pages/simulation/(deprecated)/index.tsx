// import { useEffect } from "react";
// import { Link, useSearchParams } from "react-router-dom";

// import { useQuery } from "@tanstack/react-query";
// import { Button, Pagination as InnogridPagination } from "innogrid-ui";

// import { simulationAPI } from "@/apis/simulation";
// import Icon from "@/components/common/Icon";

// import Title from "./create/Header";
// import FilterToolbar from "./FilterToolbar";
// import SimulationOverview from "./SimulationOverview";
// import SimulationTable from "./SimulationTable";
// import type { AllowedParam, OrderOption, PatternTypeFilterOption, SortOption, StatusFilterOption } from "./types";
// import { getValidParams } from "./utils";

// export default function SimulationPage() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const { isPending, isError, isSuccess, data } = useQuery({
//     queryKey: ["simulation", searchParams.toString()],
//     queryFn: () => {
//       const paramsWithDefaultValue = new URLSearchParams(searchParams);
//       if (!searchParams.get("page")) {
//         paramsWithDefaultValue.set("page", "1");
//       }
//       return simulationAPI.getSimulations(paramsWithDefaultValue);
//     },
//   });

//   const sortValue = (searchParams.get("sort") || "smart") as SortOption;
//   const orderValue = (searchParams.get("order") || "asc") as OrderOption;
//   const statusFilterValue = (searchParams.get("status") || "") as StatusFilterOption;
//   const patternTypeFilterValue = (searchParams.get("patternType") || "") as PatternTypeFilterOption;
//   const pageValue = Number(searchParams.get("page")) || 1;
//   const pageSizeValue = Number(searchParams.get("size")) || 10;

//   console.log(data?.data.simulations);

//   const applyQueryChangeRules = (newSearchParams: URLSearchParams, key: string, value: string | null) => {
//     // 쿼리 변경 시 페이지 리셋 (size 변경 시에도 페이지 리셋)
//     if (key !== "page") {
//       newSearchParams.delete("page");
//     }

//     // status 정렬 시 order 파라미터 제거
//     if (key === "sort" && value === "status") {
//       newSearchParams.delete("order");
//     }
//   };

//   const handleChangeQuery = (key: AllowedParam, value: string | null) => {
//     const newSearchParams = new URLSearchParams(searchParams);
//     if (value) {
//       newSearchParams.set(key, value);
//     } else {
//       newSearchParams.delete(key); // 빈 값이면 해당 쿼리 제거
//     }

//     applyQueryChangeRules(newSearchParams, key, value);
//     setSearchParams(newSearchParams);
//   };

//   const handleReset = () => {
//     setSearchParams(new URLSearchParams());
//   };

//   // 컴포넌트 마운트 시 URL 쿼리 유효한 값으로 정리
//   useEffect(() => {
//     const validParams = getValidParams(searchParams);
//     if (validParams) {
//       setSearchParams(validParams);
//     }
//   }, [searchParams, setSearchParams]);

//   // TODO: 로딩 및 에러 상태 처리
//   if (isPending) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error loading simulations.</div>;
//   }

//   if (isSuccess) {
//     const { overview, simulations, pagination } = data.data;

//     return (
//       <div className="bg-gray-10 flex flex-col gap-6 p-6">
//         <div className="flex items-center justify-between">
//           <Title title="시뮬레이션 관리" />
//           <SimulationCreateButton />
//         </div>
//         <SimulationOverview overview={overview} />
//         <FilterToolbar
//           sortValue={sortValue}
//           onSortChange={(value) => {
//             handleChangeQuery("sort", value);
//           }}
//           orderValue={orderValue}
//           onOrderChange={(value) => {
//             handleChangeQuery("order", value);
//           }}
//           statusFilterValue={statusFilterValue}
//           onStatusFilterChange={(value) => {
//             handleChangeQuery("status", value);
//           }}
//           patternTypeFilterValue={patternTypeFilterValue}
//           onPatternTypeFilterChange={(value) => {
//             handleChangeQuery("patternType", value);
//           }}
//           onReset={handleReset}
//         />
//         <SimulationTable simulations={simulations} />
//         <Pagination
//           currentPage={pageValue}
//           size={pageSizeValue}
//           totalCount={pagination.totalItems}
//           onChangePage={(value) => {
//             handleChangeQuery("page", value);
//           }}
//           onChangePageSize={(value) => {
//             handleChangeQuery("size", value);
//           }}
//         />
//       </div>
//     );
//   }
// }

// function SimulationCreateButton() {
//   return (
//     <Link to="/simulation/create">
//       <Button size="large">
//         <div className="flex items-center gap-1">
//           <Icon name="add" className="ml-[-6px]" />
//           시뮬레이션 생성
//         </div>
//       </Button>
//     </Link>
//   );
// }

// interface PaginationProps {
//   currentPage: number;
//   size: number;
//   totalCount: number;
//   onChangePage: (value: string) => void;
//   onChangePageSize: (value: string) => void;
// }

// function Pagination({ currentPage, size, totalCount, onChangePage, onChangePageSize }: PaginationProps) {
//   return (
//     <div className="mt-[-10px] ml-auto w-[400px] p-0">
//       <InnogridPagination
//         page={currentPage}
//         size={size}
//         totalCount={totalCount}
//         onClickPrev={() => {
//           if (currentPage > 1) {
//             onChangePage(String(currentPage - 1));
//           }
//         }}
//         onClickNext={() => {
//           onChangePage(String(currentPage + 1));
//         }}
//         onChangePageInput={(e) => {
//           onChangePage(e.target.value);
//         }}
//         onChangePageSize={(e) => {
//           onChangePageSize(e.target.value);
//         }}
//       />
//     </div>
//   );
// }
