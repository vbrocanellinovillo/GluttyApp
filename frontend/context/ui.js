import { createSlice } from "@reduxjs/toolkit";

const initialState = { blurHeader: false, medicalDetails: false };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleBlurHeader(state) {
      state.blurHeader = !state.blurHeader;
    },

    toggleMedicalDetails(state) {
      state.medicalDetails = !state.medicalDetails;
    },
  },
});

export const uiActions = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
