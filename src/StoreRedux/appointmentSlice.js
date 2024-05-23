import { createSlice } from "@reduxjs/toolkit";
export const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    appointments: [],
  },
  reducers: {

    Addappointment: (state, action) => {
      state.appointments = action.payload;
    },
    updateappointments: (state, action) => {
      let data = action.payload;
      console.log(data)
      let index = state.appointments.findIndex((obj) => obj._id === data._id)
      if (index !== -1) {
        state.appointments[index] = data;
      }
    },
    deleteappointment: (state, action) => {
      let id = action.payload;
      const updatedappointments = state.appointments.filter(function (product) {
        return product._id !== id;
      });
      state.appointments = updatedappointments;
    },

  },
});

export const selectappointments = (state) => state.appointment.appointments;

export const { Addappointment, updateappointments, deleteappointment} = appointmentSlice.actions; 
export default appointmentSlice.reducer;