import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "innogrid-ui";

import type { TemplateFormData } from "@/types/template/domain";

import { validateTemplateForm } from "@/utils/template/validation";
import { errorToast } from "@/utils/toast";

import BasicInformationSection from "./BasicInformationSection";
import FileSection from "./FileSection";

interface TemplateFormProps {
  disableSubmitButton: boolean;
  onSubmit: (data: TemplateFormData) => void;
}

export default function TemplateForm({ disableSubmitButton, onSubmit }: TemplateFormProps) {
  const [formData, setFormData] = useState<TemplateFormData>(defaultFormData);
  const navigate = useNavigate();

  const updateFormData = <K extends keyof TemplateFormData>(field: K, value: TemplateFormData[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    const isConfirmed = confirm("정말로 취소하시겠습니까? 작성 중인 내용은 저장되지 않습니다.");
    if (isConfirmed) {
      navigate(-1);
    }
  };

  const handleSubmit = () => {
    const validation = validateTemplateForm(formData);
    if (!validation.isValid) {
      errorToast(validation.error);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form>
      <div className="space-y-6">
        <BasicInformationSection formData={formData} onFormDataChange={updateFormData} />
        <FileSection formData={formData} onFormDataChange={updateFormData} />
      </div>
      <ActionButtons submitDisabled={disableSubmitButton} onCancel={handleCancel} onSubmit={handleSubmit} />
    </form>
  );
}

const defaultFormData: TemplateFormData = {
  name: "",
  description: "",
  type: "",
  topics: [],
  files: {
    metadata: null,
    database: null,
  },
};

interface ActionButtonsProps {
  submitDisabled: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

function ActionButtons({ submitDisabled, onCancel, onSubmit }: ActionButtonsProps) {
  return (
    <div className="mt-6 flex justify-end gap-3">
      <Button onClick={onCancel} color="secondary" size="large" type="button">
        취소
      </Button>

      <Button disabled={submitDisabled} onClick={onSubmit} size="large" type="button">
        템플릿 생성
      </Button>
    </div>
  );
}
