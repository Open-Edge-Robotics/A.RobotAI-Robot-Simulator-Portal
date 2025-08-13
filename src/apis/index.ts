// apis/index.ts
import axios, { type AxiosRequestConfig } from "axios";

import { API_BASE_URL, API_TIMEOUT } from "./constants";
import type { APIResponse } from "./types";

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL.LOCAL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
// apiClient.interceptors.request.use(
//   (config) => {
//     // 인증 토큰 자동 추가
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// 응답 인터셉터
// apiClient.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response;
//   },
//   (error: AxiosError) => {
//     // 공통 에러 처리
//     if (error.response?.status === 401) {
//       // 인증 에러 - 토큰 제거 후 로그인 페이지로 리다이렉트
//       localStorage.removeItem("authToken");
//       window.location.href = "/login";
//     }

//     // 에러 객체 표준화 - TanStack Query가 자동으로 캐치
//     const apiError: APIError = {
//       message:
//         error.response?.data?.message || error.message || "An error occurred",
//       status: error.response?.status,
//       code: error.code,
//     };

//     return Promise.reject(apiError);
//   },
// );

// GET 요청 함수
const getRequest = async <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> => {
  const response = await apiClient.get<APIResponse<T>>(url, config);
  return response.data;
};

// POST 요청 함수
const postRequest = async <T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<APIResponse<T>> => {
  const response = await apiClient.post<APIResponse<T>>(url, data, config);
  return response.data;
};

// PUT 요청 함수
const putRequest = async <T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<APIResponse<T>> => {
  const response = await apiClient.put<APIResponse<T>>(url, data, config);
  return response.data;
};

// DELETE 요청 함수
const deleteRequest = async <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> => {
  const response = await apiClient.delete<APIResponse<T>>(url, config);
  return response.data;
};

// PATCH 요청 함수
const patchRequest = async <T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<APIResponse<T>> => {
  const response = await apiClient.patch<APIResponse<T>>(url, data, config);
  return response.data;
};

// 파일 업로드용 POST 함수
// export const postFormDataRequest = async <T = unknown>(
//   url: string,
//   formData: FormData,
//   config?: AxiosRequestConfig,
// ): Promise<T> => {
//   const response = await apiClient.post<APIResponse<T>>(url, formData, {
//     ...config,
//     headers: {
//       "Content-Type": "multipart/form-data",
//       ...config?.headers,
//     },
//   });
//   return response.data.data || response.data;
// };

// 인증 토큰 설정 함수
// export const setAuthToken = (token: string) => {
//   localStorage.setItem("authToken", token);
//   apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// };

// 인증 토큰 제거 함수
// export const removeAuthToken = () => {
//   localStorage.removeItem("authToken");
//   delete apiClient.defaults.headers.common["Authorization"];
// };

// Axios 인스턴스 직접 접근 (고급 사용자용)
// export { apiClient };

export default {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  patchRequest,
  //   postFormData: postFormDataRequest,
};
