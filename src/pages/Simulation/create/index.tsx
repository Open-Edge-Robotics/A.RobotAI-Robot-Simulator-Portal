import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "innogrid-ui";

import { simulationAPI } from "@/apis/simulation/index.ts";
import type { CreateSimulationRequest } from "@/apis/simulation/types.ts";
import Stepper from "@/components/common/Stepper";

import { STEPS } from "../constants";
import type { SimulationFormData, StepType } from "../types";
import { getCurrentStepInfo, getPatternDataWithDefaultAgentGroup, transformFormDataToRequest } from "../utils.ts";
import { createFormValidator } from "../validation";

import Title from "./Header";
import InfoBox from "./InfoBox";
import NavigationButtons from "./NavigationButtons";
import Step1Content from "./StepFormContent/Step1Content";
import Step2Content from "./StepFormContent/Step2Content";
import Step3Content from "./StepFormContent/Step3Content";
import Step4Content from "./StepFormContent/Step4Content";

const defaultFormData: SimulationFormData = {
  name: "",
  description: "",
  mec: null,
  pattern: null,
};

export default function SimulationCreatePage() {
  const [currentStep, setCurrentStep] = useState<StepType>(1);
  const [formData, setFormData] = useState<SimulationFormData>(defaultFormData);
  const stepInfo = getCurrentStepInfo(currentStep, formData.pattern?.type ?? null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: createSimulation,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (newSimulation: CreateSimulationRequest) => {
      return simulationAPI.createSimulation(newSimulation);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["simulation"] });
      // TODO: 토스트 전역으로 띄우고 컴펌 없이 바로 이동하도록 변경
      if (confirm("시뮬레이션 생성이 완료되었습니다.")) {
        navigate("/simulation");
      }
    },
    // TODO: 에러 처리
    onError: (e: { response: object }) => {
      alert("error");
      console.log(e.response);
    },
  });

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

    const newSimulation = transformFormDataToRequest(formData);
    createSimulation(newSimulation);
  };

  return (
    <>
      <div className="bg-gray-10 flex h-full flex-col gap-6 p-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <Title title="시뮬레이션 생성" />
          <SimulationListButton />
        </div>

        {/* 생성 단계 Stepper */}
        <Stepper activeStep={currentStep - 1} steps={STEPS} />

        {/* 현재 단계 설명 */}
        <InfoBox title={stepInfo.title} description={stepInfo.description} />

        {/* 생성폼 */}
        <form>
          {currentStep === 1 && (
            <Step1Content
              name={formData.name}
              descirption={formData.description}
              mec={formData.mec}
              onChangeFormData={updateFormData}
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
            />
          )}
          {currentStep === 4 && <Step4Content formData={formData} />}

          {/* 단계 이동 버튼 */}
          <NavigationButtons
            isFirstStep={currentStep === 1}
            isLastStep={currentStep === 4}
            onPrevClick={handlePrev}
            onNextClick={handleNext}
            onCompleteClick={handleSubmit}
            disableCompleteButton={isPending || isSuccess}
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

function SimulationListButton() {
  return (
    <Link to="/simulation">
      <Button size="large">시뮬레이션 목록</Button>
    </Link>
  );
}
