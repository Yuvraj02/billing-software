import { createSlice } from "@reduxjs/toolkit";
import type { CategoryModel } from "../../models/CategoryModel";

const initialState = {
  categories: [
    { category_id: -1, category_name: "None" },
    {
      category_id: 0,
      category_name: "Kurta",
      length: "Length",
      upper_neck: "Upper Neck",
      upper_chest: "Upper Chest",
      chest: "Chest",
      waist: "Waist",
      hip: "Hip",
    },

    {
      category_id: 0,
      category_name: "Salvaar",
      length: "Length",
      botom: "Bottom",
    },
  ] as CategoryModel[],
};

const categorySlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
});

export default categorySlice.reducer;
