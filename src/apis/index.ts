import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

import { API_DEFAULT_TIMEOUT } from "@/constants/api";
import type { APIResponse } from "@/types/api";

type Url = string;

interface CreateClientOptions {
  baseURL: string;
  headers: Record<string, string>;
  timeout: number;
  enableAuth: boolean; // 인증 인터셉터 활성화 여부
}

interface Client {
  get<T = unknown>(url: Url, config?: AxiosRequestConfig): Promise<APIResponse<T>>;
  post<T = unknown, D = unknown>(url: Url, data?: D, config?: AxiosRequestConfig): Promise<APIResponse<T>>;
  put<T = unknown, D = unknown>(url: Url, data?: D, config?: AxiosRequestConfig): Promise<APIResponse<T>>;
  patch<T = unknown, D = unknown>(url: Url, data?: D, config?: AxiosRequestConfig): Promise<APIResponse<T>>;
  delete<T = unknown>(url: Url, config?: AxiosRequestConfig): Promise<APIResponse<T>>;
  postFormData<T = unknown>(url: Url, formData: FormData, config?: AxiosRequestConfig): Promise<APIResponse<T>>;
}

export const createClient = (options: Partial<CreateClientOptions> = {}): Client => {
  // Axios 인스턴스 생성
  const apiClient: AxiosInstance = axios.create({
    baseURL: options.baseURL ?? "",
    timeout: options.timeout ?? API_DEFAULT_TIMEOUT,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  // 인터셉터 설정
  //   setupInterceptors(apiClient, options.enableAuth ?? true);

  // GET 요청 함수
  const _get = async <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> => {
    const response = await apiClient.get<APIResponse<T>>(url, config);
    return response.data;
  };

  // POST 요청 함수
  const _post = async <T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<APIResponse<T>> => {
    const response = await apiClient.post<APIResponse<T>>(url, data, config);
    return response.data;
  };

  // 파일 업로드용 POST 함수
  const _postFormData = async <T = unknown>(
    url: string,
    formData: FormData,
    config?: AxiosRequestConfig,
  ): Promise<APIResponse<T>> => {
    const response = await apiClient.post<APIResponse<T>>(url, formData, {
      ...config,
      headers: {
        "Content-Type": "multipart/form-data",
        ...config?.headers,
      },
    });
    return response.data;
  };

  // PUT 요청 함수
  const _put = async <T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<APIResponse<T>> => {
    const response = await apiClient.put<APIResponse<T>>(url, data, config);
    return response.data;
  };

  // PATCH 요청 함수
  const _patch = async <T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<APIResponse<T>> => {
    const response = await apiClient.patch<APIResponse<T>>(url, data, config);
    return response.data;
  };

  // DELETE 요청 함수
  const _delete = async <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> => {
    const response = await apiClient.delete<APIResponse<T>>(url, config);
    return response.data;
  };

  return {
    get: _get,
    post: _post,
    postFormData: _postFormData,
    put: _put,
    patch: _patch,
    delete: _delete,
  };
};
