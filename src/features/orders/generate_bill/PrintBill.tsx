import { useRef } from "react"
import { useReactToPrint } from "react-to-print"
import "./PrintStyle.css"
import ContentToPrint, { type CustomerDetails } from "./ContentToPrint"
import { MdLocalPrintshop } from "react-icons/md";


// export interface BillDetails {
//     productName: string
//     clothCost: number
//     stitchCost: number
//     otherCost: number
//     quantity: number
//     totalAmount: number
// }

function PrintBill(prop : CustomerDetails) {

    const contentRef = useRef<HTMLDivElement>(null)
    const reactToPrintFn = useReactToPrint({ contentRef })
    

    return (<>
        {/* <NavLink to={"/print"}> <div className="border flex gap-2 rounded-xl cursor-pointer hover:bg-green-700 hover:text-amber-50 p-2" onClick={reactToPrintFn}>
            <div>Print</div>
            <MdLocalPrintshop className="mt-1"/>
        </div>
        </NavLink> */}
        <div className="border flex gap-2 rounded-xl cursor-pointer hover:bg-green-700 hover:text-amber-50 p-2" onClick={reactToPrintFn}>
            <div>Print</div>
            <MdLocalPrintshop className="mt-1"/>
        </div>
        <div ref={contentRef} className="printable-content"><ContentToPrint customerName={prop.customerName} customerPhone={prop.customerPhone}/></div>
    </>)
}

export default PrintBill