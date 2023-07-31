import { useUser } from "../features/authentication/useUser"
import { useTransactions } from "../features/transactions/useTransactions"

import styled from "styled-components"

import TransactionList from "../features/transactions/TransactionList"
import ButtonBack from "../ui/ButtonBack"
import Input from "../ui/Input"
import { useState } from "react"

const StyledTransactions = styled.div`
  display: flex;
  flex-direction: column;
`

export default function Transactions() {
  const [query, setQuery] = useState("")
  const { user } = useUser()
  const userId = user?.id
  const { isLoading, transactions, error } = useTransactions(userId)

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <StyledTransactions>
      <Input
        type="text"
        value={query}
        placeholder="Search by description"
        onChange={(e) => setQuery(e.target.value)}
      />

      <TransactionList userId={userId} transactions={filteredTransactions} />
      <ButtonBack />
    </StyledTransactions>
  )
}
