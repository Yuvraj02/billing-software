
import type { CategoryModel } from "../../../models/CategoryModel"

function DimensionTable({ categoryModel }: { categoryModel?: CategoryModel }) {

    //Because there is a possibility of user clicking on "None" we have to handle the case for NULL values being transferred
    if (categoryModel == undefined) return (<></>)

    return (<>

        <div className="p-4 grid grid-cols-[auto_1fr] overflow-y-auto">
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