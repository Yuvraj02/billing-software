import type { CategoryModel } from "../models/CategoryModel"

function CategoryPage(categoryModel?:CategoryModel){
    return (<><div>{categoryModel!.category_name}</div></>)
}

export default CategoryPage