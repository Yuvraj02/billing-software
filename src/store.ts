import { configureStore } from "@reduxjs/toolkit";
import customersReducer from "./features/customers/customerSlice";
import categoryReducer from "./features/category/categorySlice";
import dimensionReducer from "./features/dimensions/dimensionSlice";
import workReducer from "./features/orders/workSlice";
import {noScrollSlice} from "./features/orders/generate_bill/billModalSlice"
import { printDataSlice } from "./features/orders/generate_bill/billModalSlice";
export const store = configureStore({
  reducer: {
    customers: customersReducer,
    categories: categoryReducer,
    dimensions: dimensionReducer,
    work: workReducer,
    noScroll:noScrollSlice.reducer,
    printData:printDataSlice.reducer
  },
});

//Because getState returns an object and we want to know the type of object that it returns so that we can read the values easily
export type GetState = ReturnType<typeof store.getState>;

export type Dispatch = typeof store.dispatch;
