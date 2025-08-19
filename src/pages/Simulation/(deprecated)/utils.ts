// import type { CreateSimulationRequest } from "@/apis/simulation/types";

// import { ALLOWED_PARAMS, STEPS_INFO } from "./constants";
// import type {
//   AllowedParam,
//   ParallelAgentGroup,
//   Pattern,
//   PatternType,
//   SequentialAgentGroup,
//   SimulationFormData,
//   StepInfo,
//   StepType,
// } from "./types";
// import {
//   validateOrder,
//   validatePage,
//   validatePatternTypeFilter,
//   validateSize,
//   validateSort,
//   validateStatusFilter,
// } from "./validation";

// export const transformFormDataToRequest = (formData: SimulationFormData): CreateSimulationRequest => {
//   const baseRequest = {
//     mecId: formData.mec!.id,
//     simulationName: formData.name,
//     simulationDescription: formData.description,
//   };

//   const pattern = formData.pattern!;

//   if (pattern.type === "sequential") {
//     return {
//       ...baseRequest,
//       patternType: "sequential",
//       pattern: {
//         steps: pattern.agentGroups.map((group) => ({
//           stepOrder: group.stepOrder,
//           templateId: Number(group.template!.id),
//           autonomousAgentCount: group.autonomousAgentCount,
//           executionTime: group.executionTime,
//           delayAfterCompletion: group.delayAfterCompletion,
//           repeatCount: group.repeatCount,
//         })),
//       },
//     };
//   } else {
//     return {
//       ...baseRequest,
//       patternType: "parallel",
//       pattern: {
//         agents: pattern.agentGroups.map((group) => ({
//           templateId: Number(group.template!.id),
//           autonomousAgentCount: group.autonomousAgentCount,
//           executionTime: group.executionTime,
//           repeatCount: group.repeatCount,
//         })),
//       },
//     };
//   }
// };

// // 현재 활성화된 스텝과 패턴에 따라 스텝 정보 반환
// export const getCurrentStepInfo = (step: StepType, pattern: PatternType | null) => {
//   if (step === 3 && pattern) {
//     return STEPS_INFO[3][pattern];
//   }
//   return STEPS_INFO[step] as StepInfo;
// };

// export const sequentialDefaultData: SequentialAgentGroup = {
//   stepOrder: 1,
//   template: null,
//   autonomousAgentCount: 1,
//   executionTime: 1,
//   delayAfterCompletion: 0,
//   repeatCount: 1,
// };

// export const parallelDefaultData: ParallelAgentGroup = {
//   template: null,
//   autonomousAgentCount: 1,
//   executionTime: 1,
//   repeatCount: 1,
// };

// export const getPatternDataWithDefaultAgentGroup = (type: PatternType): Pattern =>
//   type === "sequential"
//     ? {
//         type: "sequential",
//         agentGroups: [sequentialDefaultData],
//       }
//     : {
//         type: "parallel",
//         agentGroups: [parallelDefaultData],
//       };

// const isAllowedParam = (key: string): key is AllowedParam => {
//   return ALLOWED_PARAMS.includes(key as AllowedParam);
// };

// // 유효하지 않은 파라미터가 있으면 URL을 정리
// // TODO: 내용 분리 리팩토링
// export const getValidParams = (searchParams: URLSearchParams) => {
//   const newSearchParams = new URLSearchParams();
//   let needsUpdate = false;

//   // 허용되지 않은 파라미터 제거 체크
//   const hasInvalidParams = Array.from(searchParams.keys()).some((key) => !isAllowedParam(key));
//   if (hasInvalidParams) needsUpdate = true;

//   // 허용된 파라미터만 새로운 URLSearchParams에 추가
//   const currentSort = searchParams.get("sort");
//   const currentOrder = searchParams.get("order");
//   const currentPage = searchParams.get("page");
//   const currentSize = searchParams.get("size");
//   const currentStatusFilter = searchParams.get("status");
//   const currentPatternTypeFilter = searchParams.get("patternType");

//   // 각 파라미터 validation
//   const validSort = validateSort(currentSort);
//   const validOrder = validateOrder(currentOrder);
//   const validPage = validatePage(currentPage);
//   const validSize = validateSize(currentSize);
//   const validStatusFilter = validateStatusFilter(currentStatusFilter);
//   const validPatternTypeFilter = validatePatternTypeFilter(currentPatternTypeFilter);

//   // sort 파라미터 처리
//   if (currentSort !== validSort) needsUpdate = true;
//   if (validSort !== null) newSearchParams.set("sort", validSort);

//   // order 파라미터 처리
//   if (currentOrder !== validOrder) needsUpdate = true;
//   if (validOrder !== null) newSearchParams.set("order", validOrder);

//   // page 파라미터 처리
//   if (currentPage !== String(validPage)) needsUpdate = true;
//   if (validPage !== null) newSearchParams.set("page", String(validPage));

//   // size 파라미터 처리
//   if (currentSize !== String(validSize)) needsUpdate = true;
//   if (validSize !== null) newSearchParams.set("size", String(validSize));

//   // statusFilter 파라미터 처리
//   if (currentStatusFilter !== validStatusFilter) needsUpdate = true;
//   if (validStatusFilter !== null) newSearchParams.set("status", validStatusFilter);

//   // patternTypeFilter 파라미터 처리
//   if (currentPatternTypeFilter !== validPatternTypeFilter) needsUpdate = true;
//   if (validPatternTypeFilter !== null) newSearchParams.set("patternType", validPatternTypeFilter);

//   if (needsUpdate) return newSearchParams;

//   return null;
// };
