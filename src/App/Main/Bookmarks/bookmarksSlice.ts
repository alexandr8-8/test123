import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "appRedux";
import { IBookmark, INews } from "types";

const initialState = { value: [], page: 1 } as {
  value: IBookmark[];
  page: number;
};

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    changePageNumber(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    changeBookmark(state, action: PayloadAction<INews["id"]>) {
      const id = action.payload;

      state.value = state.value.includes(id)
        ? state.value.filter((i: INews["id"]) => i !== id)
        : [...state.value, id];
    },
  },
});

const globalBookmarksSelector = (state: RootState) => state.bookmarks;

export const bookmarksSelector = createSelector(
  globalBookmarksSelector,
  ({ value }) => value,
);

export const pageSelector = createSelector(
  globalBookmarksSelector,
  ({ page }) => page,
);

export const { changeBookmark, changePageNumber } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
