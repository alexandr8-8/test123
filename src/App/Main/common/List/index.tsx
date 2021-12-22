import styled, { css } from "styled-components";
import { INews } from "types";
import Card from "../Card";
import Pagination from "./Pagination";

interface ItemsPerRow {
  items_per_row?: number;
  tablet_items_per_row?: number;
  mobile_items_per_row?: number;
}

interface Props<T> extends ItemsPerRow {
  rows: number;
  page: number;
  ratio: number;
  data: T[];
  onPaginationChange: (page: number) => void;
  onBookmarkChange: (id: number) => void;
}

const ListComponent = styled.div`
  flex 4;

  @media (min-width: 480px) and (max-width: 1024px) {
    flex: 3;
  }
`;

const Cards = styled.div<Required<ItemsPerRow>>`
  display: grid;

  gap: 18px;

  ${({ items_per_row, tablet_items_per_row, mobile_items_per_row }) =>
    css`
      ${items_per_row &&
      `grid-template-columns: repeat(${items_per_row}, 1fr)`};

      @media (min-width: 480px) and (max-width: 1024px) {
        ${tablet_items_per_row &&
        `grid-template-columns: repeat(${tablet_items_per_row}, 1fr)`};
      }

      @media (max-width: 480px) {
        ${mobile_items_per_row &&
        `grid-template-columns: repeat(${mobile_items_per_row}, 1fr)`};
      }
    `};
`;

// TODO: do we really need generic here?
export const List = <T extends INews>({
  ratio,
  items_per_row = 3,
  tablet_items_per_row = 2,
  mobile_items_per_row = 1,
  rows = 2,
  page,
  data,
  onPaginationChange,
  onBookmarkChange,
}: Props<T>) => {
  const items_per_page = items_per_row * rows;
  const currentPageNumber = page * items_per_page - items_per_page;
  const paginatedPosts = [...data].splice(currentPageNumber, items_per_page);

  return (
    <ListComponent>
      <Cards
        items_per_row={items_per_row}
        tablet_items_per_row={tablet_items_per_row}
        mobile_items_per_row={mobile_items_per_row}
      >
        {paginatedPosts.map(
          ({ id, related, image, headline, datetime, url }) => (
            <Card
              key={id}
              id={id}
              ratio={ratio}
              headerText={related}
              image={image}
              url={url}
              datetime={datetime}
              description={headline}
              onBookmarkChange={onBookmarkChange}
            />
          ),
        )}
      </Cards>
      <Pagination
        page={page}
        items_per_page={items_per_page}
        amountNumber={data.length}
        onPaginationChange={onPaginationChange}
      />
    </ListComponent>
  );
};

export default List;
