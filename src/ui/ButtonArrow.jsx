import styled from "styled-components"
import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"

const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.4rem;
  font-size: 1.4rem;
  color: var(--color-grey-font-900);
  outline-offset: 6px;

  a {
    text-decoration: none;
    color: var(--color-grey-font-900);
    cursor: pointer;
  }
`

export default function ButtonArrow({ children, to }) {
  return (
    <StyledButton>
      <FaArrowRight />
      <Link to={to}>{children}</Link>
    </StyledButton>
  )
}
