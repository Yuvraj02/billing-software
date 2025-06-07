import { useEffect, useState } from "react"
import type { CategoryModel } from "../models/CategoryModel"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

function AddCategory() {

    const sizeParams = ['Length', 'Shoulder', 'Upper Chest', 'Chest', 'Waist', 'Hip', 'Sleeves', 'Neck Front','Neck Back', 'Armhole', 'Bottom']
    const [selectedSizeParams, setSelectedSizeParams] = useState<string[]>([])
    // const [categoryModel, setCategory] = useState<CategoryModel>({})
    const [categoryName, setCategoryName] = useState<string>('')


    const addNewCategory = useMutation({
        mutationKey:['addNewCategory'],
        mutationFn: async (categoryModel:CategoryModel)=>{
                const response = await axios.post(`http://localhost:3000/add_category`,categoryModel)
                return response.data
        }
    })

    const categoryMap = new Map<string,string>([
    ["Length", "length"],
    ["Shoulder", "shoulder"],
    ["Upper Chest", "upper_chest"],
    ["Chest", "chest"],
    ["Waist", "waist"],
    ["Hip", "hip"],
    ["Sleeves", "sleeves"],
    ["Neck Front", "neck_front"],
    ["Neck Back","neck_back"],
    ["Armhole", "armhole"],
    ["Bottom", "bottom"],
    ])
    

    const handleAddCategory = ()=>{

        const newCategoryModel : CategoryModel = {category_name:categoryName}
        
        selectedSizeParams.map((value)=>{
            const key = categoryMap.get(value)
            newCategoryModel[key!]=value
        })

        addNewCategory.mutate(newCategoryModel) 
    } 

    const handleSelection = (event:React.ChangeEvent<HTMLInputElement>)=>{
     
        const {id,checked} = event.target

        setSelectedSizeParams(prevState => {
            if(checked){
                return [...prevState, id]
            }else{
               return selectedSizeParams.filter(paramID=>paramID !== id)
            }
        })
    }

    const handleCategoryNameInput = (e:React.ChangeEvent<HTMLInputElement>) => setCategoryName(e.target.value)

    useEffect(()=>{
        console.log(selectedSizeParams)
    })

    return (<><div className="m-15">
        <div className="text-xl border-b w-fit">Add New Category </div>
        <div className="mt-4 flex gap-2">
                <div className="text-xl">Category Name:</div>
                <input onChange={handleCategoryNameInput} value={categoryName} className="border-2 rounded text-xl px-2 w-44 "/>           
        </div>
        <div className="mt-4 text-xl border-b w-fit">Select Sizes for this Category : </div>
        <div className="mt-4 grid grid-cols-[auto_1fr]  gap-2 text-xl w-fit">

            {sizeParams.map((value,index)=>{
                return(<>
                    <div key={index} className="pb-0.5">{value}</div>
                    <input className={"ml-4 h-4 w-4"} type="checkbox" checked={selectedSizeParams.includes(value)} onChange= {handleSelection} id={value}/>
                </>)
            })}
        </div>
        <div onClick={handleAddCategory} className="flex justify-center"><button className="border mt-2 p-2 rounded-xl hover:bg-green-500 hover:text-amber-50 cursor-pointer">Add Category</button></div>
    </div></>)
}

export default AddCategory