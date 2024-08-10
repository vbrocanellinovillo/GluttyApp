import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userData: {
    nombreUsuario: "gon",
    nombre: "gon",
    apellido: "gon",
    sexo: "gon",
    fechaNacimiento: "gon",
    email: "gon",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.userData = action.payload;
    },

    updateUser(state, action) {
      state.userData = action.payload;
    },

    logout(state) {
      state.isAuthenticated = false;
      state.userData = undefined;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
