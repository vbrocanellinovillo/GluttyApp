import { createSlice } from "@reduxjs/toolkit";

const initialState = { route: "Home" };

const routeSlice = createSlice({
  name: "router",
  initialState,
  reducers: {
    setRoute(state, action) {
      state.route = action.payload.route;
    },
  },
});

export const routerActions = routeSlice.actions;
export const routerReducer = routeSlice.reducer;
