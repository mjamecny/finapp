import styled from "styled-components"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

import { useLogin } from "./useLogin"

import Form from "../../ui/Form"
import FormRow from "../../ui/FormRow"
import Input from "../../ui/Input"
import Button from "../../ui/Button"
import SpinnerMini from "../../ui/SpinnerMini"
import ButtonHome from "../../ui/ButtonHome"

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
  background-color: var(--color-grey-back-900);
  height: 100vh;
`

const StyledLink = styled(Link)`
  // display: flex;
  // justify-content: center;
  // align-items: center;
  outline-offset: 3px;
  margin: 0 auto;
  text-decoration: none;
  font-size: 1.2rem;
  color: var(--color-grey-font-900);
`

export default function Login() {
  const { t } = useTranslation()
  const { login, isLoading } = useLogin()
  const { register, handleSubmit, reset, formState } = useForm()
  const { errors } = formState

  function onSubmit(data) {
    const { email, password } = data

    login(
      { email, password },
      {
        onSettled: () => {
          reset()
        },
      }
    )
  }

  return (
    <StyledLogin>
      <Form onSubmit={handleSubmit(onSubmit)} error={errors?.email?.message}>
        <FormRow label="Email" error={errors?.email?.message}>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: t("form.required_field"),
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: t("form.valid_email"),
              },
            })}
          />
        </FormRow>
        <FormRow
          label={t("login.label_password")}
          error={errors?.password?.message}
        >
          <Input
            id="password"
            type="password"
            {...register("password", {
              required: t("form.required_field"),
            })}
          />
        </FormRow>

        <Button size="small">
          {isLoading ? <SpinnerMini /> : t("login.login_button")}
        </Button>
        <StyledLink to="/forgotPassword">
          {t("login.link_forgot_password")}
        </StyledLink>
      </Form>
      <ButtonHome />
    </StyledLogin>
  )
}
