import { MdClose } from "react-icons/md"
import sanjhikala_logo from "../../../assets/sanjhikala_logo.jpg"
import { useEffect, useState } from "react"
import type { CategoryModel } from "../../../models/CategoryModel"
import DropDownMenu from "../../../components/common/DropdownMenu"
import { useMutation, useQuery } from "@tanstack/react-query"
import { addCustomers, addDimensions, addWork, fetchCategory, fetchCustomerByPhone, updateDimensions, type AddCustomerApiResponse, type CategoryApiResponse, type CustomerApiResponse, type UpdateDimensionsAPI } from "../api"
import type { CustomerModel } from "../../../models/CustomerModel"
import type { DimensionModel } from "../../../models/DimensionModel"
import type { WorkModel } from "../../../models/WorkModel"
import {v1 as uuidv1} from "uuid"
interface ModalProp {
    isOpen: boolean,
    onClose: () => void
}

function AddCustomerModal(prop: ModalProp) {

    const [dropDowntrigger, setTrigger] = useState<boolean>(false)
    const [buttonText, setButtonText] = useState<string>("Select Category")
    const [categoryModel, setCategory] = useState<CategoryModel>({} as CategoryModel)
    const [workModel,setWork] = useState<WorkModel>({} as WorkModel)
    const [customerPhone, setPhoneState] = useState<string>('')
    const [customerName, setName] = useState<string>('')
    const [shouldFetchCustomer, setShouldFetch] = useState<boolean>(false)

    const handleOnDropDownClick = (categoryModel: CategoryModel) => {
        const text: string = categoryModel.category_name!
        setButtonText(text)
        setTrigger(false)
        setCategory(categoryModel)
    }

    const onPhoneChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setPhoneState(e.target.value)
    const onNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)

    const query = useQuery<CategoryApiResponse, Error>({
        queryKey: ['category'],
        queryFn: fetchCategory
    })

    const customerQuery = useQuery<CustomerApiResponse, Error>({
        queryKey: ['customerByPhone', customerPhone],
        queryFn: () => fetchCustomerByPhone(customerPhone),
        enabled: shouldFetchCustomer && customerPhone.length === 10
    })

    const addCustomer = useMutation({
        mutationFn: (customerModel: CustomerModel) => addCustomers(customerModel),
        //First arguement is the data[payload] that we are posting to our servers, second arguement is the data/or arguement from the place where this function will be called
        //But here we are using just one arguement rn
        onSuccess: (newCustomerData: AddCustomerApiResponse) => {
            //Now set dimensions for the new customer
            const newCustomer = newCustomerData.data_added
            
            //Update Dimensions Data and send back to the server
            const newCustomerDimension: DimensionModel = {
                ...dimensions,
                customer_id: newCustomer?.customer_id,
                customer_name: newCustomer?.customer_name,
                customer_phone: newCustomer?.customer_ph
            }
            //Set Dimensions
            setDimensions(newCustomerDimension)
            //Send back to the server
            addDimensionMutation.mutate(newCustomerDimension)

            //Update New Work Status and Data and send back to the server
            const newWorkModel : WorkModel = {
                work_id:uuidv1(),
                customer_id:newCustomer?.customer_id,
                customer_name:newCustomer?.customer_name,
                customer_email:newCustomer?.customer_email,
                customer_phone:newCustomer?.customer_ph,
                work_status:"Pending",
                date: new Date(Date.now())
            }
            
            setWork(newWorkModel)
            addWorkMutation.mutate(workModel)
        }
    })

    const addDimensionMutation = useMutation({
        mutationKey: ['addCustomerDimensions'],
        mutationFn: (dimensionData: DimensionModel) => addDimensions(dimensionData)
    })

    const updateDimensionMutations = useMutation({
        mutationKey: ['updateCustomerDimension'],
        mutationFn: (dimensions: UpdateDimensionsAPI) => updateDimensions(dimensions)
    })

    const addWorkMutation = useMutation({
        mutationKey:['addNewWork'],
        mutationFn:(workData: WorkModel) => addWork(workData)
    })


    let categories: CategoryModel[] = [{ category_id: -1, category_name: "None" } as CategoryModel]
    const api_data: CategoryModel[] | undefined = query.data?.category_data
    if (api_data != null) {
        categories = [...categories, ...api_data!]
    }

    const [dimensions, setDimensions] = useState<DimensionModel>({})

    const onDimensionChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, dimension_key: string | number) => {
        const parsedSize: number = Number(e.target.value)
        setDimensions((prevDimensionState) => ({ ...prevDimensionState, [dimension_key]: parsedSize }))
    }

    //This will trigger when shouldFetchCustomer is switched from false to true
    useEffect(() => {

        if (!customerQuery.isLoading && customerQuery.isFetched) {
            //Now this contains our customerModel
            //This means there is an existing customer
            if (customerQuery.data != null) { 
                const customerData: CustomerModel = customerQuery.data.searched_data
                setDimensions((prevDimensions) => ({ ...prevDimensions, customer_id: customerData.customer_id, customer_name: customerData.customer_name, customer_phone: customerData.customer_ph }))
                //DO NOT CONSOLE LOG DIEMNSIONS HERE BECAUSE IT WILL RESULT IN LOGGING PREVIOUS STATE USE ANOTHER USE EFFECT INSTEAD 
                updateDimensionMutations.mutate({ data: dimensions, id: dimensions.customer_id! })
                
                //In case of existing customer, simply create new work model here after retrieval od the customer
                const newWorkModel : WorkModel = {
                    work_id: uuidv1(),
                    customer_id:customerData.customer_id,
                    customer_email:customerData.customer_email,
                    customer_phone:customerData.customer_ph,
                    work_status:"Pending",
                    date:new Date(Date.now())
                }
                setWork(newWorkModel)
                addWorkMutation.mutate(workModel)
            } else {
                //Add new customer and Dimensions
                const newCustomer: CustomerModel = { customer_name: customerName, customer_ph: customerPhone }
                //New dimensions will be added onSuccess of useMutation
                addCustomer.mutate(newCustomer)
            }
        }
        setShouldFetch(false)
    }, [customerQuery.data, shouldFetchCustomer, customerQuery.isLoading, customerQuery.isFetched])

    // useEffect(() => {
    //     console.log(dimensions)
    // }, [dimensions])

    //This will fire up as soon as add customer will be clicked
    const onAddCustomerHandler = () => {
        setShouldFetch(true)
    }
    return (<>
        <div className={`fixed inset-0 flex justify-center items-center transition-colors
            ${prop.isOpen ? "visible bg-black/50" : "invisible"}
        `}>
            <div className="border rounded-2xl flex flex-col h-5/6 max-h-5/6 max-w-lvh min-w-lvh bg-black w-fit p-5 overflow-y-auto">
                <div className="flex w-full justify-between">
                    {/* <h1 className="text-3xl text-white">Bill</h1> */}
                    <img className="h-5/6 w-3/12" src={sanjhikala_logo} alt="Sanjhikala Logo" />
                    <MdClose className="cursor-pointer" onClick={prop.onClose} />
                </div>

                <div className="flex-grow ">

                    {/* This Part will contain the actual form */}

                    <div>
                        <div className="grid grid-cols-[auto_1fr] gap-2 w-fit">

                            <div><h1>Phone (+91): </h1></div>
                            <div><input name="phone_input_field" onChange={onPhoneChangeHandler} maxLength={10} className="border px-2 rounded-sm [appearance:textfield]          /* Standard way for Firefox */
    [&::-webkit-outer-spin-button]:appearance-none /* For Webkit browsers (Chrome, Safari, Edge) */
    [&::-webkit-inner-spin-button]:appearance-none /* For Webkit browsers (Chrome, Safari, Edge) */
  "
                                type="text" placeholder="Enter Phone here.." /></div>
                            <div><h1>Name: </h1></div>
                            <div><input name="customer_name_field" onChange={onNameChangeHandler} className="border px-2 rounded-sm" type="text" placeholder="Enter Name here.." /></div>
                            <div className="mt-3 ">Select Category : </div>
                            <div className="relative w-4/6">
                                <DropDownMenu className="flex p-2 bg-neutral-900 hover:bg-neutral-800 border rounded" buttonText={buttonText} setTrigger={setTrigger} trigger={dropDowntrigger}>
                                    {categories.map((value, index) => <div key={index} onClick={() => handleOnDropDownClick(value)} className="w-full p-2 cursor-pointer hover:bg-neutral-800">{value.category_name}</div>)}
                                </DropDownMenu>
                            </div>
                        </div>

                        {/* Render Dimensions Table according to the Category */}
                        <div className="p-4 grid grid-cols-[auto_1fr] overflow-y-auto">
                            {Object.entries(categoryModel!).map(([key, value]) => {
                                if (key == "category_id" || key == "category_name") return (null)
                                return (<>
                                    <div key={1 + key} className="border p-2">{value}</div>
                                    <div><input onChange={(e) => onDimensionChangeHandler(e, key)} type="number" className="border p-2 w-3/12" placeholder="0.0" /></div>
                                </>)
                            })}
                        </div>

                    </div>
                </div>
                <div className="flex justify-end">
                    <div onClick={onAddCustomerHandler} className="border rounded-2xl p-2 cursor-pointer hover:bg-green-800 hover:text-white">Add Customer and Place Order</div>
                </div>
            </div>
        </div>
    </>)
}

export default AddCustomerModal