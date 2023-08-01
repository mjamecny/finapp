import styled from "styled-components"

const StyledButton = styled.button`
  background-color: transparent;
  color: var(--color-grey-font-900);
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-font-900);
  border-radius: 7px;
  font-weight: bold;
  cursor: pointer;
  align-self: center;
`

export default function Button({ children, onClick }) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>
}
