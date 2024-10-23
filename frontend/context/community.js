import { createSlice } from "@reduxjs/toolkit";

const initialState = { tags: [] };

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    addTag(state, action) {
      const tag = action.payload?.tag;
      const index = state.tags.findIndex((t) => t.id === tag.id);
      if (index === -1) {
        state.tags.push(tag);
      }
    },

    removeTag(state, action) {
      const tag = action.payload?.tag;
      const filteredTags = state.tags.filter((t) => t.id !== tag.id);
      state.tags = filteredTags;
    },
  },
});

export const communityActions = communitySlice.actions;
export const communityReducer = communitySlice.reducer;
