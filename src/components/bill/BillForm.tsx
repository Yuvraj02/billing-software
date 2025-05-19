import BillTable from "./BillTable"

function BillForm() {

    const labels:string[] = ['Kurta', 'Salvaar', 'Churidar', 'Pant', 'Plazo', 'Blouse']

    return (<>
    <div className="py-3">
        <div className="flex gap-2.5">
            {labels.map((value,index)=>{
                const idStr = `${value}_cb`
                return (<div key={index} className="flex gap-1">
                    <input  type="checkbox" id={idStr} name={value} title={value}/>
                    <label  htmlFor={idStr}>{value}</label>
                </div>)
            })}
        </div>
        <BillTable/>
    </div>
    </>)

}

export default BillForm