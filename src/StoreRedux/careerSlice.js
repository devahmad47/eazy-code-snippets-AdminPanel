import { createSlice } from "@reduxjs/toolkit";
export const careerSlice = createSlice({
  name: "career",
  initialState: {
    careers: [],
  },
  reducers: {

    Addcareer: (state, action) => {
      state.careers = action.payload;
    },
    updatecareers: (state, action) => {
      let data = action.payload;
      console.log(data)
      let index = state.careers.findIndex((obj) => obj._id === data._id)
      if (index !== -1) {
        state.careers[index] = data;
      }
    },
    deletecareer: (state, action) => {
      let id = action.payload;
      const updatedcareers = state.careers.filter(function (product) {
        return product._id !== id;
      });
      state.careers = updatedcareers;
    },

  },
});

export const selectcareers = (state) => state.career.careers;

export const { Addcareer, updatecareers, deletecareer} = careerSlice.actions; 
export default careerSlice.reducer;