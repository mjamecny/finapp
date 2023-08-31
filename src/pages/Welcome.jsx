import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

import { useUser } from "../features/authentication/useUser"

import Button from "../ui/Button"
import Logo from "../ui/Logo"
import FlexHorizontalCenter from "../ui/FlexHorizontalCenter"
import Spinner from "../ui/Spinner"
import Locale from "../ui/Locale"

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
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isAuthenticated, isLoading } = useUser()

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
  }, [isAuthenticated])

  if (isLoading) return <Spinner />

  return (
    <StyledWelcome>
      <Logo type="medium" />
      <Info>{t("welcome.info")}</Info>

      <FlexHorizontalCenter>
        {isAuthenticated ? null : (
          <>
            <Button onClick={() => navigate("/login")}>
              {t("welcome.login_button")}
            </Button>
            <Button onClick={() => navigate("/signup")}>
              {t("welcome.sign_up_button")}
            </Button>
          </>
        )}
      </FlexHorizontalCenter>
      <FlexHorizontalCenter>
        <Locale />
      </FlexHorizontalCenter>
    </StyledWelcome>
  )
}
