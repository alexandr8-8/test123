import { useEffect } from "react";
import styled from "styled-components";
import News from "./News";
import Bookmarks from "./Bookmarks";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "./News/newsSlice";
import { bookmarksSelector } from "App/Header/tabSlice";

const MainDiv = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 30px;

  @media (max-width: 480px) {
    flex-direction: column;
    margin-top: 5px;
  }
`;

export function Main() {
  const dispatch = useDispatch();
  const tab = useSelector(bookmarksSelector);

  const getNews = async () => {
    dispatch(fetchNews());
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <MainDiv>
      {tab === "news" && <News />}
      {tab === "bookmark" && <Bookmarks />}
    </MainDiv>
  );
}

export default Main;
