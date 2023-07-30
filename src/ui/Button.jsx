import styled, { css } from "styled-components"

const StyledButton = styled.button`
  background-color: transparent;
  color: #f8f9fa;
  padding: 0.8rem 1.2rem;
  border: 1px solid #f8f9fa;
  border-radius: 7px;
  font-weight: bold;
  cursor: pointer;
  align-self: center;
`

export default function Button({ children, onClick }) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>
}
