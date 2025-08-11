import type { SimulatioFormData, StepType } from "./types";

const validateStep1 = (formData: SimulatioFormData) => {
  if (formData.name.trim() === "") {
    return "시뮬레이션 이름을 입력해주세요.";
  }
  if (!formData.mec) {
    return "MEC를 선택해주세요.";
  }
};

const validateStep2 = (formData: SimulatioFormData) => {
  if (formData.pattern === null) {
    return "실행 패턴을 선택해주세요.";
  }
};

const validateStep3 = (formData: SimulatioFormData) => {
  if (formData) return "";
};
const validateStep4 = () => {
  return "";
};

export const validator: {
  [K in StepType]: (formData: SimulatioFormData) => string | undefined;
} = {
  1: validateStep1,
  2: validateStep2,
  3: validateStep3,
  4: validateStep4,
};
