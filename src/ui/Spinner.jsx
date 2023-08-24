import styled, { keyframes } from "styled-components"
import { BiLoaderAlt } from "react-icons/bi"

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`

const StyledSpinner = styled(BiLoaderAlt)`
  width: 5.2rem;
  height: 5.2rem;
  animation: ${rotate} 1.5s infinite linear;
`

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export default function Spinner() {
  return (
    <SpinnerContainer>
      <StyledSpinner />
    </SpinnerContainer>
  )
}
