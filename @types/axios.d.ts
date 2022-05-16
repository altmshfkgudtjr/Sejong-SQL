import 'axios';

declare module 'axios' {
  interface DefaultResponse<T = any> {
    msg: string;
    result?: T;
  }

  export interface AxiosInstance {
    request<T>(config: AxiosRequestConfig): Promise<DefaultResponse<T>>;
    get<T>(url: string, config?: AxiosRequestConfig): Promise<DefaultResponse<T>>;
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<DefaultResponse<T>>;
    head<T>(url: string, config?: AxiosRequestConfig): Promise<DefaultResponse<T>>;
    post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<DefaultResponse<T>>;
    put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<DefaultResponse<T>>;
    patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<DefaultResponse<T>>;
  }
}
