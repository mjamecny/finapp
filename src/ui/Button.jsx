import styled, { css } from "styled-components"

const StyledButton = styled.button`
  background-color: transparent;
  color: var(--color-grey-font-900);
  border: 1px solid var(--color-grey-font-900);
  border-radius: 7px;
  font-weight: 600;
  cursor: pointer;
  align-self: center;

  ${(props) =>
    props.size === "medium" &&
    css`
      padding: 1.2rem 4.8rem;
    `}

  ${(props) =>
    props.size === "small" &&
    css`
      padding: 0.8rem 1.2rem;
    `}
`

export default function Button({ children, size, onClick }) {
  return (
    <StyledButton size={size} onClick={onClick}>
      {children}
    </StyledButton>
  )
}
