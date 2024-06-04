import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth";
import { routerReducer } from "./route";

export const store = configureStore({
  reducer: { auth: authReducer, router: routerReducer },
});
