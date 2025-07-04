import { Goal, ActivityLevel, Session, User, Sex } from '@/generated/prisma'

export enum ErrorCode {
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    EMAIL_IN_USE = 'EMAIL_IN_USE',
    MISSING_ID = 'MISSING_ID',
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

    // TODO: some of these are not required for signup, move to post-signup flow
    age: number
    sex: Sex
    weight: number
    height: number
    activityLevel: ActivityLevel
    goal: Goal
}

export interface SignUpResponse extends APIResponse {
    user: User
}

/*
 * Sign Out
 */
export interface SignOutResponse extends APIResponse {}


/*
 * Get Current User
 */
export interface GetCurrentUserResponse extends APIResponse {
    session: Session,
    user: User
}

/*
 * Update User
 */
export interface UpdateUserRequest extends APIRequest {
    id: string
    name?: string
    email?: string
    age?: number
    sex?: Sex
    weight?: number
    height?: number
    activityLevel?: ActivityLevel
    goal?: Goal
}

export interface UpdateUserResponse extends APIResponse {
    user: User
}