import styled from "styled-components"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import supabase from "../../services/supabase"
import toast from "react-hot-toast"

import Form from "../../ui/Form"
import FormRow from "../../ui/FormRow"
import Input from "../../ui/Input"
import Button from "../../ui/Button"
import ButtonHome from "../../ui/ButtonHome"

const StyledAuthMFA = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
  background-color: var(--color-grey-back-900);
  height: 100vh;
`

export default function AuthMFA({ setShowMFAScreen }) {
  const { register, handleSubmit, reset, formState } = useForm()
  const { errors } = formState
  const { t } = useTranslation()
  const navigate = useNavigate()

  function onSubmit(data) {
    ;(async () => {
      const factors = await supabase.auth.mfa.listFactors()
      if (factors.error) {
        throw factors.error
      }
      const totpFactor = factors.data.totp[0]
      if (!totpFactor) {
        toast.error(t("auth_mfa.toast_error"))
        return
      }
      const factorId = totpFactor.id
      const challenge = await supabase.auth.mfa.challenge({ factorId })
      if (challenge.error) {
        toast.error(t("auth_mfa.toast_error"))
        return
      }
      const challengeId = challenge.data.id
      const verify = await supabase.auth.mfa.verify({
        factorId,
        challengeId,
        code: data?.totp,
      })
      if (verify.error) {
        toast.error(t("auth_mfa.toast_error"))
        return
      }
      setShowMFAScreen(false)
      navigate("/dashboard", { replace: true })
    })()
  }
  return (
    <StyledAuthMFA>
      <Form onSubmit={handleSubmit(onSubmit)} error={errors?.email?.message}>
        <FormRow label={t("auth_mfa.label")} error={errors?.password?.message}>
          <Input
            id="totp"
            type="text"
            {...register("totp", {
              required: t("form.required_field"),
            })}
          />
        </FormRow>

        <Button size="small">{t("auth_mfa.button")}</Button>
      </Form>
      <ButtonHome />
    </StyledAuthMFA>
  )
}
