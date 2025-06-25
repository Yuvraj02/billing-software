import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { BillModel } from "../../../models/BillModel"


const styleInitState = {
    noScroll: `[appearance:textfield]          /* Standard way for Firefox */
    [&::-webkit-outer-spin-button]:appearance-none /* For Webkit browsers (Chrome, Safari, Edge) */
    [&::-webkit-inner-spin-button]:appearance-none /* For Webkit browsers (Chrome, Safari, Edge) */`
}

const dataInitState = {
    printDataList: [] as BillModel[],
    totalAmount:0
}

// let idx :number = dataInitState.printDataList.length

export const noScrollSlice = createSlice({
    name: 'noScroll',
    initialState: styleInitState,
    reducers: {}
})

export const printDataSlice = createSlice({
    name: 'print_data',
    initialState: dataInitState,
    reducers: {
        addProduct: (state, action: PayloadAction<BillModel>) => {
            state.printDataList.push(action.payload)
        },

        removeProduct: (state, action: PayloadAction<string>) => {
            const productToRemove = state.printDataList.find(item=>item.productId===action.payload)

            if(productToRemove){
            state.totalAmount -= (productToRemove.clothCost + productToRemove.stitchingCost + productToRemove.otherCost)*productToRemove.qty
            }

            state.printDataList = state.printDataList.filter((currElem) => currElem.productId !== action.payload)
            
        },

        updateProduct: (state, action: PayloadAction<{ productId: string, fieldName: keyof BillModel, value: string | number }>) => {

            const { productId, fieldName, value } = action.payload

            const productToUpdate = state.printDataList.find(product => product.productId === productId)

            if (productToUpdate) {

                if (fieldName == 'productName') {
                    productToUpdate.productName = value as string
                } else {
                    productToUpdate[fieldName] = value as never
                }
            }
        },

        calculateTotal:(state)=>{
            // state.printDataList.map((value)=>state.totalAmount+=(value.clothCost+value.stitchingCost+value.otherCost)*value.qty)
            state.totalAmount = state.printDataList.reduce((sum,item)=>{
                return sum + (item.clothCost  + item.stitchingCost + item.otherCost) * item.qty
            },0)
        
        }
    }
}
)

// const totalAmountInitState = {
//     totalAmount:0
// }

// export const calculateTotalAmount = createSlice({
//     name:'calculate_total',
//     initialState:totalAmountInitState,
//     reducers:{
//         calculatePrice:(state)=>{
            
//         }
//     }
// })

export const { addProduct, removeProduct, updateProduct , calculateTotal} = printDataSlice.actions