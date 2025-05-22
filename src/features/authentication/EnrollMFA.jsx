import { useState } from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import supabase from "../../services/supabase"
import { useUser } from "./useUser"

import Heading from "../../ui/Heading"
import FormRow from "../../ui/FormRow"
import Input from "../../ui/Input"
import Button from "../../ui/Button"

const StyledEnrollMFA = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  font-size: 1.4rem;
`

const CentroConteinero = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 3.2rem;
  padding-right: 3.2rem;
`

const Qr = styled.img`
  margin-bottom: 1.8rem;
`

const Secret = styled.p`
  font-size: 1.2rem;
  color: #868e96;
  text-align: center;
  margin-bottom: 1.8rem;
`

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.6rem;
  margin-top: 1.6rem;
`

export default function EnrollMFA() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user } = useUser()
  const [factorId, setFactorId] = useState("")
  const [qr, setQR] = useState("")
  const [verifyCode, setVerifyCode] = useState("")
  const [secret, setSecret] = useState("")
  const { formState } = useForm()
  const { errors } = formState

  const factors = user?.factors || []
  const isVerified =
    (factors.length > 0 && user?.factors[0]?.status === "verified") || false

  const onEnableClicked = () => {
    ;(async () => {
      const challenge = await supabase.auth.mfa.challenge({ factorId })

      if (challenge.error) {
        toast.error(t("enable_mfa.toast_error"))
        return
      }
      const challengeId = challenge.data.id
      const verify = await supabase.auth.mfa.verify({
        factorId,
        challengeId,
        code: verifyCode,
      })

      if (verify.error) {
        toast.error(t("enable_mfa.toast_error"))
        return
      }

      toast.success(t("enable_mfa.toast_enable_success"))
      navigate("/dashboard", { replace: true })
    })()
  }

  const unrollFactor = (factors) => {
    const factorId = factors[0]?.id
    ;(async () => {
      const { data, error } = await supabase.auth.mfa.unenroll({
        factorId,
      })
      if (error) {
        toast.error(t("enable_mfa.toast_error"))
        return
      }
      navigate("/dashboard", { replace: true })
      toast.success(t("enable_mfa.toast_disable_success"))
    })()
  }

  const generateQr = async () => {
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: "totp",
      friendlyName: `${Date.now()}mfa`,
    })

    if (error) {
      toast.error(t("enable_mfa.toast_error"))
      return
    }

    setFactorId(data?.id)
    setQR(data?.totp.qr_code)
    setSecret(data?.totp.secret)
    toast.success(t("enable_mfa.toast_qr_success"))
  }

  return (
    <StyledEnrollMFA>
      <Heading as="h2">
        {isVerified
          ? t("enable_mfa.heading_disable")
          : t("enable_mfa.heading_enable")}
      </Heading>
      <CentroConteinero>
        {isVerified ? null : (
          <>
            {!qr && (
              <Button size="small" onClick={generateQr}>
                {t("enable_mfa.generate_qr_button")}
              </Button>
            )}
            {qr && (
              <>
                <Qr src={qr} />
                <Secret>{secret}</Secret>
                <FormRow
                  label={t("enable_mfa.label")}
                  error={errors?.totp?.message}
                >
                  <Input
                    id="totp"
                    type="text"
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value.trim())}
                  />
                </FormRow>
              </>
            )}
          </>
        )}

        <ButtonsContainer>
          {isVerified ? (
            <Button size="small" onClick={() => unrollFactor(factors)}>
              {t("enable_mfa.disable_button")}
            </Button>
          ) : (
            <>
              {qr && (
                <Button size="small" onClick={onEnableClicked}>
                  {t("enable_mfa.enable_button")}
                </Button>
              )}
            </>
          )}
        </ButtonsContainer>
      </CentroConteinero>
    </StyledEnrollMFA>
  )
}
