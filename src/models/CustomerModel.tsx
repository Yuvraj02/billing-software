export interface CustomerModel {
    customer_id?:number
    customer_name:string
    customer_email?:string
    customer_ph:string
    [key:string] : string | number | undefined
}