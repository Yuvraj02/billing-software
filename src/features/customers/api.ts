import axios from "axios";
import type { CustomerModel } from "../../models/CustomerModel";
// import type { CustomerModel } from "../../models/CustomerModel";

export interface CustomerApiResponse {
    customers_count : number
    data?: CustomerModel[]
    status : string
}

const API_BASE_URL : string = 'http://localhost:3000'

export async function fetchCustomers(): Promise<CustomerApiResponse> {
    const response = await axios.get(API_BASE_URL)
    return response.data
}
