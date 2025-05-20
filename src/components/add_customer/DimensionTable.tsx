
import type { CategoryModel } from "../../models/CategoryModel"

function DimensionTable({ categoryModel }: { categoryModel?: CategoryModel }) {

    // const columnMappings = new Map<string | number, string>([
    //     ["category_id", "Category ID"],
    //     ["category_name", "Name"],
    //     ["length", "Length"],
    //     ["shoulder", "Shoulder"],
    //     ["sleeves", "Sleeves"],
    //     ["neck_front", "Neck Front"],
    //     ["upper_neck", "Upper Neck"],
    //     ["upper_chest", "Upper Chest"],
    //     ["chest", "Chest"],
    //     ["waist", "Waist"],
    //     ["hip", "Hip"]
    // ])

    //Because there is a possibility of user clicking on --Select Category-- we have to handle the case
    if (categoryModel == undefined) return (<></>)

    return (<>

        <div className="p-4 grid grid-cols-[auto_1fr] overflow-y-auto">
            {/* <div className="border p-2">Length </div>
            <div><input type="number" className="border p-2 w-3/12" placeholder="0.0"/></div> */}
            {Object.entries(categoryModel).map(([key, value]) => {
                if (key == "category_id" || key == "category_name") return (null)
                return (<>
                    <div className="border p-2">{value}</div>
                    <div><input type="number" className="border p-2 w-3/12" placeholder="0.0" /></div>
                </>)
            })}
        </div>

    </>)
}

export default DimensionTable