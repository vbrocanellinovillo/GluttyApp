import { createSlice } from "@reduxjs/toolkit";
import { updateBranch } from "../services/commerceService";

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
      state.branches.find(branch => branch.id === branchId)
    }

  },
});

export const commerceActions = commerceSlice.actions;
export const commerceReducer = commerceSlice.reducer;
