import { configureStore } from "@reduxjs/toolkit";
import customersReducer from "./features/customers/customerSlice";
import categoryReducer from "./features/category/categorySlice";
import dimensionReducer from "./features/dimensions/dimensionSlice";
import workReducer from "./features/orders/workSlice";
export const store = configureStore({
  reducer: {
    customers: customersReducer,
    categories: categoryReducer,
    dimensions: dimensionReducer,
    work: workReducer,
  },
});

//Because getState returns an object and we want to know the type of object that it returns so that we can read the values easily
export type GetState = ReturnType<typeof store.getState>;

export type Dispatch = typeof store.dispatch;
