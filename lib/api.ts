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
        // Auto-clear expired / invalid tokens on 401
        if (error.response?.status === 401 && typeof window !== "undefined") {
            try {
                localStorage.removeItem("jwt-token");
                localStorage.removeItem("user-email");
            } catch { /* private browsing */ }
        }
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

    resetPassword: (payload: { email: string; password: string }) =>
        apiClient.post<string>("/auth/reset-password", payload, {
            transformResponse: [(data: string) => data],
        }),
};

export const contactApi = {
    sendMessage: (payload: { name: string; email: string; message: string }) =>
        apiClient.post("/contact", payload),
};
