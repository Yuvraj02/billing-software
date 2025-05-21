export interface CustomerModel {
    customer_id:number
    name:string
    email?:string
    phone:string
    [key:string] : string | number | undefined
}