import { createSlice } from "@reduxjs/toolkit";

const initialState = { blurHeader: false };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleBlurHeader(state) {
      state.blurHeader = !state.blurHeader;
    },
  },
});

export const uiActions = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
