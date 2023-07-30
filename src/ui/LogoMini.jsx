import { FaDollarSign } from "react-icons/fa"
import styled from "styled-components"

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  color: #f8f9fa;
  gap: 0.2rem;

  & svg {
    width: 3.6rem;
    height: 3.6rem;
  }
`

export default function LogoMini() {
  return (
    <StyledLogo>
      <FaDollarSign />
      <p>finapp</p>
    </StyledLogo>
  )
}
