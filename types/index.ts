export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ResetPasswordPayload {
    password: string;
    confirmPassword: string;
}

export interface RegisterFormData {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ApiError {
    message: string;
}

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}
