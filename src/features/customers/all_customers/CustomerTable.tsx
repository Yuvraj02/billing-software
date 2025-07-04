import { useState } from "react"
import SearchBar from "../../../components/common/SearchBar"
import AddCustomerModal from "../../orders/add_customer/AddCustomerModal";
import type { CustomerModel } from "../../../models/CustomerModel";
import { useQuery } from "@tanstack/react-query";
import { fetchCustomers, type CustomersApiResponse } from "../../orders/api";

function CustomerTable() {

    //Hooks Related to table
    const [isOpenModal, setOpen] = useState<boolean>(false)
    const tableColumns: string[] = ["ID", "Name", "Email", "Phone"]

    //These will map column names with their corresponding model names
    //This will be useful when we render data according to the table head
    const columMap = new Map<string, string>([
        ["ID", "customer_id"],
        ["Name", "customer_name"],
        ["Email", "customer_email"],
        ["Phone", "customer_ph"],
    ])

    //    const customer_data: CustomerModel[] = useAppSelector((state) => state.customers.customersData);

    const query = useQuery<CustomersApiResponse, Error>({
        queryKey: ['customers'],
        queryFn: fetchCustomers
    })

    if (query.isLoading) {
        return <div className="h-screen w-screen flex justify-center items-center">Loading Customers Data...</div>
    }

    if (query.isError) {
        return <div className="h-screen w-screen flex justify-center items-center">Error Loading Data</div>
    }

    if (query.data?.data == null) {
        return <div>No Customers Found</div>
    }

    const customer_data = query.data.data

    return (<>
        <div className="m-25  p-6 border rounded-2xl max-h-48 md:max-h-96 lg:max-h-100 overflow-y-auto">
            <div className="flex justify-between">
                <div className="flex">
                    <h1 className="font-bold">All Customers</h1>
                    <div className="items-center ml-2">
                        <SearchBar title="Phone No." />
                    </div>

                    {/* <BillModal isOpen={isOpenModal} onClose={()=>setOpen(false)} /> */}

                    <AddCustomerModal isOpen={isOpenModal} onClose={() => setOpen(false)} />
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
                        {customer_data.map((dataItem: CustomerModel) => {
                            return (<tr key={dataItem.customer_id} className="space hover:bg-gray-800">
                                {tableColumns.map((column) => {

                                    //Here we will get actual key value from our column name
                                    const key_val_for_customer_properties: string = columMap.get(column)!
                                    return (<td key={`${dataItem.customer_id}-${column}`} className=" max-w-0.5 px-4 py-2 border text-sm font-light overflow-x-auto whitespace-nowrap" >
                                        {dataItem[key_val_for_customer_properties]}
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