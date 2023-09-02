import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import { useForm } from "react-hook-form"

import { useCreateTransaction } from "./useCreateTransaction"
import { useAccounts } from "../accounts/useAccounts"
import { useUser } from "../authentication/useUser"
import useCategories from "../../hooks/useCategories"

import Form from "../../ui/Form"
import FormRow from "../../ui/FormRow"
import Input from "../../ui/Input"
import Button from "../../ui/Button"
import { SelectAlternative } from "../../ui/SelectAlternative"
import SpinnerMini from "../../ui/SpinnerMini"
import ButtonBack from "../../ui/ButtonBack"
import { Select } from "../../ui/Select"

const StyledAddTransaction = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
`

export default function AddTransaction() {
  const { t } = useTranslation()
  const categories = useCategories()

  const { user } = useUser()
  const userId = user?.id
  const { isCreating, createTransaction } = useCreateTransaction()
  const { accounts, isLoading } = useAccounts(userId)

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: { category: "home", transactionType: "withdraw" },
  })
  const { errors } = formState
  const navigate = useNavigate()

  if (isLoading) return null

  function onSubmit(data) {
    const accountId = Number(data.accountId)
    const amount = Number(data.amount)

    const updatedAccount = accounts.find((account) => account.id === accountId)

    const newTransaction = {
      ...data,
      accountId,
      userId,
      type: updatedAccount.type,
      amount: data.transactionType === "withdraw" ? -amount : amount,
    }

    createTransaction({ newTransaction })
    navigate("/dashboard")
  }

  return (
    <StyledAddTransaction>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow type="vertical" label={t("add_transaction.account_label")}>
          <SelectAlternative
            accounts={accounts}
            disabled={isCreating}
            id="accountId"
            {...register("accountId")}
          />
        </FormRow>
        <FormRow label={t("add_transaction.category_label")}>
          <Select
            options={categories}
            id="category"
            {...register("category")}
            disabled={isCreating}
          />
        </FormRow>
        <FormRow
          label={t("add_transaction.amount_label")}
          error={errors?.amount?.message}
        >
          <Input
            type="number"
            id="amount"
            disabled={isCreating}
            {...register("amount", { required: t("form.required_field") })}
          />
        </FormRow>
        <FormRow type="horizontal">
          <Input
            type="radio"
            id="transactionType"
            value="withdraw"
            disabled={isCreating}
            {...register("transactionType")}
          />
          -
          <Input
            type="radio"
            id="transactionType"
            value="deposit"
            disabled={isCreating}
            {...register("transactionType")}
          />
          +
        </FormRow>
        <FormRow
          label={t("add_transaction.description_label")}
          error={errors?.description?.message}
        >
          <Input
            type="text"
            id="description"
            disabled={isCreating}
            {...register("description", { required: t("form.required_field") })}
          />
        </FormRow>
        <FormRow
          label={t("add_transaction.to_label")}
          error={errors?.to?.message}
        >
          <Input
            type="text"
            id="to"
            disabled={isCreating}
            {...register("to", { required: t("form.required_field") })}
          />
        </FormRow>
        <Button>
          {isCreating ? <SpinnerMini /> : t("add_transaction.add_button")}
        </Button>
      </Form>
      <ButtonBack />
    </StyledAddTransaction>
  )
}
