import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

import { useCreateTransaction } from "./useCreateTransaction"
import { useAccounts } from "../accounts/useAccounts"
import { useUser } from "../authentication/useUser"

import Form from "../../ui/Form"
import FormRow from "../../ui/FormRow"
import Input from "../../ui/Input"
import Button from "../../ui/Button"
import SelectAlternative from "../../ui/SelectAlternative"
import SpinnerMini from "../../ui/SpinnerMini"
import ButtonBack from "../../ui/ButtonBack"

const StyledAddTransaction = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #212529;
  height: 100vh;
`

export default function AddTransaction() {
  const [accountId, setAccountId] = useState("")
  const [amount, setAmount] = useState("")
  const [transactionType, setTransactionType] = useState("withdraw")
  const [description, setDescription] = useState("")

  const { user } = useUser()
  const userId = user?.id
  const { isCreating, createTransaction } = useCreateTransaction()
  const { accounts, isLoading } = useAccounts(userId)

  const navigate = useNavigate()

  if (isLoading) return null

  useEffect(() => {
    setAccountId(accounts?.at(0).id)
  }, [accounts])

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
    }

    createTransaction({ newTransaction })
    navigate("/dashboard")
  }

  return (
    <StyledAddTransaction>
      <Form onSubmit={handleSubmit}>
        <FormRow type="vertical" label="Account">
          <SelectAlternative
            accounts={accounts}
            value={accountId}
            onChange={(e) => setAccountId(Number(e.target.value))}
            disabled={isCreating}
          />
        </FormRow>
        <FormRow label="Amount">
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
        <FormRow label="Description">
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={isCreating}
          />
        </FormRow>
        <Button>{isCreating ? <SpinnerMini /> : "Add"}</Button>
      </Form>
      <ButtonBack />
    </StyledAddTransaction>
  )
}