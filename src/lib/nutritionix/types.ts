export interface NutritionixFood {
    food_name: string,
    brand_name: string,
    serving_qty: number,
    serving_unit: string,
    serving_weight_grams: number,
    nf_calories: number,
    nf_total_fat: number,
    nf_saturated_fat: number,
    nf_cholesterol: number,
    nf_sodium: number,
    nf_total_carbohydrate: number,
    nf_dietary_fiber: number,
    nf_sugars: number,
    nf_protein: number,
    nf_potassium: number,
    nf_p: number,
    full_nutrients: NutritionixNutrient[],
    nix_brand_name: string,
    nix_brand_id: string,
    nix_item_name: string,
    nix_item_id: string,
    upc: string,
    metadata: NutritionixMetadata,
    source: number,
    ndb_no: number,
    tags: NutritionixTag[],
    alt_measures: NutritionixAltMeasure[],
    lat: number,
    lng: number,
    meal_type: NutritionixMealType,
    photo: NutritionixPhoto,
    sub_recipe: string,
    class_code: string,
    brick_code: string,
    tag_id: string,
    tag_name: string,
    locale: string,
    local: boolean,
}

export interface NutritionixNutrient {
    attr_id: number,
    value: number,
}

export interface NutritionixTag {
    item: string,
    measure: string,
    quantity: number,
    food_group: string,
    tag_id: string,
}

export interface NutritionixAltMeasure {
    serving_weight: number,
    measure: string,
    seq: number,
    qty: number,
}

export interface NutritionixMetadata {
    is_raw_food: boolean,
}

export interface NutritionixMealType {
    meal_type: string,
    meal_type_id: string,
}

export interface NutritionixPhoto {
    thumb: string,
    highres: string,
    is_user_uploaded: boolean,
}