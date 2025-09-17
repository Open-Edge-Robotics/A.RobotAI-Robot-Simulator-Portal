import axios, { type AxiosRequestConfig } from "axios";

import { API_BASE_URL, API_DEFAULT_TIMEOUT } from "@/constants/api";

import type { APIResponse } from "@/types/api";

type Url = string;

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: API_BASE_URL.dev,
  timeout: API_DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

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
  deleteApi,
};
