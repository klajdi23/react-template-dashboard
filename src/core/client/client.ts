import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import environment from "../environment";
import { localStore } from "../localStorage/localStorage";
import { LocalStoreKeys } from "../localStorage/localStorageUtils";

export interface IClient {
    get<T>(url: string, params?: Record<string, any>): Promise<T>;
    post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T>;
    put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T>;
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    patch<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T>;
}

class Client implements IClient {
    private readonly apiEndpoint: string;

    private axiosInstance: AxiosInstance;

    constructor(apiEndpoint: string = environment.apiEndpoint) {
        this.apiEndpoint = apiEndpoint;
        this.axiosInstance = this.createAxiosInstance();
    }

    // Create axios instance add dynamically interceptors
    private createAxiosInstance(): AxiosInstance {
        const instance = axios.create({
            baseURL: this.apiEndpoint,
            headers: this.getHeaders(),
        });

        // Add interceptors to dynamically set headers or handle global errors
        instance.interceptors.request.use((config) => {
            const token = localStore.get(LocalStoreKeys.AUTH_TOKEN);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
                config.headers['access-token'] = `${localStore.get(LocalStoreKeys.ACCESS_TOKEN)}`
            }
            return config;
        });

        instance.interceptors.response.use(
            (response) => response,
            (error) => {
                // Handle global errors like logging out on 401
                if (error.response?.status === 401) {
                    console.error("Unauthorized access - redirecting to login.");
                    // Redirect logic or token refresh can go here
                }
                return Promise.reject(error);
            }
        );

        return instance;
    }

    // default headers
    private getHeaders(): Record<string, string> {
        return {
            "Content-Type": "application/json",
            "api-version": "1.0",
        };
    }

    // handler error
    private handleError(error: any): never {
        const message = error.response?.data?.message || "An unexpected error occurred";
        console.error("HTTP Error:", message);
        throw error.response || error;
    }

    async get<T>(url: string, params?: Record<string, any>): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.get(url, { params });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async patch<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.patch(url, data, config);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }
}

const client = new Client();

export default client;
