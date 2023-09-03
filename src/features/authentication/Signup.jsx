import styled from "styled-components"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"

import { useSignup } from "./useSignup"

import Form from "../../ui/Form"
import Button from "../../ui/Button"
import FormRow from "../../ui/FormRow"
import Input from "../../ui/Input"
import ButtonHome from "../../ui/ButtonHome"
import SpinnerMini from "../../ui/SpinnerMini"
import { Select } from "../../ui/Select"
import { useNavigate } from "react-router-dom"

const StyledSignup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
  background-color: var(--color-grey-back-900);
  height: 100vh;
`

const currencyOptions = [
  { value: "czech-republic-koruna", label: "CZK" },
  { value: "euro", label: "EUR" },
  { value: "usd", label: "USD" },
]

export default function Signup() {
  const { signup, isLoading } = useSignup()

  const { t } = useTranslation()
  const navigate = useNavigate()

  const { register, handleSubmit, getValues, formState } = useForm({
    defaultValues: { currency: "usd" },
  })

  const { errors } = formState

  function onSubmit(data) {
    const { username, email, password, currency } = data
    signup({ username, email, password, currency })
    navigate("/login")
  }

  return (
    <StyledSignup>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow
          label={t("signup.label_username")}
          error={errors?.username?.message}
        >
          <Input
            id="username"
            type="text"
            {...register("username", { required: t("form.required_field") })}
            disabled={isLoading}
          />
        </FormRow>

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
            disabled={isLoading}
          />
        </FormRow>
        <FormRow
          label={t("signup.label_password")}
          error={errors?.password?.message}
        >
          <Input
            id="password"
            type="password"
            {...register("password", {
              required: t("form.required_field"),
              minLength: {
                value: 8,
                message: t("form.password_length"),
              },
            })}
            disabled={isLoading}
          />
        </FormRow>
        <FormRow
          label={t("signup.label_password_confirm")}
          error={errors?.passwordConfirm?.message}
        >
          <Input
            id="passwordConfirm"
            type="password"
            {...register("passwordConfirm", {
              required: t("form.required_field"),
              validate: (value) =>
                getValues().password === value || t("form.password_match"),
            })}
            disabled={isLoading}
          />
        </FormRow>
        <FormRow label={t("signup.label_currency")}>
          <Select
            options={currencyOptions}
            id="currency"
            {...register("currency")}
            disabled={isLoading}
          />
        </FormRow>

        <Button size="small">
          {isLoading ? <SpinnerMini /> : t("signup.sign_up_button")}
        </Button>
      </Form>
      <ButtonHome />
    </StyledSignup>
  )
}
