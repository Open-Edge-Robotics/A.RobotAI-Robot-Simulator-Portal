import { useState } from "react";

import Stepper from "@/components/common/Stepper";

import { STEPS } from "@/constants/simulation.ts";

import { createFormValidator } from "@/pages/simulation/validation.ts";

import type { Mec, PatternType, SimulationFormData, StepType } from "@/types/simulation/domain.ts";

import type { TemplateLite } from "@/types/template/domain.ts";
import { getCurrentStepInfo, getPatternDataWithDefaultAgentGroup } from "@/utils/simulation/data.ts";
import { errorToast } from "@/utils/toast.ts";

import InfoBox from "./InfoBox.tsx";
import NavigationButtons from "./NavigationButtons.tsx";
import Step1Content from "./steps/Step1Content.tsx";
import Step2Content from "./steps/Step2Content.tsx";
import Step3Content from "./steps/Step3Content.tsx";
import Step4Content from "./steps/Step4Content.tsx";

interface SimulationFormProps {
  initialData?: SimulationFormData;
  mecList: Mec[];
  templateList: TemplateLite[];
  disableSubmitButton?: boolean;
  submitButtonText: string;
  onSubmit: (formData: SimulationFormData) => void;
}

export default function SimulationForm({
  initialData,
  mecList,
  templateList,
  onSubmit,
  disableSubmitButton = false,
  submitButtonText,
}: SimulationFormProps) {
  const [currentStep, setCurrentStep] = useState<StepType>(1);
  const [formData, setFormData] = useState<SimulationFormData>(initialData ?? defaultFormData);

  const stepInfo = getCurrentStepInfo(currentStep, formData.pattern?.type ?? null);

  // 폼 데이터 업데이트 핸들러
  const updateFormData = <K extends keyof SimulationFormData>(field: K, value: SimulationFormData[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 패턴 선택 핸들러
  const handlePatternSelect = (patternType: PatternType | null) => {
    if (!patternType) return;
    const pattern = getPatternDataWithDefaultAgentGroup(patternType);
    updateFormData("pattern", pattern);
  };

  // 스텝 유효성 검사
  const validateStep = (step: StepType): boolean => {
    const errorMessage = createFormValidator[step](formData);
    if (errorMessage) {
      errorToast(errorMessage);
      return false;
    }
    return true;
  };

  const handleNext = () => {
    const isValid = validateStep(currentStep);
    if (!isValid) return;
    setCurrentStep((prev) => (currentStep < 4 ? ((prev + 1) as StepType) : prev));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => (currentStep > 1 ? ((prev - 1) as StepType) : prev));
  };

  const handleSubmit = async () => {
    const isValid = validateStep(4);
    if (!isValid) return;
    onSubmit(formData);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 진행 단계 표시 */}
      <Stepper activeStep={currentStep - 1} steps={STEPS} />

      {/* 현재 단계 설명 */}
      <InfoBox title={stepInfo.title} description={stepInfo.description} />

      {/* 생성폼 */}
      <form>
        {currentStep === 1 && (
          <Step1Content
            name={formData.name}
            description={formData.description}
            mecId={formData.mecId}
            mecList={mecList}
            onFormDataChange={updateFormData}
          />
        )}
        {currentStep === 2 && (
          <Step2Content patternType={formData.pattern?.type ?? null} onSelectPatternType={handlePatternSelect} />
        )}
        {currentStep === 3 && (
          <Step3Content
            pattern={formData.pattern}
            onChangePattern={(pattern) => {
              updateFormData("pattern", pattern);
            }}
            templateList={templateList}
          />
        )}
        {currentStep === 4 && <Step4Content formData={formData} mecList={mecList} templateList={templateList} />}

        {/* 단계 이동 버튼 */}
        <NavigationButtons
          isFirstStep={currentStep === 1}
          isLastStep={currentStep === 4}
          onPrevClick={handlePrev}
          onNextClick={handleNext}
          onCompleteClick={handleSubmit}
          disableCompleteButton={disableSubmitButton}
          submitButtonText={submitButtonText}
        />
      </form>
    </div>
  );
}

const defaultFormData: SimulationFormData = {
  name: "",
  description: "",
  mecId: null,
  pattern: null,
};
