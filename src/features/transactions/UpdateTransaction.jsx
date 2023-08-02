import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"

import { useTransactions } from "./useTransactions"
import { useUser } from "../authentication/useUser"
import { useUpdateTransaction } from "./useUpdateTransaction"

import Form from "../../ui/Form"
import FormRow from "../../ui/FormRow"
import Input from "../../ui/Input"
import Button from "../../ui/Button"
import SpinnerMini from "../../ui/SpinnerMini"
import ButtonBack from "../../ui/ButtonBack"
import Select from "../../ui/Select"

const StyledAddTransaction = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`
const options = [
  { value: "home", label: "Home" },
  { value: "salary", label: "Salary" },
  { value: "food", label: "Food" },
  { value: "pets", label: "Pets" },
  { value: "car", label: "Car" },
  { value: "health", label: "Health" },
  { value: "transport", label: "Transport" },
  { value: "gift", label: "Gift" },
  { value: "study", label: "Study" },
  { value: "other", label: "Other" },
]

export default function UpdateTransaction() {
  const { transactionId } = useParams()
  const id = Number(transactionId)

  const { user } = useUser()
  const userId = user?.id
  const { transactions } = useTransactions(userId)
  const { isUpdating, updateTransaction } = useUpdateTransaction()

  const [amount, setAmount] = useState("")
  const [transactionType, setTransactionType] = useState("")
  const [description, setDescription] = useState("")
  const [to, setTo] = useState("")
  const [category, setCategory] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    const filteredTransaction = transactions.find(
      (transaction) => transaction.id === id
    )
    filteredTransaction.amount < 0
      ? setTransactionType("withdraw")
      : setTransactionType("deposit")
    setAmount(Math.abs(filteredTransaction?.amount))
    setDescription(filteredTransaction?.description)
    setTo(filteredTransaction?.to)
    setCategory(filteredTransaction?.category)
  }, [])

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

    updateTransaction({ newTransaction, id })
    navigate("/dashboard")
  }

  return (
    <StyledAddTransaction>
      <Form onSubmit={handleSubmit}>
        <FormRow label="Category">
          <Select
            options={options}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={isUpdating}
          />
        </FormRow>
        <FormRow label="Amount">
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
        <FormRow label="Description">
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={isUpdating}
          />
        </FormRow>
        <FormRow label="To">
          <Input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
            disabled={isUpdating}
          />
        </FormRow>
        <Button>{isUpdating ? <SpinnerMini /> : "Update"}</Button>
      </Form>
      <ButtonBack />
    </StyledAddTransaction>
  )
}
