import { createSlice } from "@reduxjs/toolkit";
import type { DimensionModel } from "../../models/DimensionModel";

const initialState = {
  customerDimensions: [
    {
      customer_id: 3204,
      customer_name: "Yuvraj",
      customer_phone: "8770805985",
      length: 12.5,
      chest: 43,
      bottom: 13,
    },
    {
      customer_id: 2,
      customer_name: "Customer 2",
      customer_phone: "8888888888",
      shoulder: 35,
      neck_front: 3.5,
      armhole: 20,
    },
    {
      customer_id: 1,
      customer_name: "Customer 1",
      customer_phone: "8827445405",
      length: 12.5,
      chest: 43,
      bottom: 13,
    },
    {
      customer_id: 6,
      customer_name: "Jake",
      customer_phone: "8271231123",
      shoulder: 35,
      neck_front: 3.5,
      armhole: 20,
    },
  ] as DimensionModel[],
};

const dimensionsInitialState = {
  dimensionsLabel: [
    ["Length", "length"],
    ["Shoulder", "shoulder"],
    ["Upper Chest", "upper_chest"],
    ["Chest", "chest"],
    ["Waist", "waist"],
    ["Hip", "hip"],
    ["Sleeves", "sleeves"],
    ["Neck Front", "neck_front"],
    ["Neck Back"],
    ["neck_back"],
    ["Armhole", "armhole"],
    ["Bottom", "bottom"],
  ],
};

export const dimensionSlice = createSlice({
  name: "dimensionsData",
  initialState: [initialState, dimensionsInitialState],
  reducers: {},
});

export default dimensionSlice.reducer;
