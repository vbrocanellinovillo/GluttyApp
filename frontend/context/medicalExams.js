import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  analysisNumber: undefined,
};

const medicalExamsSlice = createSlice({
  name: "medicalExams",
  initialState,
  reducers: {
    increaseNumber(state) {
      state.analysisNumber += 1;
    },

    decreaseNumber(state) {
      state.analysisNumber -= 1;
    },

    setAnalysisNumber(state, action) {
      state.analysisNumber = action.payload.number;
    },
  },
});

export const medicalExamsActions = medicalExamsSlice.actions;
export const medicalExamsReducer = medicalExamsSlice.reducer;
