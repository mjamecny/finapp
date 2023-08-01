import styled from "styled-components"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { useNavigate } from "react-router-dom"

const StyledButtonBack = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;

  & svg {
    width: 25px;
    height: 25px;
    color: #f8f9fa;
  }
`

export default function ButtonBack() {
  const navigate = useNavigate()

  return (
    <StyledButtonBack>
      <AiOutlineArrowLeft onClick={() => navigate("/")} />
    </StyledButtonBack>
  )
}
