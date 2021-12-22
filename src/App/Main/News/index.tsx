import { useDispatch, useSelector } from "react-redux";
import LatestNews from "./LatestNews";
import List from "../common/List";
import {
  availableNewsSelector,
  pageSelector,
  changePageNumber,
} from "./newsSlice";
import { changeBookmark } from "App/Main/Bookmarks/bookmarksSlice";
import { INews } from "types";
import { RootState } from "appRedux";

const IMAGE_RATIO = 1.51;
const ITEM_PER_ROW = 3;
const ROWS = 2;

export function News() {
  const dispatch = useDispatch();
  const news = useSelector(availableNewsSelector);
  const page = useSelector(pageSelector);

  const handlePaginationChange = (page: RootState["news"]["page"]) => {
    dispatch(changePageNumber(page));
  };

  const handleBookmarkChange = (id: INews["id"]) => {
    dispatch(changeBookmark(id));
  };

  if (!news.length) {
    // render loading
    return null;
  }

  // ! change data to smth. like posts
  return (
    <>
      <LatestNews onBookmarkChange={handleBookmarkChange} />
      <List<INews>
        data={news}
        ratio={IMAGE_RATIO}
        items_per_row={ITEM_PER_ROW}
        rows={ROWS}
        page={page}
        onPaginationChange={handlePaginationChange}
        onBookmarkChange={handleBookmarkChange}
      />
    </>
  );
}

export default News;
