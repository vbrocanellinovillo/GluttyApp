import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: undefined,
  image: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  isCommerce: undefined,
  isAdmin: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.userData = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.image = action.payload.image;
      state.isCommerce = action.payload.isCommerce;
      state.isAdmin = action.payload.isAdmin;
    },


    updateUser(state, action) {
      state.userData = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.image = action.payload.image;
    },

    setImage(state, actions) {
      state.image = actions.payload;
    },

    logout(state) {
      state.userData = undefined;
      state.image = undefined;
      state.accessToken = undefined;
      state.refreshToken = undefined;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
