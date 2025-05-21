import type { CategoryModel } from "../../models/CategoryModel"
import DimensionTable from "./DimensionTable"
import DropDownMenu from "../DropdownMenu"
import { useState } from "react"
// import { useAppDispatch } from "../../hooks"
import { useAppSelector } from "../../hooks"
//As soon as user click's Select Category Algorithim will execute as follows
/*
    1. All Categories will be fetched in map with there name as key and value as the model itself 
    2. Name of those categories will be displayed
    3. 
*/


function AddCustomerForm() {

    const [trigger, setTrigger] = useState<boolean>(false)
    const [buttonText, setButtonText] = useState<string>("Select Category")
    //const categories: string[] = ["--Select Category--", "Kurta", "Salvaar"]
    const categories = useAppSelector((state)=>state.categories.categories)
    
    const [categoryModel, setCategory] = useState<CategoryModel>({} as CategoryModel)


    const handleOnDropDownClick = (categoryModel : CategoryModel) => {
        const text: string = categoryModel.category_name
        setButtonText(text)
        setTrigger(false)
        setCategory(categoryModel)
    }



    return (<><div>
        <div className="grid grid-cols-[auto_1fr] gap-2 w-fit">
            <div><h1>Name: </h1></div>
            <div><input className="border px-2 rounded-sm" type="text" placeholder="Enter Name here.." /></div>
            <div><h1>Phone (+91): </h1></div>
            <div><input className="border px-2 rounded-sm [appearance:textfield]          /* Standard way for Firefox */
    [&::-webkit-outer-spin-button]:appearance-none /* For Webkit browsers (Chrome, Safari, Edge) */
    [&::-webkit-inner-spin-button]:appearance-none /* For Webkit browsers (Chrome, Safari, Edge) */
  "
                type="number" placeholder="Enter Phone here.." /></div>
            <div className="mt-3 ">Select Category : </div>
            <div className="relative w-4/6">
                <DropDownMenu className="flex p-2 bg-neutral-900 hover:bg-neutral-800 border rounded" buttonText={buttonText} setTrigger={setTrigger} trigger={trigger}>
                    {categories.map((value, index) => <div key={index} onClick={() => handleOnDropDownClick(value)} className="w-full p-2 cursor-pointer hover:bg-neutral-800">{value.category_name}</div>)}
                </DropDownMenu>
            </div>
        </div>

        <DimensionTable categoryModel={categoryModel} />

    </div>
    </>)
}

export default AddCustomerForm