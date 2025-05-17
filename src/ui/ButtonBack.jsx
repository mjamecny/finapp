import styled from "styled-components"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { Link } from "react-router-dom"

const StyledButtonBack = styled(Link)`
  // display: flex;
  // justify-content: center;
  margin: 0 auto;
  cursor: pointer;
  outline-offset: 6px;

  & svg {
    width: 25px;
    height: 25px;
    color: var(--color-grey-font-900);
  }
`

export default function ButtonBack() {
  return (
    <StyledButtonBack to="/dashboard">
      <AiOutlineArrowLeft />
    </StyledButtonBack>
  )
}
