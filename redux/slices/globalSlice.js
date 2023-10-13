import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  marchants: [],
  coupons: [],
  offers: [],
  brands: [],
};

export const globalSlice = createSlice({
  name: "cat",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setMarchants: (state, action) => {
      state.marchants = action.payload;
    },
    setCoupons: (state, action) => {
      state.coupons = action.payload;
    },
    setOffers: (state, action) => {
      state.offers = action.payload;
    },
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
  },
});

export const { setCategories, setMarchants, setCoupons, setOffers, setBrands } =
  globalSlice.actions;

export default globalSlice.reducer;
