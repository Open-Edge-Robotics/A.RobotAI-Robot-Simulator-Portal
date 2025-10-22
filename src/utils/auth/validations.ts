import type { LoginFormData, SignupFormData } from "@/types/auth/domain";
import type { ValidationResult } from "@/types/common";

// 이메일 정규식 (RFC 5322 기반 간소화 버전)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 숫자 포함 여부 정규식
const HAS_NUMBER_REGEX = /\d/;

// 공백 포함 여부 정규식
const HAS_WHITESPACE_REGEX = /\s/;

// 이메일 필드 검사 헬퍼 함수
const validateEmailField = (value: string): string | null => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "이메일을 입력해주세요.";
  }

  if (trimmedValue.length < 5 || trimmedValue.length > 254) {
    return "이메일은 5~254자 사이여야 합니다.";
  }

  if (!EMAIL_REGEX.test(trimmedValue)) {
    return "올바른 이메일 형식이 아닙니다.";
  }

  return null;
};

// 비밀번호 필드 검사 헬퍼 함수
const validatePasswordField = (value: string): string | null => {
  if (!value) {
    return "비밀번호를 입력해주세요.";
  }

  // 공백 체크
  if (HAS_WHITESPACE_REGEX.test(value)) {
    return "비밀번호에 공백을 포함할 수 없습니다.";
  }

  // 길이 체크
  if (value.length < 8 || value.length > 32) {
    return "비밀번호는 8~32자 사이여야 합니다.";
  }

  // 숫자 포함 여부 체크
  if (!HAS_NUMBER_REGEX.test(value)) {
    return "비밀번호는 숫자를 하나 이상 포함해야 합니다.";
  }

  return null;
};

// 비밀번호 확인 필드 검사 헬퍼 함수
const validatePasswordConfirmField = (value: string, password: string): string | null => {
  if (!value) {
    return "비밀번호 확인을 입력해주세요.";
  }

  if (value !== password) {
    return "비밀번호가 일치하지 않습니다.";
  }

  return null;
};

export const validateSignupForm = (formData: SignupFormData): ValidationResult => {
  // 검사 규칙 정의
  const validations = [
    () => validateEmailField(formData.email),
    () => validatePasswordField(formData.password),
    () => validatePasswordConfirmField(formData.passwordConfirm, formData.password),
  ];

  // 첫 번째 에러 발견 시 즉시 반환
  for (const validate of validations) {
    const error = validate();
    if (error) {
      return { isValid: false, error };
    }
  }

  return { isValid: true };
};

export const validateLoginForm = (formData: LoginFormData): ValidationResult => {
  // 검사 규칙 정의
  const validations = [() => validateEmailField(formData.email), () => validatePasswordField(formData.password)];

  // 첫 번째 에러 발견 시 즉시 반환
  for (const validate of validations) {
    const error = validate();
    if (error) {
      return { isValid: false, error };
    }
  }

  return { isValid: true };
};
