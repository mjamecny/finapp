import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { toast } from "react-hot-toast"
import styled from "styled-components"

import { useCreateTransaction } from "./useCreateTransaction"
import { useAccounts } from "../accounts/useAccounts"
import { useUser } from "../authentication/useUser"
import useCategories from "../../hooks/useCategories"

import Form from "../../ui/Form"
import FormRow from "../../ui/FormRow"
import Input from "../../ui/Input"
import Button from "../../ui/Button"
import SelectAlternative from "../../ui/SelectAlternative"
import SpinnerMini from "../../ui/SpinnerMini"
import ButtonBack from "../../ui/ButtonBack"
import Select from "../../ui/Select"

const StyledAddTransaction = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
`

export default function AddTransaction() {
  const { t } = useTranslation()
  const categories = useCategories()
  const [accountId, setAccountId] = useState("")
  const [amount, setAmount] = useState("")
  const [transactionType, setTransactionType] = useState("withdraw")
  const [description, setDescription] = useState("")
  const [to, setTo] = useState("")
  const [category, setCategory] = useState("home")

  const { user } = useUser()
  const userId = user?.id
  const { isCreating, createTransaction } = useCreateTransaction()
  const { accounts, isLoading } = useAccounts(userId)

  const navigate = useNavigate()

  useEffect(() => {
    setAccountId(accounts?.at(0).id)
  }, [accounts])

  if (isLoading) return null

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

    const updatedAccount = accounts.find((account) => account.id === accountId)

    const newTransaction = {
      userId,
      accountId,
      type: updatedAccount.type,
      amount: transactionType === "withdraw" ? -amount : amount,
      description,
      to,
      category,
    }

    createTransaction({ newTransaction })
    navigate("/dashboard")
  }

  return (
    <StyledAddTransaction>
      <Form onSubmit={handleSubmit}>
        <FormRow type="vertical" label={t("add_transaction.account_label")}>
          <SelectAlternative
            accounts={accounts}
            value={accountId}
            onChange={(e) => setAccountId(Number(e.target.value))}
            disabled={isCreating}
          />
        </FormRow>
        <FormRow label={t("add_transaction.category_label")}>
          <Select
            options={categories}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={isCreating}
          />
        </FormRow>
        <FormRow label={t("add_transaction.amount_label")}>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
            disabled={isCreating}
          />
        </FormRow>
        <FormRow type="horizontal">
          <Input
            type="radio"
            name="transactionType"
            value="withdraw"
            checked={transactionType === "withdraw"}
            onChange={(e) => setTransactionType(e.target.value)}
            disabled={isCreating}
          />
          -
          <Input
            type="radio"
            name="transactionType"
            value="deposit"
            checked={transactionType === "deposit"}
            onChange={(e) => setTransactionType(e.target.value)}
            required
            disabled={isCreating}
          />
          +
        </FormRow>
        <FormRow label={t("add_transaction.description_label")}>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={isCreating}
          />
        </FormRow>
        <FormRow label={t("add_transaction.to_label")}>
          <Input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
            disabled={isCreating}
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
