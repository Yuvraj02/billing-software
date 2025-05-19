export interface ProductModel {
    product_name: string
    product_id: number
    // length?: number
    // shoulder?: number
    // upper_chest?: number
    // waist?: number
    // hip?: number
    // sleeves?: number
    // neck_front?: number
    // neck_back?: number
    // armhole?: number
    // bottom?: number
    [key:string] : string|number
}