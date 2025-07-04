import { Session, User } from '@/generated/prisma'

export enum ErrorCode {
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    EMAIL_IN_USE = 'EMAIL_IN_USE',
    MISSING_REQUIRED_FIELDS = 'MISSING_REQUIRED_FIELDS',
    INVALID_SESSION = 'INVALID_SESSION',
    EXPIRED_SESSION = 'EXPIRED_SESSION',
    UNKNOWN = 'UNKNOWN',
}

export interface APIRequest {}

export interface APIResponse {
    error?: {
        code: ErrorCode
        message?: string
    },
    success?: boolean
}

/*
 * Get Session
 */
export interface GetSessionResponse extends APIResponse {
    session: Session,
    user: User
}

/*
 * Sign In
 */
export interface SignInRequest extends APIRequest{
    email: string
    password: string
}

export interface SignInResponse extends APIResponse {
    user: User
}

/*
 * Sign Up
 */
export interface SignUpRequest extends APIRequest {
    name: string
    email: string
    password: string
}

export interface SignUpResponse extends APIResponse {
    user: User
}

/*
 * Sign Out
 */
export interface SignOutResponse extends APIResponse {}
