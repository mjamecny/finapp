import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import styled from "styled-components"

import { useUpdateTransaction } from "./useUpdateTransaction"
import { useTransaction } from "./useTransaction"

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

const options = [
  { value: "home", label: "Home" },
  { value: "salary", label: "Salary" },
  { value: "food", label: "Food" },
  { value: "entertainment", label: "Entertainment" },
  { value: "pets", label: "Pets" },
  { value: "car", label: "Car" },
  { value: "health", label: "Health" },
  { value: "transport", label: "Transport" },
  { value: "gift", label: "Gift" },
  { value: "study", label: "Study" },
  { value: "subscription", label: "Subscription" },
  { value: "utilities", label: "Utilities" },
  { value: "other", label: "Other" },
]

export default function UpdateTransaction() {
  const { isLoading, transaction } = useTransaction()
  const transactionId = transaction?.id
  const { isUpdating, updateTransaction } = useUpdateTransaction()
  const navigate = useNavigate()

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
    setDescription(transaction?.description)
    setTo(transaction?.to)
    setCategory(transaction?.category)
  }, [
    transaction?.amount,
    transaction?.description,
    transaction?.to,
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
            defaultValue={amount}
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
