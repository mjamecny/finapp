import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { useUpdateUser } from "./useUpdateUser"

import Button from "../../ui/Button"
import Form from "../../ui/Form"
import FormRow from "../../ui/FormRow"
import Input from "../../ui/Input"
import SpinnerMini from "../../ui/SpinnerMini"
import Heading from "../../ui/Heading"

export default function UpdateUserPassword() {
  const { register, handleSubmit, formState, getValues, reset } = useForm()
  const { errors } = formState

  const { updateUser, isUpdating } = useUpdateUser()
  const { t } = useTranslation()
  const navigate = useNavigate()

  function onSubmit({ password }) {
    updateUser(
      { password },
      {
        onSuccess: () => {
          reset()
          navigate("/dashboard")
        },
      }
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
      <Heading as="h2">{t("update_user_password.heading")}</Heading>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow
          label={t("update_user_password.label_new_password")}
          error={errors?.password?.message}
        >
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            disabled={isUpdating}
            {...register("password", {
              required: t("form.required_field"),
              minLength: {
                value: 8,
                message: t("form.password_length"),
              },
            })}
          />
        </FormRow>

        <FormRow
          label={t("update_user_password.label_password_confirm")}
          error={errors?.passwordConfirm?.message}
        >
          <Input
            type="password"
            autoComplete="new-password"
            id="passwordConfirm"
            disabled={isUpdating}
            {...register("passwordConfirm", {
              required: t("form.required_field"),
              validate: (value) =>
                getValues().password === value || t("form.password_match"),
            })}
          />
        </FormRow>
        <FormRow>
          <Button size="small" disabled={isUpdating}>
            {isUpdating ? (
              <SpinnerMini />
            ) : (
              t("update_user_password.label_button")
            )}
          </Button>
        </FormRow>
      </Form>
    </div>
  )
}
