import { combineReducers } from "redux";
import adminSlice from "./adminSlice";
import appointmentSlice from "./appointmentSlice";
import productSlice from "./productSlice";
import careerSlice from "./careerSlice";
// import authSlice from "./authSlice";
const rootReducer = combineReducers({
  admin:adminSlice,
  appointment:appointmentSlice,
  product:productSlice,
  career:careerSlice,
  // user:authSlice
});

export default rootReducer;