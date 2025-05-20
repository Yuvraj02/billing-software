export interface CategoryModel{
    category_id:number,
    category_name:string,
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
    [key:string] : string | number
   
}