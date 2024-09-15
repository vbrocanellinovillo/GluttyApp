import { createSlice } from "@reduxjs/toolkit";
import { updateBranch } from "../services/commerceService";
import { act } from "react";

const initialState = { branches: [] };

const commerceSlice = createSlice({
  name: "commerce",
  initialState,
  reducers: {
    setBranches(state, action) {
      state.branches = action.payload.branches;
    },

    addBranch(state, action) {
      const newBranch = action.payload.branch;
      state.branches = [...state.branches, newBranch];
    },

    updateBranch(state,action){
      const branch = action.payload.branch;
      newBranch = branch
    }

  },
});

export const commerceActions = commerceSlice.actions;
export const commerceReducer = commerceSlice.reducer;
