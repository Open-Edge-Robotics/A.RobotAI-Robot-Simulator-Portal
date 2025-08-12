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
  SimulationFormData,
  StepInfo,
  StepType,
} from "../types";
import { STEPS, STEPS_INFO } from "../constants";
import { validator } from "../validation";
import Step3FormContent from "./StepFormContent/Step3FormContent";
import Step4FormContent from "./StepFormContent/Step4FormContent";
import Stepper from "../../../components/common/Stepper";

const defaultFormData: SimulationFormData = {
  name: "",
  description: "",
  mec: null,
  pattern: null,
};

export default function SimulationCreatePage() {
  const [currentStep, setCurrentStep] = useState<StepType>(1);
  const [formData, setFormData] = useState<SimulationFormData>(defaultFormData);
  const stepInfo = getCurrentStepInfo(
    currentStep,
    formData.pattern?.type ?? null,
  );

  const updateFormData = <K extends keyof SimulationFormData>(
    field: K,
    value: SimulationFormData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateStep = (step: StepType): boolean => {
    const errorMessage = validator[step](formData);
    if (errorMessage) {
      // TODO: toast 띄우기
      alert(errorMessage);
      return false;
    }
    return true;
  };

  const handleNext = () => {
    const isValid = validateStep(currentStep);
    if (!isValid) return;
    setCurrentStep((prev) =>
      currentStep < 4 ? ((prev + 1) as StepType) : prev,
    );
  };

  const handlePrev = () => {
    setCurrentStep((prev) =>
      currentStep > 1 ? ((prev - 1) as StepType) : prev,
    );
  };

  const handleSubmit = async () => {
    const isValid = validateStep(4);
    if (!isValid) return;
    await createSimulation();
    alert("시뮬레이션 생성 완료!");
  };

  const createSimulation = async () => {
    try {
      // TODO: 시뮬레이션 생성 로직
      console.log("post simulation");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="bg-gray-10 flex h-full flex-col gap-6 p-6">
        {/* 헤더 */}
        <Header />

        {/* 생성 단계 Stepper */}
        <Stepper activeStep={currentStep - 1} steps={STEPS} />

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
            onPrevClick={handlePrev}
            onNextClick={handleNext}
            onCompleteClick={handleSubmit}
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

// 현재 활성화된 스텝과 패턴에 따라 스텝 정보 반환
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
