import { useEffect, useState } from "react"

import AddCustomerModal from "../../add_customer/AddCustomerModal"
import type { WorkModel } from "../../../../models/WorkModel"
import { getPendingWork } from "../../api"
import SearchedCustomer from "./SearchedCustomer"
import WorkDetailsModal from "./WorkDetailsModal"
import { useQuery } from "@tanstack/react-query"
import GenerateBillModal from "../../generate_bill/GenerateBillModal"
import { MdSearch } from "react-icons/md";
import SearchedCustomerByName from "./SearchCustomerByName"
import {format} from 'date-fns'

function PendingWork() {

    //Hooks Related to table
    const [isOpenModal, setOpen] = useState<boolean>(false)
    const [isOpenCustomerModal, setOpenCustomerModal] = useState<boolean>(false)
    const [searchPhone, setSearch] = useState<boolean>(false)
    const [customerPhone, setCustomerPhone] = useState<string>('')
    const [isOpenBillModal, setOpenBillModal] = useState<boolean>(false)
    const [customerName, setCustomerName] = useState<string>('')
    const [searchName, setSearchByName] = useState<boolean>(false)

    const handlePhoneInpute = (e: React.ChangeEvent<HTMLInputElement>) => setCustomerPhone(e.target.value)
    const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => setCustomerName(e.target.value)

    const tableColumns: string[] = ["ID", "Name", "Phone", "Status", "Date"]

    //These will map column names with their corresponding model names
    //This will be useful when we render data according to the table head
    const columMap = new Map<string, string>([
        ["ID", "customer_id"],
        ["Name", "customer_name"],
        ["Email", "customer_email"],
        ["Phone", "customer_phone"],
        ["Status", "work_status"],
        ["Date", "date"]
    ])

    // const customer_data = useAppSelector((state) => state.work.work_left)
    const pendingWorkQuery = useQuery({
        queryKey: ['pending_work'],
        queryFn: getPendingWork
    })

    const [work_model, setWorkModel] = useState<WorkModel>({} as WorkModel)

    useEffect(() => {

        if (customerPhone.length == 10) {
            setSearch(true)
        } else {
            setSearch(false)
        }

    }, [customerPhone, pendingWorkQuery.data])

    useEffect(() => {
        if (customerName == '') {
            setSearchByName(false)
        }
    }, [customerName])

    const handleCustomerClick = (workModel: WorkModel) => {

        setWorkModel(workModel)
        setOpenCustomerModal(true)
    }

    const handleSearchCustomer = () => {
        setSearchByName(true)
    }

    if (pendingWorkQuery.isLoading) {
        return (<div className="flex h-screen w-screen justify-center items-center"><p>Loading Your Work...</p></div>)
    }

    if (pendingWorkQuery.isError) {
        return (<div className="flex h-screen w-screen justify-center items-center"><p>Error Retrieving Data. Might be a Server Problem</p></div>)
    }

    if (pendingWorkQuery.data?.data == null) {
        return (<div className="flex h-screen w-screen justify-center items-center"><p>Recieved Null</p></div>)
    }

    const customer_data = pendingWorkQuery.data.data

    return (<>
        <div className="m-25 p-6 border rounded-2xl max-h-48 md:max-h-96 lg:max-h-100 overflow-y-auto">
            <div className="flex justify-between">
                <div className="flex">
                    <h1 className="font-bold">Pending Work</h1>
                    <div className="items-center flex gap-2 ml-2">
                        <input id="phone_input_field" onChange={handlePhoneInpute} className="border rounded-xl px-2 py-0.5 text-amber-50" type="text" placeholder={`Search via Phone`} maxLength={10} value={customerPhone} />
                        <input id="name_input_field" onChange={handleNameInput} className="border rounded-xl px-2 py-0.5 text-amber-50" type="text" placeholder={`Search via Name`} />
                        <MdSearch onClick={handleSearchCustomer} className="text-2xl cursor-pointer hover:text-amber-400" />
                    </div>

                    {/* <BillModal isOpen={isOpenModal} onClose={()=>setOpen(false)} /> */}

                    <AddCustomerModal openModal={setOpen} isOpen={isOpenModal} onClose={() => setOpen(false)} />
                    <WorkDetailsModal setOpenModal={setOpenCustomerModal} workModel={work_model} isOpen={isOpenCustomerModal} onClose={() => setOpenCustomerModal(false)} />
                    <GenerateBillModal isOpen={isOpenBillModal} setModal={() => setOpenBillModal(false)} />
                </div>
                <div className="flex gap-3">
                    <button onClick={() => setOpen(true)} className="border text-center rounded-2xl px-2 cursor-pointer hover:bg-[#f69400] hover:text-amber-50">Add Customer Sizes</button>
                    <button onClick={() => setOpenBillModal(true)} className="border text-center rounded-2xl px-2 cursor-pointer hover:bg-[#f69400] hover:text-amber-50">Generate Bill</button>
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

                        {/* If Phone number is searched then display searched customer else display the pending work table as it is */}

                        {searchPhone ? <SearchedCustomer setWorkModel={setWorkModel} setOpenCustomerModal={setOpenCustomerModal} customerPhone={customerPhone} columnMap={columMap} tableColumns={tableColumns} />
                            : searchName ? <SearchedCustomerByName isSearched={searchName} setWorkModel={setWorkModel} setOpenCustomerModal={setOpenCustomerModal} customerName={customerName} columnMap={columMap} tableColumns={tableColumns} />
                                : customer_data.map((dataItem: WorkModel) => {
                                    return (<tr onClick={() => handleCustomerClick(dataItem)} key={dataItem.work_id} className="space hover:bg-gray-800 cursor-pointer">
                                        {tableColumns.map((column) => {
                                            //Here implement logic for rendering seareched phone number
                                            //Here we will get actual key value from our column name
                                            const work_model_key: string = columMap.get(column)!
                                            const value = dataItem[work_model_key]
                
                                            return (<td key={`${dataItem.work_id}-${column}`} className={`max-w-0.5 px-4 py-2 border text-sm font-light overflow-x-auto whitespace-nowrap`} >
                        
                                                {<div className={column == "Status" ? value == "Pending" ? "text-amber-300" : "text-green-500" : "text-white"}>{column=="Date" ? format(value!.toString(),'do MMMM yyyy') : value?.toString()}</div>}
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

export default PendingWork