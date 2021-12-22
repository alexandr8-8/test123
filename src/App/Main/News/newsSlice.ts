import {
  createSlice,
  //   createSelector,
  createEntityAdapter,
  createSelector,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "appRedux";
import { INews } from "types";
import { fetchNews } from "appRedux/middlewareThunk";
import { bookmarksSelector } from "App/Main/Bookmarks/bookmarksSlice";

const newsAdapter = createEntityAdapter<INews>();

const newsSlice = createSlice({
  name: "news",
  initialState: newsAdapter.getInitialState({
    page: 1,
    search: "",
  }),
  reducers: {
    changePageNumber(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    changeSearch(state, action: PayloadAction<string>) {
      state.page = 1;
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      newsAdapter.upsertMany(state, Object.values(action.payload));
    });
  },
});

const filterByText = (arr: INews[], search: string) => {
  const regex = new RegExp(search, "i");

  return arr.filter(
    ({ headline, summary }) => regex.test(headline) || regex.test(summary),
  );
};

const newsSelector = (state: RootState) => state.news;

const globalNewsSelector = newsAdapter.getSelectors<RootState>(newsSelector);

export const pageSelector = createSelector(newsSelector, ({ page }) => page);
export const searchSelector = createSelector(
  newsSelector,
  ({ search }) => search,
);

export const allNewsSelector = createSelector(
  globalNewsSelector.selectAll,
  (news) => news,
);

export const availableNewsSelector = createSelector(
  globalNewsSelector.selectAll,
  searchSelector,
  filterByText,
);

export const lastNewsSelector = createSelector(
  allNewsSelector,
  (news) => news[news.length - 1],
);

export const bookmarkedNewsSelector = createSelector(
  allNewsSelector,
  bookmarksSelector,
  (news, bookmarks) => {
    return news.filter(({ id }) => bookmarks.includes(id));
  },
);

export const availableBookmarkedNewsSelector = createSelector(
  bookmarkedNewsSelector,
  searchSelector,
  filterByText,
);

// export const allNews = () => globalNewsSelector.selectAll;

export { fetchNews };
export const { changePageNumber, changeSearch } = newsSlice.actions;
export default newsSlice.reducer;
