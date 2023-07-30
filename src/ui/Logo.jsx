import { FaDollarSign } from "react-icons/fa"
import styled from "styled-components"

const StyledLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5.2rem;
  color: #f8f9fa;
`

export default function Logo() {
  return (
    <StyledLogo>
      <FaDollarSign />
      <p>finapp</p>
    </StyledLogo>
  )
}
