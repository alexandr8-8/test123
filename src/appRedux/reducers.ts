import newsSlice from "App/Main/News/newsSlice";
import bookmarksReducer from "App/Main/Bookmarks/bookmarksSlice";
import activeTabReducer from "App/Header/tabSlice";

export const rootReducer = {
  news: newsSlice,
  bookmarks: bookmarksReducer,
  activeTab: activeTabReducer,
};

export default rootReducer;
