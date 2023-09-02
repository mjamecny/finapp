import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import { useForm } from "react-hook-form"

import { useUpdateTransaction } from "./useUpdateTransaction"
import { useTransaction } from "./useTransaction"
import useCategories from "../../hooks/useCategories"

import Form from "../../ui/Form"
import FormRow from "../../ui/FormRow"
import Input from "../../ui/Input"
import Button from "../../ui/Button"
import SpinnerMini from "../../ui/SpinnerMini"
import ButtonBack from "../../ui/ButtonBack"
import { Select } from "../../ui/Select"
import Spinner from "../../ui/Spinner"

const StyledAddTransaction = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
`

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export default function UpdateTransaction() {
  const categories = useCategories()
  const { isLoading, transaction } = useTransaction()
  const transactionId = transaction?.id
  const { isUpdating, updateTransaction } = useUpdateTransaction()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { register, handleSubmit, reset, formState } = useForm()
  const { errors } = formState

  useEffect(() => {
    if (transaction) {
      const { amount, decrypted_description, decrypted_to, category } =
        transaction

      const transactionToUpdate = {
        transactionType: amount < 0 ? "withdraw" : "deposit",
        amount: Math.abs(amount),
        description: decrypted_description,
        to: decrypted_to,
        category,
      }
      reset(transactionToUpdate)
    }
  }, [transaction, reset])

  if (isLoading)
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    )

  function onSubmit(data) {
    const { to, category, description, amount, transactionType } = data

    const newTransaction = {
      amount: transactionType === "withdraw" ? -amount : amount,
      description,
      category,
      to,
    }

    updateTransaction({ newTransaction, transactionId })
    navigate("/dashboard")
  }

  return (
    <StyledAddTransaction>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label={t("update_transaction.category_label")}>
          <Select
            options={categories}
            {...register("category")}
            disabled={isUpdating}
          />
        </FormRow>
        <FormRow
          label={t("update_transaction.amount_label")}
          error={errors?.amount?.message}
        >
          <Input
            type="number"
            {...register("amount", { required: t("form.required_field") })}
            disabled={isUpdating}
          />
        </FormRow>
        <FormRow type="horizontal">
          <Input
            type="radio"
            id="transactionType"
            value="withdraw"
            {...register("transactionType")}
            disabled={isUpdating}
          />
          -
          <Input
            type="radio"
            id="transactionType"
            value="deposit"
            {...register("transactionType")}
            disabled={isUpdating}
          />
          +
        </FormRow>
        <FormRow
          label={t("update_transaction.description_label")}
          error={errors?.description?.message}
        >
          <Input
            type="text"
            id="description"
            {...register("description", { required: t("form.required_field") })}
            disabled={isUpdating}
          />
        </FormRow>
        <FormRow
          label={t("update_transaction.to_label")}
          error={errors?.to?.message}
        >
          <Input
            type="text"
            id="to"
            {...register("to", { required: t("form.required_field") })}
            disabled={isUpdating}
          />
        </FormRow>
        <Button>
          {isUpdating ? <SpinnerMini /> : t("update_transaction.update_button")}
        </Button>
      </Form>
      <ButtonBack />
    </StyledAddTransaction>
  )
}
