import { Stepper } from "innogrid-ui";
import Header from "./Header";
import { useState } from "react";
import InfoBox from "./InfoBox";
import Step1FormContent from "./StepFormContent/Step1FormContent";
import NavigationButtons from "./NavigationButtons";
import Step2FormContent from "./StepFormContent/Step2FormContent";
import type {
  ParallelAgentGroup,
  Pattern,
  PatternType,
  SequentialAgentGroup,
  SimulatioFormData,
  StepInfo,
  StepType,
} from "../types";
// import { STEPS, STEPS_INFO } from "../constant";
import { STEPS, STEPS_INFO } from "../constant";
import { validator } from "../validation";
import Step3FormContent from "./StepFormContent/Step3FormContent";
import Step4FormContent from "./StepFormContent/Step4FormContent";

const defaultFormData: SimulatioFormData = {
  name: "",
  description: "",
  mec: null,
  pattern: null,
};

// const defaultFormData: SimulatioFormData = {
//   name: "simulation name",
//   description: "description",
//   mec: { id: "mec id", name: "mec name" },
//   pattern: {
//     // type: "sequential",
//     // agentGroups: [
//     //   {
//     //     autonomousAgentCount: 1,
//     //     delayAfterCompletion: 12,
//     //     executionTime: 456,
//     //     repeatCount: 1,
//     //     stepOrder: 1,
//     //     template: { id: "template id", name: "template name" },
//     //   },
//     // ],
//     type: "parallel",
//     agentGroups: [
//       {
//         autonomousAgentCount: 1,
//         executionTime: 456,
//         repeatCount: 1,
//         template: { id: "template id", name: "template name" },
//       },
//     ],
//   },
// };

export default function SimulationCreatePage() {
  const [currentStep, setCurrentStep] = useState<StepType>(1);
  const [formData, setFormData] = useState<SimulatioFormData>(defaultFormData);
  const stepInfo = getCurrentStepInfo(
    currentStep,
    formData.pattern?.type ?? null,
  );

  const updateFormData = <K extends keyof SimulatioFormData>(
    field: K,
    value: SimulatioFormData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateStep = (step: StepType) => {
    const errorMessage = validator[step](formData);
    return errorMessage
      ? { error: { message: errorMessage } }
      : { error: null };
  };

  const handleNext = () => {
    const result = validateStep(currentStep);
    if (result.error) {
      alert(result.error.message);
      return;
    }
    setCurrentStep((prev) =>
      currentStep < 4 ? ((prev + 1) as StepType) : prev,
    );
  };

  const handlePrev = () => {
    setCurrentStep((prev) =>
      currentStep > 1 ? ((prev - 1) as StepType) : prev,
    );
  };

  const handleSubmit = () => {
    alert("시뮬레이션 생성 완료!");
    // 여기에 시뮬레이션 생성 로직을 추가하세요.
  };

  return (
    <>
      <div className="flex h-full flex-col gap-6 bg-neutral-100 p-6">
        {/* 헤더 */}
        <Header />
        {/* 생성 단계 Stepper */}
        <Stepper
          step={currentStep - 1}
          steps={STEPS}
          orientation="horizontal"
        />
        {/* 현재 단계 설명 */}
        <InfoBox title={stepInfo.title} description={stepInfo.description} />
        {/* 생성폼 */}
        <form>
          {currentStep === 1 && (
            <Step1FormContent
              name={formData.name}
              descirption={formData.description}
              mec={formData.mec}
              onChangeFormData={updateFormData}
            />
          )}
          {currentStep === 2 && (
            <Step2FormContent
              patternType={formData.pattern?.type ?? null}
              onSelectPatternType={(patternType) => {
                if (!patternType) return;
                const pattern =
                  getPatternDataWithDefaultAgentGroup(patternType);
                updateFormData("pattern", pattern);
              }}
            />
          )}
          {currentStep === 3 && (
            <Step3FormContent
              pattern={formData.pattern}
              onChangePattern={(pattern) => {
                updateFormData("pattern", pattern);
              }}
            />
          )}
          {currentStep === 4 && <Step4FormContent formData={formData} />}

          {/* 단계 이동 버튼 */}
          <NavigationButtons
            isFirstStep={currentStep === 1}
            isLastStep={currentStep === 4}
            onClickPrev={handlePrev}
            onClickNext={handleNext}
            onClickComplete={handleSubmit}
          />
        </form>
      </div>
      {/* TODO: toast 함수로 쓸 수 있도록 훅 만들기 */}
      {/* <Toast
        isOpen={isToast}
        status="negative"
        position="top"
        showCloseButton={false}
        onOpenChange={() => setIsToastOpen(false)}
      >
        {errorMessage}
      </Toast> */}
    </>
  );
}

// 현재 스텝과 패턴에 따라 스텝 정보 반환
const getCurrentStepInfo = (step: StepType, pattern: PatternType | null) => {
  if (step === 3 && pattern) {
    return STEPS_INFO[3][pattern];
  }
  return STEPS_INFO[step] as StepInfo;
};

const sequentialDefaultData: SequentialAgentGroup = {
  stepOrder: 1,
  template: null,
  autonomousAgentCount: 0,
  executionTime: 0,
  delayAfterCompletion: 0,
  repeatCount: 1,
};

const parallelDefaultData: ParallelAgentGroup = {
  template: null,
  autonomousAgentCount: 0,
  executionTime: 0,
  repeatCount: 1,
};

const getPatternDataWithDefaultAgentGroup = (type: PatternType): Pattern =>
  type === "sequential"
    ? {
        type: "sequential",
        agentGroups: [sequentialDefaultData],
      }
    : {
        type: "parallel",
        agentGroups: [parallelDefaultData],
      };
