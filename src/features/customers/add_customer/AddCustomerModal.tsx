import { MdClose } from "react-icons/md"
import sanjhikala_logo from "../../../assets/sanjhikala_logo.jpg"
import AddCustomerForm from "./AddCustomerForm"
interface ModalProp {
    isOpen: boolean,
    onClose: () => void
}

function AddCustomerModal(prop: ModalProp) {

    return (<>
        <div className={`fixed inset-0 flex justify-center items-center transition-colors
            ${prop.isOpen ? "visible bg-black/50" : "invisible"}
        `}>
            <div className="border rounded-2xl flex flex-col h-5/6 max-h-5/6 max-w-lvh min-w-lvh bg-black w-fit p-5 overflow-y-auto">
                <div className="flex w-full justify-between">
                    {/* <h1 className="text-3xl text-white">Bill</h1> */}
                    <img className="h-5/6 w-3/12" src={sanjhikala_logo} alt="Sanjhikala Logo" />
                    <MdClose className="cursor-pointer" onClick={prop.onClose} />
                </div>

                <div className="flex-grow ">
                    <AddCustomerForm />
                </div>
                <div className="flex justify-end">
                    <div className="border rounded-2xl p-2 cursor-pointer hover:bg-green-800 hover:text-white">Add Customer</div>
                </div>
            </div>


        </div>
    </>)
}

export default AddCustomerModal