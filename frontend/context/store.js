import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth";
import { uiReducer } from "./ui";

export const store = configureStore({
  reducer: { auth: authReducer, ui: uiReducer },
});
