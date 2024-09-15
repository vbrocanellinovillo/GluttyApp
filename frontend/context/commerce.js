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
      const newBranch = action.payload.branch;
      console.log("PrintLaBranch?")
      console.log(newBranch)
      // Encuentra el índice de la sucursal que quieres actualizar
      const branchIndex = state.branches.findIndex(branch => branch.id === newBranch.id);
      
      if (branchIndex !== -1) {
        // Si se encuentra la sucursal, reemplázala con la nueva
        state.branches[branchIndex] = newBranch;
      }
    }

  },
});

export const commerceActions = commerceSlice.actions;
export const commerceReducer = commerceSlice.reducer;
