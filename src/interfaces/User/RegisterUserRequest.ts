export interface RegisterUserRequest {
    name: string;
    phone: string;
    email: string;
    email_verified?: boolean;
    verification_token: number;
    verification_token_time: Date;
    password: string;
    type: string;
    status: string;
}