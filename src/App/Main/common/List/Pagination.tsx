import styled, { css } from "styled-components";
import { clamp } from "helpers/number";

const PaginationComponent = styled.footer`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const PaginationNumber = styled.div`
  font-family: Ubuntu;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 21px;
  color: #fff;
`;

const Amount = styled.span`
  color: #fff;
  opacity: 0.25;
`;

const Button = styled.button`
  cursor: pointer;
  background: #3c3c3c;
  border-radius: 10% / 50%;
  border: 0;
  font-family: Ubuntu;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 11px;
  text-transform: uppercase;
  color: #ffffff;
  padding: 5px 30px;

  ${(props: { previous?: boolean }) =>
    props.previous &&
    css`
      margin-right: 10px;
    `};
`;

interface Props {
  page: number;
  items_per_page: number;
  amountNumber: number;
  onPaginationChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  page,
  items_per_page,
  amountNumber,
  onPaginationChange,
}) => {
  const handlePrev = () => {
    if (page === 1) return;

    onPaginationChange(page - 1);
  };
  const handleNext = () => {
    if (page * items_per_page >= amountNumber) return;

    onPaginationChange(page + 1);
  };

  const startNumber = page * items_per_page - items_per_page + 1;
  const endNumber = clamp(page * items_per_page, items_per_page, amountNumber);

  return (
    <PaginationComponent>
      <PaginationNumber>
        <span>
          {startNumber}-{endNumber}
        </span>
        <Amount> out of {amountNumber}</Amount>
      </PaginationNumber>

      <div>
        <Button previous onClick={handlePrev}>
          previous
        </Button>
        <Button onClick={handleNext}>next</Button>
      </div>
    </PaginationComponent>
  );
};

export default Pagination;
