import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

import { useUpdateTransaction } from "./useUpdateTransaction"
import { useTransaction } from "./useTransaction"
import useCategories from "../../hooks/useCategories"

import Form from "../../ui/Form"
import FormRow from "../../ui/FormRow"
import Input from "../../ui/Input"
import Button from "../../ui/Button"
import SpinnerMini from "../../ui/SpinnerMini"
import ButtonBack from "../../ui/ButtonBack"
import Select from "../../ui/Select"
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

  const [amount, setAmount] = useState("")
  const [transactionType, setTransactionType] = useState("")
  const [description, setDescription] = useState("")
  const [to, setTo] = useState("")
  const [category, setCategory] = useState("")

  useEffect(() => {
    transaction?.amount < 0
      ? setTransactionType("withdraw")
      : setTransactionType("deposit")
    setAmount(Math.abs(transaction?.amount))
    setDescription(transaction?.decrypted_description)
    setTo(transaction?.decrypted_to)
    setCategory(transaction?.category)
  }, [
    transaction?.amount,
    transaction?.decrypted_description,
    transaction?.decrypted_to,
    transaction?.category,
  ])

  if (isLoading)
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    )

  function handleSubmit(e) {
    e.preventDefault()

    if (!amount) {
      toast.error("Please fill amount")
      return
    }

    if (!description) {
      toast.error("Please fill description")
      return
    }

    const newTransaction = {
      amount: transactionType === "withdraw" ? -amount : amount,
      description,
      category,
    }

    updateTransaction({ newTransaction, transactionId })
    navigate("/dashboard")
  }

  return (
    <StyledAddTransaction>
      <Form onSubmit={handleSubmit}>
        <FormRow label={t("update_transaction.category_label")}>
          <Select
            options={categories}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={isUpdating}
          />
        </FormRow>
        <FormRow label={t("update_transaction.amount_label")}>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
            disabled={isUpdating}
          />
        </FormRow>
        <FormRow type="horizontal">
          <Input
            type="radio"
            name="transactionType"
            value="withdraw"
            checked={transactionType === "withdraw"}
            onChange={(e) => setTransactionType(e.target.value)}
            disabled={isUpdating}
          />
          -
          <Input
            type="radio"
            name="transactionType"
            value="deposit"
            checked={transactionType === "deposit"}
            onChange={(e) => setTransactionType(e.target.value)}
            required
            disabled={isUpdating}
          />
          +
        </FormRow>
        <FormRow label={t("update_transaction.description_label")}>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={isUpdating}
          />
        </FormRow>
        <FormRow label={t("update_transaction.to_label")}>
          <Input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
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
