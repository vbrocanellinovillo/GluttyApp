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
    image:
      "https://pbs.twimg.com/profile_images/1605246082144997381/2H9mNjaD_400x400.jpg",
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
