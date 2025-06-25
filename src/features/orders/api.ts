//TODO : CHANGE APIs ACCORDING TO THE NEW WORK ROUTE 

import axios from "axios";
import type { CustomerModel } from "../../models/CustomerModel";
import type { DimensionModel } from "../../models/DimensionModel";
import type { CategoryModel } from "../../models/CategoryModel";
import type { WorkModel } from "../../models/WorkModel";
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

export interface AddCustomerApiResponse{
    status:string
    data_added?:CustomerModel
}

export interface UpdateDimensionsAPI{
    id:number
    data : DimensionModel
}

export interface PendingWorkAPIResponse{
    status:string
    count:number
    data?: WorkModel[]
}

export interface SearchWorkAPIResponse {
    status : string
    data? : WorkModel[]
}

export interface CustomerDetailsFromWorkAPIResponse{
    statis:string
    data?:WorkModel
}

export interface WorkByNameResponse{
    status : string
    data : WorkModel[]
}

export interface CompletedWorkApiResponse {
    status : string
    data : []
}

export interface CompletedWorkByNameResponse{
    status:string
    data:WorkModel[]
}

export interface CompletedWorkByPhoneResponse{
    status:string
    data:WorkModel[]
}

//TODO : ====================================================== CHANGE THIS AFTER DEPLOYMENT
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

//API Request to get customers by phone
export async function fetchCustomerByPhone(phone:string){
    const response = await axios.get(`${API_BASE_URL}/customers/${phone}`)
    if (response.status===404){
        return "Not Found"
    }
    return response.data
}

export async function addCustomers(customer:CustomerModel){
    const response = await axios.post(`${API_BASE_URL}/add_customer`, customer)
    return response.data
}

export async function addDimensions(dimensions : DimensionModel){
    await axios.post(`${API_BASE_URL}/add_dim`, dimensions)
}

export async function updateDimensions(dimensions:UpdateDimensionsAPI){
    await axios.patch(`${API_BASE_URL}/update_dim/${dimensions.id}`,dimensions.data)
}

export async function addWork(workData:WorkModel) : Promise<WorkModel> {

    //Invalidate API
    const response = await axios.post(`${API_BASE_URL}/add_work`, workData)
    return response.data
}

export async function getPendingWork() : Promise<PendingWorkAPIResponse>{
    const response = await axios.get(`${API_BASE_URL}/work_list`)
    return response.data
}

export async function searchPendingWork(phone : string) : Promise<SearchWorkAPIResponse>{
    const response = await axios.get(`${API_BASE_URL}/work_list/${phone}`)
    return response.data
}

export async function getPendingWorkDetailsById(id:string) : Promise<CustomerDetailsFromWorkAPIResponse>{
    const response = await axios.get(`${API_BASE_URL}/work_list/customer/${id}`)
    return response.data
}

export async function getWorkByName(name:string) : Promise<WorkByNameResponse>{
    const response = await axios.get(`${API_BASE_URL}/work_list/name/${name}`)
    return response.data
}

export async function updateWorkStatus(id:string){
    await axios.patch(`${API_BASE_URL}/mark_complete/${id}`)
}

export async function getCompletedWork() : Promise<CompletedWorkApiResponse>{
    const response = await axios.get(`${API_BASE_URL}/work_list/completed`)
    return response.data
}

export async function getCompletedWorkByName(name:string) : Promise<CompletedWorkByNameResponse>{
    const response = await axios.get(`${API_BASE_URL}/work_list/completed/name/${name}`)
    return response.data
}

export async function getCompletedWorkByPhone(phone:string) : Promise<CompletedWorkByPhoneResponse>{
    const response = await axios.get(`${API_BASE_URL}/work_list/completed/phone/${phone}`)
    return response.data
}
