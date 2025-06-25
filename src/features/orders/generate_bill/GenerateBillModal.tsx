import { MdClose } from "react-icons/md"
import sanjhikala_logo from "../../../assets/sanjhikala_logo.jpg"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { useEffect, useState } from "react"
import PrintBill from "./PrintBill"
import type { BillModel } from "../../../models/BillModel"
import { addProduct, calculateTotal, removeProduct, updateProduct } from "./billModalSlice"
import { MdDeleteForever } from "react-icons/md";
import { v1 as uuidv1 } from "uuid"

interface BillModalInterace {
    isOpen: boolean
    setModal: () => void

}

function GenerateBillModal(prop: BillModalInterace) {

    const noScrollStyle = useAppSelector((state) => state.noScroll.noScroll)

    const [customerName,setCustomerName] = useState<string>('')
    const [customerPhone, setCustomerPhone] = useState<string>('')
    const [productName, setProductName] = useState<string>('')
    const [stitchCost, setStitchCost] = useState<number>(0)
    const [clothCost, setClothCost] = useState<number>(0)
    const [otherCost, setOtherCosts] = useState<number>(0)
    const [finalPrice, setFinalPrice] = useState<number>(0)
    const [units, setUnits] = useState<number>(1)

    const customerNameHandler = (e:React.ChangeEvent<HTMLInputElement>)=>setCustomerName(e.target.value)
    const customerPhoneHandler = (e:React.ChangeEvent<HTMLInputElement>) => setCustomerPhone(e.target.value)

    const productNameHandler = (e: React.ChangeEvent<HTMLInputElement>, productId: string) => {
        // setProductName(e.target.value)  
        // const prodName:string = productName
        dispatch(updateProduct({ productId: productId, fieldName: "productName", value: e.target.value }))
    }

    const stitchCostHandler = (e: React.ChangeEvent<HTMLInputElement>, productId: string) => {
        setStitchCost(e.target.value == "" ? 0 : parseInt(e.target.value))
        const cost: number = e.target.value == "" ? 0 : parseInt(e.target.value)
        dispatch(updateProduct({ productId: productId, fieldName: "stitchingCost", value: cost }))
    }

    const clothCostHandler = (e: React.ChangeEvent<HTMLInputElement>, productId: string) => {
        setClothCost(e.target.value == "" ? 0 : parseInt(e.target.value))
        const cost: number = e.target.value == "" ? 0 : parseInt(e.target.value)
        dispatch(updateProduct({ productId: productId, fieldName: "clothCost", value: cost }))
    }

    const otherCostHandler = (e: React.ChangeEvent<HTMLInputElement>, productId: string) => {
        setOtherCosts(e.target.value == "" ? 0 : parseInt(e.target.value))
        const cost: number = e.target.value == "" ? 0 : parseInt(e.target.value)
        dispatch(updateProduct({ productId: productId, fieldName: "otherCost", value: cost }))
    }

    const unitsHandler = (e: React.ChangeEvent<HTMLInputElement>, productId: string) => {
        setUnits(e.target.value == "" ? 1 : parseInt(e.target.value))
        const qty: number = e.target.value == "" ? 1 : parseInt(e.target.value)
        dispatch(updateProduct({ productId: productId, fieldName: "qty", value: qty }))
    }
    const addProductHandler = () => dispatch(addProduct({ productId: uuidv1(), productName: '', stitchingCost: 0, clothCost: 0, otherCost: 0, qty: 1 } as BillModel))
    const removeProductHandler = (productID: string) => dispatch(removeProduct(productID))
    // const removeProductHandler = (productID:number)=>console.log(productID)
    const billData = useAppSelector((state) => state.printData.printDataList)
    const totalAmount = useAppSelector((state) => state.printData.totalAmount)

    const dispatch = useAppDispatch()
    // dispatch(calculateTotal())
    useEffect(() => {
        // setFinalPrice((stitchCost + clothCost + otherCost) * units)
        dispatch(calculateTotal())
    },)

    return (<div className={`fixed inset-0 flex justify-center items-center transition-colors
            ${prop.isOpen ? "visible bg-black/50" : "invisible"}
        `}>
        <div className="border rounded-2xl flex flex-col h-5/6 max-h-5/6 max-w-lvh min-w-lvh bg-black w-fit p-5 overflow-y-auto">
            <div className="flex w-full justify-between">
                {/* <h1 className="text-3xl text-white">Bill</h1> */}
                <img className="h-5/6 w-3/12" src={sanjhikala_logo} alt="Sanjhikala Logo" />
                <MdClose className="cursor-pointer" onClick={prop.setModal} />
            </div>
            <div className="flex-grow">
                <div className="grid grid-cols-[auto_1fr] gap-4 border-b py-1 mt-2">
                    <div><h1>Customer Name </h1></div>
                    <div><input name="customer_name_ip_field" onChange={customerNameHandler} className={`border px-2 rounded-sm ${noScrollStyle}`} type="text" placeholder="Name" /></div>
                    <div><h1>Customer Phone </h1></div>
                    <div> <input id="phone_input_field" onChange={customerPhoneHandler} className="border rounded-sm px-2 py-0.5 mb-4 text-amber-50" type="text" placeholder={`Phone`} maxLength={10}/></div>
                </div>

                    {billData.map((value) => {
                        return (
                            <div key={value.productId} className="flex justify-between items-center">
                                <div className="grid grid-cols-[auto_1fr] gap-4 w-fit border-b py-1 mt-2">
                                    <div><h1>Product Name </h1></div>
                                    <div><input name="product_name_ip_field" onChange={(e) => { productNameHandler(e, value.productId) }} className={`border px-2 rounded-sm ${noScrollStyle}`} type="text" placeholder="Product Name" /></div>
                                    <div><h1>Stitching Cost </h1></div>
                                    <div><input name="stitching_cost" onChange={(e) => { stitchCostHandler(e, value.productId) }} className={`border px-2 rounded-sm w-3/6 ${noScrollStyle}`} type="number" placeholder="0.0" /></div>
                                    <div><h1>Cloth Cost </h1></div>
                                    <div><input name="cloth_cost" onChange={(e) => { clothCostHandler(e, value.productId) }} className={`border px-2 rounded-sm w-3/6 ${noScrollStyle}`} type="number" placeholder="0.0" /></div>
                                    <div><h1>Other Costs </h1></div>
                                    <div><input name="other_cost" onChange={(e) => otherCostHandler(e, value.productId)} className={`border px-2 rounded-sm w-3/6 ${noScrollStyle}`} type="number" placeholder="0.0" /></div>
                                    <div><h1>Quantity </h1></div>
                                    <div><input name="other_cost" onChange={(e) => unitsHandler(e, value.productId)} className={`border px-2 mb-1 rounded-sm w-3/6 ${noScrollStyle}`} type="number" placeholder="x1" /></div>
                                </div>
                                <MdDeleteForever className="mr-6 text-3xl text-red-700 bg-neutral-00 rounded-sm cursor-pointer" onClick={() => removeProductHandler(value.productId)} />
                            </div>
                        )
                    })}
                    <div onClick={addProductHandler} className="border text-center rounded-2xl m-2 p-1.5 cursor-pointer hover:bg-[#f69400] hover:text-amber-50 w-fit">Add Product</div>
                </div>
                <div className="flex justify-between">
                    <div className="flex mt-3 ">Total Amount :<div className="ml-2">₹{totalAmount}</div></div>
                    {/* <PrintBill productName={productName} stitchCost={stitchCost} clothCost={clothCost} otherCost={otherCost} quantity={units} totalAmount={finalPrice} /> */}
                    <PrintBill customerName={customerName} customerPhone={customerPhone}/>
                </div>
            </div>
        </div>)
}

        export default GenerateBillModal