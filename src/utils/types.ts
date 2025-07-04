import { User } from '../generated/prisma'

export enum ErrorCode {
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    EMAIL_IN_USE = 'EMAIL_IN_USE',
    MISSING_REQUIRED_FIELDS = 'MISSING_REQUIRED_FIELDS',
}

export interface APIRequest {}

export interface APIResponse {
    error?: {
        code: ErrorCode
        message?: string
    }
}

export interface SignUpRequest extends APIRequest {
    name: string
    email: string
    password: string
}

export interface SignUpResponse extends APIResponse {
    user: User
}

export interface SignInRequest extends APIRequest{
    email: string
    password: string
}

export interface SignInResponse extends APIResponse {
    user: User
}