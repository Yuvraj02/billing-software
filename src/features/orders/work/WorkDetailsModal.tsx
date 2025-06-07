import { MdClose } from "react-icons/md"
import sanjhikala_logo from "../../../assets/sanjhikala_logo.jpg"
import { useAppSelector } from "../../../hooks"
import { MdDoneOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import type { WorkModel } from "../../../models/WorkModel";

interface CustomerModal {
    isOpen: boolean
    onClose: () => void
    id: string //This is customer id
}

function CustomerProfileModal(prop: CustomerModal) {

    const customerData: WorkModel[] = useAppSelector((state) => state.work.work_left)

    const [singleCustomerData, setCustomerData] = useState<WorkModel>({ work_id: '1', date: new Date(Date.now()), work_status: "Pending" })

    useEffect(() => {

        if (prop.isOpen && prop.id) {  
            customerData.forEach((workModel) => {
                if (workModel.work_id === prop.id) {
                    setCustomerData(workModel)
                }
            })
        }
    },)

    const columnMap = new Map<string, string>([
        ["length", "Length"],
        ["shoulder", "Shoulder"],
        ["upper_chest", "Upper Chest"],
        ["chest", "Chest"],
        ["waist", "Waist"],
        ["hip", "Hip"],
        ["sleeves", "Sleeves"],
        ["neck_front", "Neck Front"],
        ["neck_back", "Neck Back"],
        ["armhole", "Armhole"],
        ["bottom", "Bottom"]
    ]
    )

    return (<div className={`fixed inset-0 flex justify-center items-center transition-colors
            ${prop.isOpen ? "visible bg-black/50" : "invisible"}`}>

        <div className="border rounded-2xl flex flex-col h-5/6 max-h-5/6 max-w-lvh min-w-lvh bg-black w-fit p-5 overflow-y-auto">

            <div className="flex w-full justify-between">
                {/* <h1 className="text-3xl text-white">Bill</h1> */}
                <img className="h-5/6 w-3/12" src={sanjhikala_logo} alt="Sanjhikala Logo" />
                <MdClose className="cursor-pointer" onClick={prop.onClose} />
            </div>
            <div className="flex-grow ">

                {/* This Part will contain the actual form */}

                <div className="grid grid-cols-[auto_1fr] gap-2 w-fit">

                    <div><h1>Phone (+91): </h1></div>
                    <div>{singleCustomerData.customer_phone} </div>

                    <div><h1>Name: </h1></div>
                    <div>{singleCustomerData.customer_name} </div>
                    <div className="">Category : </div>
                    <div className="">{singleCustomerData.category_name?.toString()}</div>
                     <div className="">Date : </div>
                    <div className="">{singleCustomerData.date?.toString()}</div>
                </div>
                
                {/* Render Dimensions Table according to the Customer */}
                <div className="py-4">Sizes Given By Customer For {singleCustomerData.category_name?.toString()} </div>
                <div className="grid grid-cols-[auto_1fr] overflow-y-auto w-fit ">
                    {Object.entries(singleCustomerData).map(([key, value]) => {
                        if (key == "customer_id" || key == "customer_name" || key == "customer_phone" || key == "work_id" || key == "work_status" || key == "date" || key=="category_name") return (null)
                        const columnName = columnMap.get(key)
                        return (<>
                            <div key={key + 1} className="border p-2">{columnName}</div>
                            <div className="border p-2">{value?.toString()}</div>
                        </>)
                    })}
                </div>
            </div>
            <div className="flex gap-2 justify-end">
                <div onClick={prop.onClose} className="flex gap-1 border-1 rounded-xl p-2 hover:bg-red-500 hover:text-amber-50 cursor-pointer">Close <MdClose className="mt-1" /></div>
                <div className="flex gap-1 border-1 rounded-xl p-2 hover:bg-green-500 hover:text-amber-50 cursor-pointer">Mark as complete <MdDoneOutline className="mt-1" /></div>
            </div>
        </div>
    </div>)
}

export default CustomerProfileModal