import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"

import Form from "../../ui/Form"
import FormRow from "../../ui/FormRow"
import Input from "../../ui/Input"
import Button from "../../ui/Button"
import { Select } from "../../ui/Select"
import ButtonBack from "../../ui/ButtonBack"

import { useCreateAccount } from "./useCreateAccount"
import { useAccounts } from "./useAccounts"
import { useUser } from "../authentication/useUser"
import useAccountCategories from "../../hooks/useAccountCategories"

const StyledAddAccount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
`

export default function AddAccount() {
  const { register, handleSubmit, reset, formState } = useForm()
  const { errors } = formState

  const { user } = useUser()
  const { accounts } = useAccounts()
  const { isCreating, createAccount } = useCreateAccount()

  const navigate = useNavigate()
  const { t } = useTranslation()
  const accountCategories = useAccountCategories()

  function onSubmit(data) {
    const hasAdded = accounts.some(
      (account) => account.type === data.accountType
    )

    if (hasAdded) {
      toast.error("Account already added")
      reset()
      return
    }

    const newAccount = {
      balance: data.initialBalance,
      type: data.accountType,
      userId: user.id,
    }

    createAccount({ newAccount })
    navigate("/dashboard")
  }

  return (
    <StyledAddAccount>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow
          label={t("add_account.account_label")}
          error={errors?.accountType?.message}
        >
          <Select
            options={accountCategories}
            disabled={isCreating}
            {...register("accountType")}
          />
        </FormRow>
        <FormRow
          label={t("add_account.initial_label")}
          error={errors?.initialBalance?.message}
        >
          <Input
            id="initialBalance"
            type="number"
            disabled={isCreating}
            step="any"
            {...register("initialBalance", {
              required: t("form.required_field"),
            })}
          />
        </FormRow>

        <Button disabled={isCreating}>{t("add_account.add_button")}</Button>
      </Form>
      <ButtonBack />
    </StyledAddAccount>
  )
}
