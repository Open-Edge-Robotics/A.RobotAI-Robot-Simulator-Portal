import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const AXIOS_TIMEOUT = 10 * 1000;

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  // withCredentials: true,
  timeout: AXIOS_TIMEOUT,
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error: AxiosError) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => Promise.reject(error),
);

export const apiGet = <T>(...args: Parameters<typeof instance.get>) =>
  instance.get<T, AxiosResponse<T>>(...args);

export const apiPost = <T>(...args: Parameters<typeof instance.post>) =>
  instance.post<T, AxiosResponse<T>>(...args);

export const apiPut = <T>(...args: Parameters<typeof instance.put>) =>
  instance.put<T, AxiosResponse<T>>(...args);

export const apiPatch = <T>(...args: Parameters<typeof instance.patch>) =>
  instance.patch<T, AxiosResponse<T>>(...args);

export const apiDelete = <T>(...args: Parameters<typeof instance.delete>) =>
  instance.delete<T, AxiosResponse<T>>(...args);
