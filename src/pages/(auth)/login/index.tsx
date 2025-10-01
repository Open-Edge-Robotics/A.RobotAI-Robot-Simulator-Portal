import { useState } from "react";
import { Link } from "react-router-dom";

import { Button, Input } from "innogrid-ui";

import Container from "@/components/common/Container.tsx";
import Fieldset from "@/components/common/Fieldset";
import Label from "@/components/common/Label";
import Title from "@/components/common/Title";

import { SEGMENTS } from "@/constants/navigation";

import { useLogin } from "@/hooks/auth/useLogin";

import type { LoginFormData } from "@/types/auth/domain";

import { validateLoginForm } from "@/utils/auth/validations";
import { errorToast } from "@/utils/common/toast";

const LOGIN_DEFAULT_DATA: LoginFormData = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>(LOGIN_DEFAULT_DATA);
  const { mutate: login, isPending } = useLogin();

  const handleChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const validation = validateLoginForm(formData);
    if (!validation.isValid) {
      errorToast(validation.error);
      return;
    }
    login(formData);
  };

  return (
    <div className="bg-gray-10 h-full">
      <form className="mx-auto flex w-fit flex-col gap-6 p-6">
        <Title title="로그인" />
        <Container shadow borderColor="border-none" className="w-[600px] gap-6 p-6">
          <EmailFieldset value={formData.email} onChange={(value) => handleChange("email", value)} />
          <PasswordFieldset value={formData.password} onChange={(value) => handleChange("password", value)} />
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            disabled={isPending}
          >
            로그인
          </Button>
          <NoAccountGuide />
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
    </Fieldset>
  );
}

function NoAccountGuide() {
  return (
    <p className="mx-auto text-sm text-gray-600">
      계정이 없으신가요?
      <Link
        to={SEGMENTS.absolute.signup}
        className="ml-1 font-medium text-blue-600 hover:text-blue-700 hover:underline"
      >
        회원가입
      </Link>
    </p>
  );
}
