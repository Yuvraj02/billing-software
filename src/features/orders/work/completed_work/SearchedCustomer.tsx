import { useQuery } from "@tanstack/react-query";
import type { WorkModel } from "../../../../models/WorkModel";
import { getCompletedWorkByPhone } from "../../api";
interface SearchedCustomerData {
    customerPhone: string
    columnMap: Map<string, string>
    tableColumns: string[]
    setOpenCustomerModal: React.Dispatch<React.SetStateAction<boolean>>
    setWorkModel: React.Dispatch<React.SetStateAction<WorkModel>>
}

function SearchedCustomer(prop: SearchedCustomerData) {

    const searchedQuery = useQuery({
        queryKey: ['searched_completed_work'],
        queryFn: () => getCompletedWorkByPhone(prop.customerPhone),
        enabled: prop.customerPhone.length == 10
    })

    if (searchedQuery.isLoading) {
        return <tr className="flex justify-center items-center"><td>Loading Customer Data</td></tr>
    }

    if (searchedQuery.isError) {
        return <tr className="flex justify-center items-center"><td>Error in Loading Data</td></tr>
    }

    if (searchedQuery.data?.data == null) {
        return <tr className="flex justify-center items-center"><td>Error in Loading Data</td></tr>
    }

    if (searchedQuery.data.data.length == 0) {
        return <tr className="flex justify-center items-center"><td>No Customer Found</td></tr>
    }
    //------------------------------TODO : RETRIEVING LIST OF DATA, BUT RENDERING ONLY ONE ITEM RENDER THE WHOLE LIST---------------------------------------------------------

    const customer_data = searchedQuery.data.data[0]

    const handleOnCustomerClick = () => {
        prop.setWorkModel(customer_data)
        prop.setOpenCustomerModal(true)
    }

    return (<tr onClick={handleOnCustomerClick} className="space hover:bg-gray-800 cursor-pointer">
        {prop.tableColumns.map((columnName, index) => {
            const col_key = prop.columnMap.get(columnName);
            const data = customer_data[col_key!]
            return (<td className={`max-w-0.5 px-4 py-2 border text-sm font-light overflow-x-auto whitespace-nowrap`} key={index}>
                <div className={columnName == "Status" ? data == "Pending" ? "text-amber-300" : "text-green-500" : "text-white"}>{data?.toString()}</div>
            </td>)
        })}
    </tr>)

}

export default SearchedCustomer