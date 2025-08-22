import { useState } from "react";

import Stepper from "@/components/common/Stepper";

import { STEPS } from "../constants";
import InfoBox from "../create/InfoBox";
import NavigationButtons from "../create/NavigationButtons";
import Step1Content from "../create/StepFormContent/Step1Content";
import Step2Content from "../create/StepFormContent/Step2Content";
import Step3Content from "../create/StepFormContent/Step3Content";
import Step4Content from "../create/StepFormContent/Step4Content";
import type { Mec, SimulationFormData, StepType, Template } from "../types";
import { getCurrentStepInfo, getPatternDataWithDefaultAgentGroup } from "../utils.ts";
import { createFormValidator } from "../validation";

interface SimulationFormProps {
  initialData: SimulationFormData;
  mecList: Mec[];
  templateList: Template[];
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
  const [formData, setFormData] = useState<SimulationFormData>(initialData);
  const stepInfo = getCurrentStepInfo(currentStep, formData.pattern?.type ?? null);

  const updateFormData = <K extends keyof SimulationFormData>(field: K, value: SimulationFormData[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateStep = (step: StepType): boolean => {
    const errorMessage = createFormValidator[step](formData);
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
      {/* 생성 단계 Stepper */}
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
          <Step2Content
            patternType={formData.pattern?.type ?? null}
            onSelectPatternType={(patternType) => {
              if (!patternType) return;
              const pattern = getPatternDataWithDefaultAgentGroup(patternType);
              updateFormData("pattern", pattern);
            }}
          />
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
