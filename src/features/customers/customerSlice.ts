// import { CustomerModel } from "../../models/CustomerModel"

import { createSlice } from "@reduxjs/toolkit";
import type { CustomerModel } from "../../models/CustomerModel";
//import { CustomerModel } from "../../models/CustomerModel";

const initialState = {
  customersData: [
    {
      customer_id: 0,
      name: "Yuvraj Singh Bhadoria",
      email: "yuvrajsinghbhadoria@gmail.com",
      phone: "8770805985",
    },
    {
      customer_id: 1,
      name: "John",
      email: "test234@gmail.com",
      phone: "9120303425",
    },
  ] as CustomerModel[],
};

export const customerSlice = createSlice({
  name: "customersData",
  initialState,
  reducers: {},
});

export default customerSlice.reducer;
