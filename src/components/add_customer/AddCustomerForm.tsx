import type { CategoryModel } from "../../models/CategoryModel"
import DimensionTable from "./DimensionTable"
import DropDownMenu from "../DropdownMenu"
import { useState } from "react"



function AddCustomerForm() {

    //This Mapped values will help in rendering the dimensions table based on the category
    const categoryMap = new Map<string, CategoryModel>([
        ["Kurta", { category_id: 0, category_name: "Kurta", length: "Length", upper_neck: "Upper Neck", upper_chest: "Upper Chest", chest: "Chest", waist: "Waist", hip: "Hip" }],
        ["Salvaar", { category_id: 0, category_name: "Salvaar", length: "Length", botom: "Bottom" }]
    ])
    const [trigger, setTrigger] = useState<boolean>(false)
    const [buttonText, setButtonText] = useState<string>("Select Category")
    const categories: string[] = ["--Select Category--", "Kurta", "Salvaar"]

    const handleOnDropDownClick = (title: string) => {
        let text: string = title
        if (text == "--Select Category--") {
            text = "Select Category"
        }
        setButtonText(text)
        setTrigger(false)
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
            <div className="mt-3">Select Category : </div>
            <div className="relative">
                <DropDownMenu buttonText={buttonText} setTrigger={setTrigger} trigger={trigger}>
                    {categories.map((value, index) => <div key={index} onClick={() => handleOnDropDownClick(value)} className="p-2 cursor-pointer hover:bg-neutral-800">{value}</div>)}
                </DropDownMenu>
            </div>
        </div>

        <DimensionTable categoryModel={categoryMap.get(buttonText)} />

    </div>
    </>)
}

export default AddCustomerForm