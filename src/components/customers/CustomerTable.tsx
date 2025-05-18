import { useState } from "react"

interface DataItem{
    ID:number,
    Name:string,
    Email:string,
    Phone:string,
    [key:string] : string | number //Making the key as a string and value can be a number or a string
    //Here key is the property
}

function CustomerTable(){

    const [tableColumns,setColumns] = useState<string[]>(["ID", "Name","Email","Phone"])
    const [data, setData] = useState<DataItem[]>([{ID:1, Name:"Yuvraj Singh Bhadoria", Email:"yuvrajsinghbhadoria@gmail.com", Phone:"8770805985"},
                                                  {ID:2, Name:"John", Email:"test234@gmail.com", Phone:"9120303425"}
                                                ])
    return (<>
    <div className="p-20">
    <div><h1>All Customers</h1>
    </div>
    <div className="max-w-5xl py-10 overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
            <thead className="bg-black">
                <tr>
                    {tableColumns.map((colName,index) => {
                        return <th key={index} className="px-4 py-2 text-left text-sm font-light text-gray-300 border">{colName}</th>
                    })}
                </tr>
            </thead>
            <tbody>     
               {data.map((dataItem)=>{
                return (<tr key={dataItem.id} className="space hover:bg-gray-800">
                        {tableColumns.map((column)=>{return (<td className=" max-w-0.5 px-4 py-2 border overflow-x-auto whitespace-nowrap" key={`${dataItem.id}-${column}`}>
                            {dataItem[column]}
                        </td>)})}
                </tr>)
                })}
            </tbody>
        </table>
        </div>
        </div>
    </>)
}

export default CustomerTable