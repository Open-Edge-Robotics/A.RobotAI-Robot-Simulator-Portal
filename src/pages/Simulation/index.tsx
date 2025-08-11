// import React, { useState } from "react";
// import type { SelectSingleValue } from "innogrid-ui";

// import { Select } from "innogrid-ui";

// type OptionType = { text: string; value: string };

// const options = [
//   { text: "옵션 1", value: "option1" },
//   { text: "옵션 2", value: "option2" },
//   { text: "옵션 3", value: "option3" },
// ];

// // 타입 정의
// interface FormData {
//   simulationName: string;
//   description: string;
//   startTime: string;
//   endTime: string;
//   mecId: string;
// }

// interface FormErrors {
//   [key: string]: boolean;
// }

// interface Step {
//   number: number;
//   title: string;
// }

// interface Pattern {
//   id: string;
//   title: string;
//   icon: string;
//   iconBg: string;
//   iconColor: string;
//   description: string;
// }

// type PatternType = "순차" | "병렬" | null;

// const SimulationCreationForm: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState<number>(1);
//   const [selectedPattern, setSelectedPattern] = useState<PatternType>(null);
//   const [formData, setFormData] = useState<FormData>({
//     simulationName: "",
//     description: "",
//     startTime: "",
//     endTime: "",
//     mecId: "",
//   });
//   const [errors, setErrors] = useState<FormErrors>({});

//   const [selectedValue, setSelectedValue] = useState<OptionType | null>();

//   const onChangeSelect = (option: SelectSingleValue<OptionType>) => {
//     setSelectedValue(option);
//   };

//   const handleInputChange = (field: keyof FormData, value: string): void => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));

//     // 에러 상태 제거
//     if (errors[field]) {
//       setErrors((prev) => ({
//         ...prev,
//         [field]: false,
//       }));
//     }
//   };

//   const validateStep1 = (): boolean => {
//     const requiredFields: (keyof FormData)[] = [
//       "simulationName",
//       "startTime",
//       "endTime",
//       "mecId",
//     ];
//     const newErrors: FormErrors = {};
//     let isValid = true;

//     requiredFields.forEach((field) => {
//       if (!formData[field].trim()) {
//         newErrors[field] = true;
//         isValid = false;
//       }
//     });

//     setErrors(newErrors);

//     if (!isValid) {
//       alert("필수 항목을 모두 입력해주세요.");
//     }

//     return isValid;
//   };

//   const validateStep2 = (): boolean => {
//     if (!selectedPattern) {
//       alert("실행 패턴을 선택해주세요.");
//       return false;
//     }
//     return true;
//   };

//   const handleNext = (): void => {
//     if (currentStep === 1) {
//       if (validateStep1()) {
//         setCurrentStep(2);
//       }
//     } else if (currentStep === 2) {
//       if (validateStep2()) {
//         alert("3단계로 진행합니다. (구현 예정)");
//       }
//     }
//   };

//   const handlePrev = (): void => {
//     if (currentStep === 2) {
//       setCurrentStep(1);
//     }
//   };

//   const handlePatternSelect = (pattern: PatternType): void => {
//     setSelectedPattern(pattern);
//   };

//   const steps: Step[] = [
//     { number: 1, title: "기본 정보" },
//     { number: 2, title: "패턴 선택" },
//     { number: 3, title: "상세 설정" },
//     { number: 4, title: "검토 및 완료" },
//   ];

//   const patterns: Pattern[] = [
//     {
//       id: "순차",
//       title: "순차 실행",
//       icon: "→",
//       iconBg: "bg-blue-100",
//       iconColor: "text-blue-600",
//       description:
//         "가상 자율행동체들이 단계별로 순서대로 실행됩니다.\n첫 번째 그룹 완료 → 두 번째 그룹 시작",
//     },
//     {
//       id: "병렬",
//       title: "병렬 실행",
//       icon: "⚡",
//       iconBg: "bg-orange-100",
//       iconColor: "text-orange-600",
//       description:
//         "서로 다른 유형의 가상 자율행동체들이 동시에 실행됩니다.\n모든 그룹이 같은 시간에 시작",
//     },
//   ];

//   const getStepClasses = (step: Step): string => {
//     if (step.number === currentStep) {
//       return "text-blue-600 font-medium";
//     } else if (step.number < currentStep) {
//       return "text-green-600";
//     } else {
//       return "text-gray-500";
//     }
//   };

//   const getStepNumberClasses = (step: Step): string => {
//     if (step.number === currentStep) {
//       return "bg-blue-600 text-white";
//     } else if (step.number < currentStep) {
//       return "bg-green-600 text-white";
//     } else {
//       return "bg-gray-200 text-gray-500";
//     }
//   };

//   const getInputClasses = (field: keyof FormData): string => {
//     const baseClasses =
//       "w-full px-4 py-3 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
//     const errorClasses = errors[field] ? "border-red-500" : "border-gray-300";
//     return `${baseClasses} ${errorClasses}`;
//   };

//   const getPatternCardClasses = (patternId: string): string => {
//     const baseClasses =
//       "relative border-2 rounded-xl p-5 cursor-pointer transition-all hover:border-blue-500 hover:shadow-lg";
//     const selectedClasses =
//       selectedPattern === patternId
//         ? "border-blue-500 bg-blue-50"
//         : "border-gray-200 bg-white";
//     return `${baseClasses} ${selectedClasses}`;
//   };

//   return (
//     <div className="mx-auto min-h-screen max-w-4xl bg-white p-5">
//       {/* Header */}
//       <Select
//         options={options}
//         getOptionLabel={(option) => option.text}
//         getOptionValue={(option) => option.value}
//         value={selectedValue}
//         onChange={onChangeSelect}
//       />
//       <div className="mb-8">
//         <h1 className="mb-5 text-2xl font-semibold text-gray-900">
//           시뮬레이션 생성
//         </h1>

//         {/* Progress Steps */}
//         <div className="mb-8 flex items-center">
//           {steps.map((step, index) => (
//             <React.Fragment key={step.number}>
//               <div
//                 className={`flex items-center text-sm ${getStepClasses(step)}`}
//               >
//                 <div
//                   className={`mr-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${getStepNumberClasses(step)}`}
//                 >
//                   {step.number < currentStep ? "✓" : step.number}
//                 </div>
//                 <span>{step.title}</span>
//               </div>
//               {index < steps.length - 1 && (
//                 <div className="mx-4 h-px w-15 bg-gray-200"></div>
//               )}
//             </React.Fragment>
//           ))}
//         </div>
//       </div>

//       {/* Step 1: Basic Information */}
//       {currentStep === 1 && (
//         <div>
//           <div className="mb-8 flex items-start rounded-lg border border-blue-200 bg-blue-50 p-4">
//             <div className="mt-0.5 mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
//               1
//             </div>
//             <div className="text-sm text-blue-800">
//               <strong>1단계: 기본 정보 입력</strong> — 시뮬레이션의 이름과 설명
//               정보를 설정하세요
//             </div>
//           </div>

//           {/* 폼 시작 */}
//           <div className="space-y-6">
//             <div>
//               <label className="mb-2 block text-sm font-medium text-gray-700">
//                 시뮬레이션 이름 <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={formData.simulationName}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   handleInputChange("simulationName", e.target.value)
//                 }
//                 placeholder="시뮬레이션 이름을 입력하세요"
//                 className={getInputClasses("simulationName")}
//               />
//             </div>

//             <div>
//               <label className="mb-2 block text-sm font-medium text-gray-700">
//                 설명
//               </label>
//               <textarea
//                 value={formData.description}
//                 onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
//                   handleInputChange("description", e.target.value)
//                 }
//                 placeholder="시뮬레이션에 대한 설명을 입력하세요 (선택사항)"
//                 rows={4}
//                 className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               />
//             </div>

//             <div className="grid grid-cols-3 gap-4">
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-700">
//                   시작 시간 <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.startTime}
//                   onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                     handleInputChange("startTime", e.target.value)
//                   }
//                   placeholder="연도-월-일 -- --:--"
//                   className={getInputClasses("startTime")}
//                 />
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-700">
//                   종료 시간 <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.endTime}
//                   onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                     handleInputChange("endTime", e.target.value)
//                   }
//                   placeholder="연도-월-일 -- --:--"
//                   className={getInputClasses("endTime")}
//                 />
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-700">
//                   MEC ID <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   value={formData.mecId}
//                   onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
//                     handleInputChange("mecId", e.target.value)
//                   }
//                   className={getInputClasses("mecId")}
//                 >
//                   <option value="">MEC를 선택하세요</option>
//                   <option value="MEC-001">MEC-001</option>
//                   <option value="MEC-002">MEC-002</option>
//                   <option value="MEC-003">MEC-003</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//           {/* 폼1 종료 */}
//         </div>
//       )}

//       {/* Step 2: Pattern Selection */}
//       {currentStep === 2 && (
//         <div>
//           <div className="mb-6 flex items-start rounded-lg border border-blue-200 bg-blue-50 p-4">
//             <div className="mt-0.5 mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
//               2
//             </div>
//             <div className="text-sm text-blue-800">
//               <strong>2단계: 실행 패턴 선택</strong> — 가상 자율행동체들이 어떤
//               방식으로 실행될지 선택하세요.
//             </div>
//           </div>

//           <div className="mb-8 flex items-start rounded-lg border border-yellow-200 bg-yellow-50 p-4">
//             <div className="mt-0.5 mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-yellow-500 text-xs font-bold text-white">
//               ⚡
//             </div>
//             <div className="text-sm text-yellow-800">
//               <strong>패턴 선택 가이드:</strong> 하나의 시뮬레이션에는 하나의
//               패턴만 적용됩니다. 목적에 맞는 패턴을 선택하세요.
//             </div>
//           </div>

//           <div className="mb-8 grid grid-cols-2 gap-5">
//             {patterns.map((pattern) => (
//               <div
//                 key={pattern.id}
//                 onClick={() => handlePatternSelect(pattern.id as PatternType)}
//                 className={getPatternCardClasses(pattern.id)}
//               >
//                 {selectedPattern === pattern.id && (
//                   <div className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-sm text-white">
//                     ✓
//                   </div>
//                 )}

//                 <div className="mb-3 flex items-center">
//                   <div
//                     className={`mr-3 flex h-10 w-10 items-center justify-center rounded-lg text-xl ${pattern.iconBg} ${pattern.iconColor}`}
//                   >
//                     {pattern.icon}
//                   </div>
//                   <h3 className="text-lg font-semibold text-gray-900">
//                     {pattern.title}
//                   </h3>
//                 </div>

//                 <p className="text-sm leading-relaxed whitespace-pre-line text-gray-600">
//                   {pattern.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Navigation Buttons */}
//       <div className="mt-10 flex items-center justify-between">
//         <button
//           onClick={handlePrev}
//           disabled={currentStep === 1}
//           className="rounded-lg bg-gray-100 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
//         >
//           이전
//         </button>

//         <button
//           onClick={handleNext}
//           className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
//         >
//           다음 <span className="text-base">→</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SimulationCreationForm;

export default function SimulationPage() {
  return <div>simulation page</div>;
}
