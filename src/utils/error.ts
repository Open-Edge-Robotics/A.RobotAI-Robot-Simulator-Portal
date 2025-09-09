import type { Query } from "@tanstack/react-query";
import axios from "axios";

import type { APIError } from "@/types/api";

import { errorToast } from "./toast";

export const isAPIError = (obj: unknown): obj is APIError => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof (obj as APIError).statusCode === "number" &&
    typeof (obj as APIError).message === "string"
  );
};

export const handleMutationError = (error: Error) => {
  if (axios.isAxiosError(error)) {
    const apiError = error.response?.data;

    if (isAPIError(apiError)) {
      // 백엔드에서 정의한 에러 응답 구조
      errorToast(apiError.message);
    } else {
      // 예상밖의 에러
      const statusCode = error.response?.status;

      if (statusCode && statusCode >= 500) {
        errorToast("서버에서 알 수 없는 오류가 발생했습니다.");
      } else {
        errorToast(`알 수 없는 오류가 발생했습니다. (${statusCode || "Unknown"})`);
      }
    }
  } else if (error instanceof Error) {
    // 일반 JavaScript Error
    errorToast(error.message);
  } else {
    // Network error 등 기타 에러
    errorToast("네트워크 오류가 발생했습니다.");
  }
  console.error(error);
};

export const handleQueryError = (error: Error, query: Query<unknown, unknown, unknown, readonly unknown[]>) => {
  // 캐시에 데이터가 있으면 백그라운드 업데이트가 실패했음을 나타내기 위해 에러 토스트를 보여준다.
  if (query.state.data !== undefined) {
    errorToast("정보를 업데이트하지 못했습니다.");
    console.error(error);
  }
};
