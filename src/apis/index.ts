import axios, { type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";

import { API_BASE_URL, API_DEFAULT_TIMEOUT, ENDPOINTS } from "@/constants/api";

import type { APIResponse } from "@/types/api";

import { clearAuthData, getAccessToken, updateAccessToken } from "@/utils/auth/storage";

type Url = string;

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: API_BASE_URL.dev,
  timeout: API_DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키를 포함한 요청을 위해 설정
});

// 요청 인터셉터: Access Token 자동 추가
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터: 401 에러 시 토큰 갱신
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401이나 403 에러이고, 재시도하지 않은 요청인 경우
    if ([401, 403].includes(error.response?.status) && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh Token으로 새 Access Token 요청
        const response = await axios.post<APIResponse<{ accessToken: string }>>(
          `${API_BASE_URL.dev}${ENDPOINTS.auth}/refresh`,
          {},
          { withCredentials: true },
        );

        const { accessToken } = response.data.data;

        // 새 토큰 저장
        updateAccessToken(accessToken);

        // 원래 요청에 새 토큰 적용
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // 원래 요청 재시도
        return instance(originalRequest);
      } catch (refreshError) {
        // Refresh Token도 만료된 경우 로그아웃 처리
        clearAuthData();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

// GET 요청 함수
const getApi = async <T = unknown>(url: Url, config?: AxiosRequestConfig): Promise<APIResponse<T>> => {
  const response = await instance.get<APIResponse<T>>(url, config);
  return response.data;
};

// POST 요청 함수
const postApi = async <T = unknown, D = unknown>(
  url: Url,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<APIResponse<T>> => {
  const response = await instance.post<APIResponse<T>>(url, data, config);
  return response.data;
};

// 파일 업로드용 POST 함수
const postFormDataApi = async <T = unknown>(
  url: Url,
  formData: FormData,
  config?: AxiosRequestConfig,
): Promise<APIResponse<T>> => {
  const response = await instance.post<APIResponse<T>>(url, formData, {
    ...config,
    headers: {
      "Content-Type": "multipart/form-data",
      ...config?.headers,
    },
  });
  return response.data;
};

// PUT 요청 함수
const putApi = async <T = unknown, D = unknown>(
  url: Url,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<APIResponse<T>> => {
  const response = await instance.put<APIResponse<T>>(url, data, config);
  return response.data;
};

// PATCH 요청 함수
const patchApi = async <T = unknown, D = unknown>(
  url: Url,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<APIResponse<T>> => {
  const response = await instance.patch<APIResponse<T>>(url, data, config);
  return response.data;
};

// 파일 업로드용 PATCH 함수
const patchFormDataApi = async <T = unknown>(
  url: Url,
  formData: FormData,
  config?: AxiosRequestConfig,
): Promise<APIResponse<T>> => {
  const response = await instance.patch<APIResponse<T>>(url, formData, {
    ...config,
    headers: {
      "Content-Type": "multipart/form-data",
      ...config?.headers,
    },
  });
  return response.data;
};

// DELETE 요청 함수
const deleteApi = async <T = unknown, D = unknown>(
  url: Url,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<APIResponse<T>> => {
  const response = await instance.delete<APIResponse<T>>(url, { ...config, data });
  return response.data;
};

export const apiClient = {
  getApi,
  postApi,
  postFormDataApi,
  putApi,
  patchApi,
  patchFormDataApi,
  deleteApi,
};
