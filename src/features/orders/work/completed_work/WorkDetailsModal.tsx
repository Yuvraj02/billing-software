import { MdClose } from "react-icons/md"
import sanjhikala_logo from "../../../../assets/sanjhikala_logo.jpg"
import type { WorkModel } from "../../../../models/WorkModel";
import type React from "react";


interface CustomerModal {
    isOpen: boolean
    onClose: () => void
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    workModel: WorkModel
}

function WorkDetailsModal(prop: CustomerModal) {

    const customer_data = prop.workModel

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
                    <div>{customer_data.customer_phone} </div>

                    <div><h1>Name: </h1></div>
                    <div>{customer_data.customer_name} </div>
                    <div className="">Category : </div>
                    <div className="">{customer_data.category?.toString()}</div>
                    <div className="">Date : </div>
                    <div className="">{customer_data.date?.toString()}</div>
                </div>

                {/* Render Dimensions Table according to the Customer */}
                <div className="py-4">Sizes Given By Customer For {customer_data.category?.toString()} </div>
                <div className="grid grid-cols-[auto_1fr] overflow-y-auto w-fit ">
                    {Object.entries(customer_data).map(([key, value]) => {
                        if (key == "customer_id" || key == "customer_name" || key == "customer_phone" || key == "work_id" || key == "work_status" || key == "date" || key == "category" || key == "customer_email") return (null)
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
            </div>
        </div>
    </div>)
}

export default WorkDetailsModal