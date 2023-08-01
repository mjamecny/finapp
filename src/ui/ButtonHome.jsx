import styled from "styled-components"
import { FaHome } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const StyledButtonHome = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;

  & svg {
    width: 25px;
    height: 25px;
    color: #f8f9fa;
  }
`

export default function ButtonHome() {
  const navigate = useNavigate()

  return (
    <StyledButtonHome>
      <FaHome onClick={() => navigate("/")} />
    </StyledButtonHome>
  )
}