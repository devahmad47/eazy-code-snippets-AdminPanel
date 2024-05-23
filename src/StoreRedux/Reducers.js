import { combineReducers } from "redux";
import adminSlice from "./adminSlice";
import appointmentSlice from "./appointmentSlice";
import productSlice from "./productSlice";
import careerSlice from "./careerSlice";
const rootReducer = combineReducers({
  admin:adminSlice,
  appointment:appointmentSlice,
  product:productSlice,
  career:careerSlice
});

export default rootReducer;