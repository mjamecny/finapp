import { useNavigate } from "react-router-dom"
import { useUser } from "../features/authentication/useUser"
import { useEffect } from "react"
import styled from "styled-components"

import Button from "../ui/Button"
import Logo from "../ui/Logo"
import FlexHorizontalCenter from "../ui/FlexHorizontalCenter"

const StyledWelcome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  gap: 8rem;
`
const Info = styled.p`
  font-size: 2rem;
  text-align: center;
  color: #ced4da;
`

export default function Welcome() {
  const navigate = useNavigate()
  const { isAuthenticated } = useUser()

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard")
  }, [isAuthenticated, navigate])

  return (
    <StyledWelcome>
      <Logo type="medium" />
      <Info>
        Track your financial transactions for three different accounts.
      </Info>
      <FlexHorizontalCenter>
        <Button onClick={() => navigate("/login")}>Login</Button>
        <Button onClick={() => navigate("/signup")}>Sign up</Button>
      </FlexHorizontalCenter>
    </StyledWelcome>
  )
}
