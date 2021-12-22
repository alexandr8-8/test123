import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { changeSearch } from "App/Main/News/newsSlice";
import { IActiveTab } from "types";
import { changeBookmark, bookmarksSelector } from "App/Header/tabSlice";

const HeaderComponent = styled.header`
  display: flex;
  height: 83px;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 480px) {
    margin-top: 10px;
    flex-direction: column-reverse;
    align-items: stretch;
  }
`;

const Tabs = styled.div`
  display: flex;
  column-gap: 20px;
`;

const Tab = styled.div`
  cursor: pointer;
  font-family: Ubuntu;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 32px;
  color: #ffffff;

  ${(props: { active?: boolean }) =>
    !props.active &&
    css`
      opacity: 0.5;
    `};
`;

const Iput = styled.input`
  color: #686868;
  font-family: Ubuntu;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  background: #191818;
  border: 0px;
  padding: 8px;
  outline: none;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export function Header() {
  const dispatch = useDispatch();
  const tab = useSelector(bookmarksSelector);

  // ! add debounce fn
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearch(e.target.value));
  };

  const handleClick = (tab: IActiveTab) => {
    dispatch(changeBookmark(tab));
  };

  return (
    <HeaderComponent>
      <Tabs className="tabs">
        <Tab active={tab === "news"} onClick={() => handleClick("news")}>
          News
        </Tab>
        <Tab
          active={tab === "bookmark"}
          onClick={() => handleClick("bookmark")}
        >
          Bookmarks
        </Tab>
      </Tabs>
      <div>
        <Iput type="text" placeholder="Search" onChange={handleChange} />
      </div>
    </HeaderComponent>
  );
}

export default Header;
