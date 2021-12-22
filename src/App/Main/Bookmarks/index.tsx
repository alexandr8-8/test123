import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import List from "../common/List";
import { INews } from "types";
import { availableBookmarkedNewsSelector } from "App/Main/News/newsSlice";
import {
  changeBookmark,
  changePageNumber,
  pageSelector,
} from "App/Main/Bookmarks/bookmarksSlice";
import { RootState } from "appRedux";

const IMAGE_RATIO = 1.51;
const ITEM_PER_ROW = 5;
const TABLET_ITEM_PER_ROW = 3;
const MOBILE_ITEM_PER_ROW = 1;
const ROWS = 2;

const Text = styled.h1`
  color: #fff;
  font-size: 20px;
  margin: 0 auto;
`;

export function Bookmarks() {
  const dispatch = useDispatch();
  const page = useSelector(pageSelector);
  const bookmarkedNews = useSelector(availableBookmarkedNewsSelector);

  const handlePaginationChange = (page: RootState["news"]["page"]) => {
    dispatch(changePageNumber(page));
  };

  const handleBookmarkChange = (id: INews["id"]) => {
    dispatch(changeBookmark(id));
  };

  if (!bookmarkedNews.length) {
    return <Text>You don't have bookmarks</Text>;
  }

  return (
    <List<INews>
      data={bookmarkedNews}
      ratio={IMAGE_RATIO}
      items_per_row={ITEM_PER_ROW}
      tablet_items_per_row={TABLET_ITEM_PER_ROW}
      mobile_items_per_row={MOBILE_ITEM_PER_ROW}
      rows={ROWS}
      page={page}
      onPaginationChange={handlePaginationChange}
      onBookmarkChange={handleBookmarkChange}
    />
  );
}

export default Bookmarks;
