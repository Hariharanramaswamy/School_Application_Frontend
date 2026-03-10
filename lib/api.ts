import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export const apiClient = axios.create({
    baseURL: API_BASE,
    headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        try {
            const token = localStorage.getItem("jwt-token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch {
            /* private browsing */
        }
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error.response?.data ||
            error.message ||
            "An unexpected error occurred";
        return Promise.reject(new Error(typeof message === "string" ? message : JSON.stringify(message)));
    }
);

export const authApi = {
    login: (payload: { email: string; password: string }) =>
        apiClient.post<string>("/auth/login", payload, {
            transformResponse: [(data: string) => data],
        }),

    register: (payload: { email: string; password: string }) =>
        apiClient.post<string>("/auth/register", payload, {
            transformResponse: [(data: string) => data],
        }),
};
