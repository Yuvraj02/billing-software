// import { CustomerModel } from "../../models/CustomerModel"

import { createSlice } from "@reduxjs/toolkit";
import type { CustomerModel } from "../../models/CustomerModel";
//import { CustomerModel } from "../../models/CustomerModel";


//Test {Dummy Data} for Customers Model
const initialState = {
  customersData: [
    {
      customer_id: 0,
      customer_name: "Yuvraj Singh Bhadoria",
      customer_email: "yuvrajsinghbhadoria@gmail.com",
      customer_ph: "8770805985",
    },
    {
      customer_id: 1,
      customer_name: "John",
      customer_email: "test234@gmail.com",
      customer_ph: "9120303425",
    },
  ] as CustomerModel[],
};

export const customerSlice = createSlice({
  name: "customersData",
  initialState,
  reducers: {},
});

export default customerSlice.reducer;
