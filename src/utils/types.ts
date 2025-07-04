import { Goal, ActivityLevel, Session, User, Sex, ServingUnit, Food } from '@/generated/prisma'
import { NutritionixFood } from '@/lib/nutritionix/types'

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

/*
 * Create Custom Food
 */
export interface CreateCustomFoodRequest extends APIRequest {
    name: string
    brand: string
    servingSize: number
    servingUnit: ServingUnit
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
}

export interface CreateCustomFoodResponse extends APIResponse {
    food: Food
}

/*
 * Search with Nutritionix
 */
export interface NutritionixSearchRequest extends APIRequest {
    query: string
    branded?: boolean
    common?: boolean
    brandIds?: string[]
    brandedType?: string
    brandedRegion?: string
    brandedFoodNameOnly?: boolean
    commonGeneral?: boolean
    commonGrocery?: boolean
    commonRestaurant?: boolean
    claim?: boolean
    claimsQuery?: string
    taxonomy?: string
    taxonomyNodeId?: string
}

export interface NutritionixSearchResponse extends APIResponse {
    branded?: NutritionixFood[]
    common?: NutritionixFood[]
    local?: NutritionixFood[]
}

/*
 * Get Nutrients from Nutritionix
 */
export interface NutritionixNutrientsRequest extends APIRequest {
    query: string,
    num_servings?: number,
    aggregate?: string,
    line_delimited?: boolean,
    use_raw_foods?: boolean,
    include_subrecipe?: boolean,
    timezone?: string,
    consumed_at?: string,
    use_branded_foods?: boolean,
    taxonomy?: boolean,
    ingredient_statement?: boolean,
    last_modified?: boolean,
}

export interface NutritionixNutrientsResponse extends APIResponse {
    foods: NutritionixFood[]
}