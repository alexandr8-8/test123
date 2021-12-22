import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import Card from "../../common/Card";
import { lastNewsSelector } from "../newsSlice";

const LastNewsComponent = styled.aside`
  flex: 2;
`;

interface Props {
  onBookmarkChange: (id: number) => void;
}

export const LastNews: React.FC<Props> = ({ onBookmarkChange }) => {
  const { id, url, related, image, headline, datetime } =
    useSelector(lastNewsSelector);

  return (
    <LastNewsComponent>
      <Card
        id={id}
        ratio={1.31}
        headerText={related}
        image={image}
        url={url}
        datetime={datetime}
        description={headline}
        onBookmarkChange={onBookmarkChange}
      />
    </LastNewsComponent>
  );
};

export default LastNews;
