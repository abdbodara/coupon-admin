import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../../slices/authSlice";
import globalReducer from "../../slices/globalSlice";
import { authApi } from "@/redux/api/auth";

const rootReducer = combineReducers({
  auth: authReducer,
  cat: globalReducer,
  [authApi.reducerPath]: authApi.reducer,
});

export default rootReducer;
