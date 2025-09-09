// API 응답 타입
export interface APIResponse<T = unknown> {
  status: "success";
  message?: string;
  data: T;
}

// 에러 응답 타입
export interface APIError {
  statusCode: number;
  message: string;
  data?: null;
}
