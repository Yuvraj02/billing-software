//TODO : ADD BILL MODAL AND FUNCTIONS

import { useState } from "react"
import SearchBar from "../SearchBar"
import AddCustomerModal from "../add_customer/AddCustomerModal";

interface DataItem {
    ID: number,
    Name: string,
    Email: string,
    Phone: string,
    [key: string]: string | number //Making the key as a string and value can be a number or a string
    //Here key is the property
}

function CustomerTable() {

    //Hooks Related to table
    const [isOpenModal, setOpen] = useState<boolean>(false)
    const [tableColumns, setColumns] = useState<string[]>(["ID", "Name", "Email", "Phone",])
    const [data, setData] = useState<DataItem[]>([{ ID: 9000, Name: "Yuvraj Singh Bhadoria", Email: "yuvrajsinghbhadoria@gmail.com", Phone: "8770805985" },
    { ID: 2000, Name: "John", Email: "test234@gmail.com", Phone: "9120303425" },
    { ID: 2000, Name: "John", Email: "test234@gmail.com", Phone: "9120303425" },
    { ID: 2000, Name: "John", Email: "test234@gmail.com", Phone: "9120303425" },
    { ID: 2000, Name: "John", Email: "test234@gmail.com", Phone: "9120303425" },
    { ID: 2000, Name: "John", Email: "test234@gmail.com", Phone: "9120303425" },
    { ID: 2000, Name: "John", Email: "test234@gmail.com", Phone: "9120303425" },
    { ID: 2000, Name: "John", Email: "test234@gmail.com", Phone: "9120303425" },
    { ID: 2000, Name: "John", Email: "test234@gmail.com", Phone: "9120303425" },
    { ID: 2000, Name: "John", Email: "test234@gmail.com", Phone: "9120303425" },
    { ID: 2000, Name: "John", Email: "test234@gmail.com", Phone: "9120303425" },
    ])


    return (<>
        <div className="m-25  p-6 border rounded-2xl max-h-48 md:max-h-96 lg:max-h-100 overflow-y-auto">
            <div className="flex justify-between">
                <div className="flex">
                    <h1 className="font-bold">All Customers</h1>
                    <div className="items-center ml-8">
                        <SearchBar title="Name" />
                    </div>
                    <div className="items-center ml-2">
                        <SearchBar title="Phone No." />
                    </div>

                    {/* <BillModal isOpen={isOpenModal} onClose={()=>setOpen(false)} /> */}
                    
                    <AddCustomerModal isOpen = {isOpenModal} onClose={()=>setOpen(false)}/>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => setOpen(true)} className="border text-center rounded-2xl px-2 cursor-pointer hover:bg-[#f69400] hover:text-amber-50">Add Customer</button>
                    <button className="border text-center rounded-2xl px-2 cursor-pointer hover:bg-[#f69400] hover:text-amber-50">Generate Bill</button>
                    {/* <MdAdd className="text-3xl mt-1.5" /> */}
                </div>
            </div>
            <div className="max-w-5xl py-7 overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-300 ">
                    <thead className="bg-black">
                        <tr>
                            {tableColumns.map((colName, index) => {
                                return <th key={index} className="px-4 py-2 text-left font-bold underline border">{colName}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((dataItem) => {
                            return (<tr key={dataItem.id} className="space hover:bg-gray-800">
                                {tableColumns.map((column) => {
                                    return (<td key={`${dataItem.id}-${column}`}className=" max-w-0.5 px-4 py-2 border text-sm font-light overflow-x-auto whitespace-nowrap" >
                                        {dataItem[column]}
                                    </td>)
                                })}
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </>)
}

export default CustomerTable