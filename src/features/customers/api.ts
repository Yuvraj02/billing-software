import axios from "axios";
import type { CustomerModel } from "../../models/CustomerModel";
import type { DimensionModel } from "../../models/DimensionModel";
import type { CategoryModel } from "../../models/CategoryModel";
// import type { CustomerModel } from "../../models/CustomerModel";

//This interface model will store the result of all the customers
export interface CustomersApiResponse {
    customers_count : number
    data?: CustomerModel[]
    status : string
}

//This interface model will store the result of a single customer
export interface CustomerApiResponse {
    search_status:string
    searched_data : CustomerModel
}   

export interface DimensionsApiResponse {
    status: string
    data?: DimensionModel[]
}

export interface CategoryApiResponse {
    status : string
    category_count : number
    category_data ? : CategoryModel[]
}

const API_BASE_URL : string = 'http://localhost:3000'

//API Request to get all customers
export async function fetchCustomers(): Promise<CustomersApiResponse> {
    const response = await axios.get(API_BASE_URL)
    return response.data
}

//API Request to get dimensions based on customer's phone
export async function  fetchDimensionsByPhone(phone:string): Promise<DimensionsApiResponse> {
    const response = await axios.get(`${API_BASE_URL}/dim/${phone}`)
    return response.data
}

//API Request to get Category
export async function fetchCategory(){
    const response = await axios.get(`${API_BASE_URL}/categories`)
    return response.data
}

export async function fetchCustomerByPhone(phone:string){
    const response = await axios.get(`${API_BASE_URL}/customers/${phone}`)
    return response.data
}
