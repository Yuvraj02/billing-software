import { MdClose } from "react-icons/md"
import sanjhikala_logo from "../../../assets/sanjhikala_logo.jpg"
import { useState } from "react"
import type { CategoryModel } from "../../../models/CategoryModel"
import DropDownMenu from "../../../components/common/DropdownMenu"
import { useQuery } from "@tanstack/react-query"
import { fetchCategory, fetchCustomerByPhone, type CategoryApiResponse } from "../api"
import type { CustomerModel } from "../../../models/CustomerModel"
interface ModalProp {
    isOpen: boolean,
    onClose: () => void
}

function AddCustomerModal(prop: ModalProp) {

    const [dropDowntrigger, setTrigger] = useState<boolean>(false)
    const [buttonText, setButtonText] = useState<string>("Select Category")

    // const categories = useAppSelector((state) => state.categories.categories)

    const [categoryModel, setCategory] = useState<CategoryModel>({} as CategoryModel)
    const [customer_phone, setPhoneState] = useState<string>('')
    const [customer_name, setName] = useState<string>('')
    const [shouldFetchCustomer, setShouldFetch] = useState<boolean>(false)
    

    const handleOnDropDownClick = (categoryModel: CategoryModel) => {
        const text: string = categoryModel.category_name
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

    let categories: CategoryModel[] = [{ category_id: -1, category_name: "None" } as CategoryModel]

    const api_data: CategoryModel[] | undefined = query.data?.category_data

    if (api_data != null) {
        categories = [...categories, ...api_data!]
    }

     const customerQuery = useQuery({
        queryKey: ['customer'],
        queryFn:()=> fetchCustomerByPhone(customer_phone),
        enabled:shouldFetchCustomer && customer_phone.length===10
    })


    const onAddCustomerHandler = () => {
        //Fetch customer by phone first
    
        setShouldFetch(true)
        // const customerData : CustomerModel[] : undefined = customerQuery.data
        if(customerQuery.data==null){
            //Add New customer to the database
            const customerData : CustomerModel = {
                customer_name : customer_name,
                customer_ph : customer_phone,
            }

        //POST Request to create new customer and there dimensions
        }

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
                            <div><input onChange={onPhoneChangeHandler} maxLength={10} className="border px-2 rounded-sm [appearance:textfield]          /* Standard way for Firefox */
    [&::-webkit-outer-spin-button]:appearance-none /* For Webkit browsers (Chrome, Safari, Edge) */
    [&::-webkit-inner-spin-button]:appearance-none /* For Webkit browsers (Chrome, Safari, Edge) */
  "
                                type="text" placeholder="Enter Phone here.." /></div>
                            <div><h1>Name: </h1></div>
                            <div><input onChange={onNameChangeHandler} className="border px-2 rounded-sm" type="text" placeholder="Enter Name here.." /></div>
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
                                    <div className="border p-2">{value}</div>
                                    <div><input type="number" className="border p-2 w-3/12" placeholder="0.0" /></div>
                                </>)
                            })}
                        </div>

                    </div>
                </div>
                <div className="flex justify-end">
                    <div onClick={onAddCustomerHandler} className="border rounded-2xl p-2 cursor-pointer hover:bg-green-800 hover:text-white">Add Customer</div>
                </div>
            </div>
        </div>
    </>)
}

export default AddCustomerModal