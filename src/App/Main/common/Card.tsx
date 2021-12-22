import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { format } from "date-fns";
import { ReactComponent as BookMarkSvg } from "assets/img/bookmark.svg";
import { bookmarksSelector } from "App/Main/Bookmarks/bookmarksSlice";

interface Props {
  id: number;
  ratio?: number;
  headerText: string;
  image: string;
  description: string;
  datetime: number;
  url: string;
  onBookmarkChange: (id: number) => void;
}

const CardComponent = styled.article<Required<Pick<Props, "ratio" | "image">>>`
  position: relative;
  overflow: hidden;
  border-radius: 3%;
  height: 0;
  padding-top: 100%;

  &:before {
    content: " ";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    ${({ image }) =>
      css`
        background-image: url(${image});
      `};
  }

  ${({ ratio }) =>
    css`
      padding-top: ${ratio * 100}%;
    `};
`;

const Content = styled.div`
  display: flex;
  padding: 25px;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 50px);
  height: calc(100% - 50px);
`;

const Header = styled.div`
  span {
    font-family: Ubuntu;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 11px;
    color: #ffffff;
    border: 1px solid #fff;
    border-radius: 10% / 50%;
    padding: 2px 6px;
  }
`;

const Footer = styled.div``;

const Bookmark = styled.div`
  font-family: Ubuntu;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;

  display: flex;
  justify-content: space-between;
`;

const BookmarkIcon = styled.div<{ active: boolean }>`
  cursor: pointer;

  ${({ active }) =>
    active &&
    css`
      svg {
        path {
          stroke: #2da44e;
          stroke-width: 7px;
        }
      }
    `};
`;

const Description = styled.span`
  font-family: Ubuntu;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 20px;
  max-height: 84px;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Link = styled.a`
  text-decoration: none;
`;

const Card: React.FC<Props> = ({
  id,
  ratio = 1,
  headerText,
  image,
  description,
  datetime,
  url,
  onBookmarkChange,
}) => {
  const bookmarks = useSelector(bookmarksSelector);
  const date = format(new Date(datetime * 1000), "dd MMM");

  const active = bookmarks.includes(id);

  return (
    <CardComponent ratio={ratio} image={image}>
      <Content>
        <Header>
          <span>{headerText}</span>
        </Header>
        <Footer>
          <Link href={url} target="_blank" rel="noreferrer">
            <Description style={{ color: "#fff" }}>{description}</Description>
          </Link>
          <Bookmark style={{ color: "#fff" }}>
            <div>{date}</div>
            <BookmarkIcon active={active} onClick={() => onBookmarkChange(id)}>
              <BookMarkSvg />
            </BookmarkIcon>
          </Bookmark>
        </Footer>
      </Content>
    </CardComponent>
  );
};

export default Card;
