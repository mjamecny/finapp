import styled from "styled-components"
import { FaHome } from "react-icons/fa"
import { Link } from "react-router-dom"

const StyledButtonHome = styled(Link)`
  display: flex;
  justify-content: center;
  cursor: pointer;

  & svg {
    width: 25px;
    height: 25px;
    color: var(--color-grey-font-900);
  }
`

export default function ButtonHome() {
  return (
    <StyledButtonHome to="/">
      <FaHome />
    </StyledButtonHome>
  )
}
