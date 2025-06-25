import { useAppDispatch, useAppSelector } from "../../../hooks"
import sanjhikala_logo from "../../../assets/sanjhikala_logo.jpg"
import { calculateTotal } from "./billModalSlice"
import { useEffect } from "react"
import {format} from 'date-fns'

export interface CustomerDetails{
    customerName:string
    customerPhone: string
}

function ContentToPrint(prop:CustomerDetails){
    
    const billData = useAppSelector((state)=>state.printData.printDataList) 
    const totalAmounts = useAppSelector((state)=>state.printData.totalAmount)
    const dispatch = useAppDispatch()
    
    useEffect(()=>{
        dispatch(calculateTotal())
    })

    return (<>

                {/* Bill Content - This div will be printed */}
                <div>
            <div className="bg-white p-6 md:p-8 lg:p-10 shadow-lg rounded-lg max-w-4xl mx-auto text-gray-800">
                {/* Header Section */}
                <div className="flex flex-col justify-center items-center mb-8 border-b pb-4 border-gray-200 gap-1">
                    <img className="h-10/12 w-5/12 border rounded-2xl" src={sanjhikala_logo} alt="Sanjhikala Logo" />
                    <p className="text-sm text-gray-600">Chunabhatti Main Road, Bhopal, Madhya Pradesh 462042</p>
                    <p className="text-sm text-gray-600">Phone: (+91) 9999999999 | Email: sanjhikala06@gmail.com</p>
                    <h2 className="text-2xl font-semibold mt-6 text-gray-900 uppercase tracking-wide inline-block border-b-2 border-amber-500 pb-1">
                        Bill / Invoice
                    </h2>
                </div>

                {/* Bill & Customer Details - Using Flexbox for responsiveness */}
                <div className="flex flex-col md:flex-row justify-between mb-8 text-sm">
                    <div className="mb-4 md:mb-0">
                        <p className="font-semibold text-gray-700">Invoice No: <span className="font-normal">{Date.now().toString()}</span></p>
                        <p className="font-semibold text-gray-700">Date: <span className="font-normal">{format(Date.now(), 'do MMMM yyyy')}</span></p>
                    </div>
                    <div className="text-right">
                        <p className="font-semibold text-gray-700">Bill To:</p>
                        <p className="font-normal">Mr./Ms./Mrs.</p>
                        <p className="font-normal">{prop.customerName}</p>
                    </div>
                </div>

                {/* Items Table - Native HTML table styled with Tailwind */}
                <div className="overflow-x-auto mb-8">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-4 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                <th className="py-3 px-4 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="py-3 px-4 border-b border-gray-200 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Stitching Cost</th>
                                <th className="py-3 px-4 border-b border-gray-200 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cloth Cost</th>
                                <th className="py-3 px-4 border-b border-gray-200 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Other Costs</th>
                                <th className="py-3 px-4 border-b border-gray-200 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">QTY</th>
                            </tr>
                        </thead>
                        <tbody>
                            {billData.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="py-3 px-4 border-b border-gray-200 text-sm">{index + 1}</td>
                                    <td className="py-3 px-4 border-b border-gray-200 text-sm">{item.productName}</td>
                                    <td className="py-3 px-4 border-b border-gray-200 text-right text-sm">₹{item.stitchingCost}</td>
                                    <td className="py-3 px-4 border-b border-gray-200 text-right text-sm">₹{item.clothCost}</td>
                                    <td className="py-3 px-4 border-b border-gray-200 text-right text-sm">₹{(item.otherCost).toFixed(2)}</td>
                                    <td className="py-3 px-4 border-b border-gray-200 text-right text-sm">x{item.qty}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-gray-50">
                            <tr>
                                <td colSpan={5} className="py-3 px-4 text-right text-sm font-semibold text-gray-700">Subtotal:</td>
                                <td className="py-3 px-4 text-right text-sm font-semibold text-gray-900">₹{totalAmounts}</td>
                            </tr>
                            <tr>
                                <td colSpan={5} className="py-3 px-4 text-right text-sm font-semibold text-gray-700">Tax (GST):</td>
                                <td className="py-3 px-4 text-right text-sm font-semibold text-gray-900">₹{(0.1*totalAmounts)}</td>
                            </tr>
                            <tr className="bg-blue-100">
                                <td colSpan={5} className="py-3 px-4 text-right text-base font-bold text-blue-700 uppercase">Total:</td>
                                <td className="py-3 px-4 text-right text-base font-bold text-blue-900">₹{totalAmounts + 0.1*totalAmounts}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Footer Section */}
                <div className="text-center mt-8 pt-4 border-t border-gray-200 text-gray-600 text-sm">
                    <p className="mb-2"><strong>Payment Terms:</strong> NA</p>
                    <p>Thank you for shopping with us!</p>
                </div>
            </div>
        </div>


   </>)
}

export default ContentToPrint