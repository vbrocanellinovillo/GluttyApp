import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth";
import { uiReducer } from "./ui";
import { commerceReducer } from "./commerce";
import { communityReducer } from "./community";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    commerce: commerceReducer,
    community: communityReducer,
  },
});
