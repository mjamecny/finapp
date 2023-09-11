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
import Heading from "../ui/Heading"

const StyledWelcome = styled.div`
  display: flex;
  flex-direction: column;
  padding-block: 1.8rem;
  height: 100vh;
  gap: 2rem;
`
const Info = styled.p`
  font-size: 1.8rem;
  color: #868e96;
`

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-inline: 2rem;
  gap: 1.2rem;
`

const WelcomeImage = styled.img`
  width: 60%;
`

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
`

const ActionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin-top: auto;
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
      <ImageBox>
        <WelcomeImage src="./welcome_image.svg" alt="Person with graphs" />
      </ImageBox>

      <TextBox>
        <Heading as="h1">{t("welcome.heading")}</Heading>
        <Info>{t("welcome.info")}</Info>
      </TextBox>
      <ActionBox>
        <FlexHorizontalCenter>
          <Locale type="welcome" />
        </FlexHorizontalCenter>
        <FlexHorizontalCenter>
          {isAuthenticated ? null : (
            <>
              <Button size="medium" to="/login">
                {t("welcome.login_button")}
              </Button>
              <Button size="medium" to="/signup">
                {t("welcome.sign_up_button")}
              </Button>
            </>
          )}
        </FlexHorizontalCenter>
      </ActionBox>
    </StyledWelcome>
  )
}
