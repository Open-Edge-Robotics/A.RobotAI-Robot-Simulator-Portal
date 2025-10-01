import { useState } from "react";
import { Link } from "react-router-dom";

import { Button, Input, Select } from "innogrid-ui";

import Container from "@/components/common/Container.tsx";
import Fieldset from "@/components/common/Fieldset";
import Label from "@/components/common/Label";
import Title from "@/components/common/Title";

import { SEGMENTS } from "@/constants/navigation";

import { useSignup } from "@/hooks/auth/useSignup";

import type { SignupFormData, UserRole } from "@/types/auth/domain";

import { validateSignupForm } from "@/utils/auth/validations";
import { errorToast } from "@/utils/common/toast";

const SIGNUP_DEFAULT_DATA: SignupFormData = {
  email: "",
  password: "",
  passwordConfirm: "",
  role: "general",
};

export default function SignupPage() {
  const [formData, setFormData] = useState<SignupFormData>(SIGNUP_DEFAULT_DATA);
  const { mutate: signup, isPending } = useSignup();

  const handleChange = (field: keyof SignupFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const validation = validateSignupForm(formData);
    if (!validation.isValid) {
      errorToast(validation.error);
      return;
    }
    signup(formData);
  };

  return (
    <div className="bg-gray-10 h-full">
      <form className="mx-auto flex w-fit flex-col gap-6 p-6">
        <Title title="회원가입" />
        <Container shadow borderColor="border-none" className="w-[600px] gap-6 p-6">
          <EmailFieldset value={formData.email} onChange={(value) => handleChange("email", value)} />
          <PasswordFieldset value={formData.password} onChange={(value) => handleChange("password", value)} />
          <PasswordConfirmFieldset
            value={formData.passwordConfirm}
            onChange={(value) => handleChange("passwordConfirm", value)}
          />
          <RoleFieldset role={formData.role} onChange={(value) => handleChange("role", value)} />
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            disabled={isPending}
          >
            가입하기
          </Button>
          <HasAccountGuide />
        </Container>
      </form>
    </div>
  );
}

function EmailFieldset({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <Fieldset>
      <Label label="이메일" required />
      <Input
        type="email"
        value={value}
        placeholder="이메일을 입력하세요"
        size={{ width: "100%", height: "40px" }}
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="mt-1 ml-1 text-xs text-gray-500">5~254자의 고유한 이메일이어야 합니다.</p>
    </Fieldset>
  );
}

function PasswordFieldset({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <Fieldset>
      <Label label="비밀번호" required />
      <Input
        type="password"
        value={value}
        placeholder="비밀번호를 입력하세요"
        size={{ width: "100%", height: "40px" }}
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="mt-1 ml-1 text-xs text-gray-500">숫자를 하나 이상 포함한 공백 제외 8~32자의 값이어야 합니다.</p>
    </Fieldset>
  );
}

function PasswordConfirmFieldset({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <Fieldset>
      <Label label="비밀번호 확인" required />
      <Input
        type="password"
        value={value}
        placeholder="비밀번호를 다시 입력하세요"
        size={{ width: "100%", height: "40px" }}
        onChange={(e) => onChange(e.target.value)}
      />
    </Fieldset>
  );
}

function HasAccountGuide() {
  return (
    <p className="mx-auto text-sm text-gray-600">
      이미 계정이 있으신가요?
      <Link to={SEGMENTS.absolute.login} className="ml-1 font-medium text-blue-600 hover:text-blue-700 hover:underline">
        로그인
      </Link>
    </p>
  );
}

function RoleFieldset({ role, onChange }: { role: UserRole; onChange: (value: UserRole) => void }) {
  return (
    <Fieldset className="mb-4">
      <Label label="사용자 유형 선택" required />
      <div className="w-fit rounded-sm bg-white">
        <Select
          options={ROLE_OPTIONS}
          value={ROLE_OPTIONS.find((option) => option.value === role) || null}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value}
          size="l-medium"
          onChange={(option) => onChange(option?.value || "general")}
        />
      </div>
    </Fieldset>
  );
}

const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: "master", label: "관리자" },
  { value: "general", label: "일반 사용자" },
];
