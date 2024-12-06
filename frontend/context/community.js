import { createSlice } from "@reduxjs/toolkit";

const initialState = { results: [] };

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    addResult(state, action) {
      const result = action.payload?.result;
      const index = state.results.findIndex((r) => r.id === result.id);
      if (index === -1) {
        state.results.push(result);
      }
    },

    removeResult(state, action) {
      const result = action.payload?.result;
      const filteredResults = state.results.filter((r) => r.id !== result.id);
      state.results = filteredResults;
    },
  },
});

export const communityActions = communitySlice.actions;
export const communityReducer = communitySlice.reducer;
