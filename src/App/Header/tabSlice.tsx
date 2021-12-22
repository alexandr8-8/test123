import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "appRedux";
import { IActiveTab } from "types";

const initialState = { value: "news" } as { value: IActiveTab };

const tabSlice = createSlice({
  name: "activeTab",
  initialState,
  reducers: {
    changeBookmark(state, action: PayloadAction<IActiveTab>) {
      state.value = action.payload;
    },
  },
});

export const bookmarksSelector = (state: RootState) => state.activeTab.value;

export const { changeBookmark } = tabSlice.actions;
export default tabSlice.reducer;
