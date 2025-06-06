import { createSlice } from "@reduxjs/toolkit";

interface DimensionMap {
  items: Array<[string, string]>;
}

const initialState: DimensionMap = {
  items: [
    ["Length", "length"],
    ["Shoulder", "shoulder"],
    ["Upper Chest", "upper_chest"],
    ["Chest", "chest"],
    ["Waist", "waist"],
    ["Hip", "hip"],
    ["Sleeves", "sleeves"],
    ["Neck Front", "neck_front"],
    ["Neck Back", "neck_back"],
    ["Armhole", "armhole"],
    ["Bottom", "bottom"]
  ],
};

export const dimensionSlice = createSlice({
    name:"dimensionsData",
    initialState,
    reducers:{}
})

export default dimensionSlice.reducer

