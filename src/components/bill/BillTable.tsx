import { useState } from "react"
import type { ProductModel } from "../../models/ProductModel"


function BillTable() {

    const [tableHead, setHeading] = useState<string[]>(["Name", "Length", "Shoulder", "Sleeves"])

    const [data, setProduct] = useState<ProductModel[]>([{ product_id: 0, product_name: "Kurta", length: 22.5, shoulder: 23.5, sleeves: 22 },
     
    ])

     const columnMappings = new Map<string|number, string>([
        ["Product ID","product_id"],
        ["Name","product_name"],
        ["Length","length"],
        ["Shoulder","shoulder",],
        ["Sleeves","sleeves"],
        ["Neck Front","neck_front",]
    ])

    return (<>
    <div>
        <div className=" p-4 max-w-lvh overflow-x-auto">
            <table className="min-w-full text-left ">
                <thead>
                    <tr>
                        {tableHead.map((value, index) => <th className="border p-2 " key={index}> {value} </th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((productData, index) => {
                        return (
                            <tr key={index}>
                                {tableHead.map((actual_column_name, colIndex) => {
                                    const product_model_property : string = columnMappings.get(actual_column_name)!
                                    return (<td className="border p-2" key={colIndex-index}><input type="number" /></td>)
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        <div className="flex py-2 ">
            <div className="flex gap-2">
                <p>No:of Units: </p>
                <input className="w-1/6 border rounded-xs bg-neutral-900 px-2" type="number" />
            </div>
            <div className="flex gap-2">
                <p>Price/unit: </p>
                <input className="w-1/2 border rounded-xs bg-neutral-900 px-2" type="number" />
            </div>
        </div>
        </div>
    </>)
}

export default BillTable 