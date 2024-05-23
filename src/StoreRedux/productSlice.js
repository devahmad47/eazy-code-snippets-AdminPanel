import { createSlice } from "@reduxjs/toolkit";
export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
  },
  reducers: {

    Addproduct: (state, action) => {
      state.products = action.payload;
    },
    AddNewproduct: (state, action) => {
      console.log(action.payload);
      state.products = [action.payload,...state.products];
    },
    updateproducts: (state, action) => {
      let data = action.payload;
      console.log(data)
      let index = state.products.findIndex((obj) => obj._id === data._id)
      if (index !== -1) {
        state.products[index] = data;
      }
    },
    deleteproduct: (state, action) => {
      let id = action.payload;
      const updatedproducts = state.products.filter(function (product) {
        return product._id !== id;
      });
      state.products = updatedproducts;
    },

  },
});

export const selectproducts = (state) => state.product.products;

export const { Addproduct, updateproducts, deleteproduct, AddNewproduct } = productSlice.actions; 
export default productSlice.reducer;
