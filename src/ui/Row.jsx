import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${(props) =>
    // @ts-ignore
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    // @ts-ignore
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  // @ts-ignore
  type: "vertical",
};

export default Row;
