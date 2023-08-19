import { useSearchParams } from "react-router-dom"
import { useState } from "react"
import styled from "styled-components"

import { useUser } from "../features/authentication/useUser"
import { useTransactions } from "../features/transactions/useTransactions"

import TransactionList from "../features/transactions/TransactionList"
import ButtonBack from "../ui/ButtonBack"
import Input from "../ui/Input"
import SortBy from "../ui/SortBy"
import Filter from "../ui/Filter"

const StyledTransactions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`

export default function Transactions() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState("")

  const { user } = useUser()
  const userId = user?.id
  const userCurrency = user?.user_metadata?.currency

  const { isLoading, transactions } = useTransactions(userId)

  if (isLoading) return null

  // 1) filter by description

  const filteredTransactions = transactions?.filter((transaction) =>
    transaction.description.toLowerCase().includes(query.toLowerCase())
  )

  // 2) filter by transaction type
  const filterValue = searchParams.get("type") || "all"

  let filteredTransactionsByType

  if (filterValue === "all") {
    filteredTransactionsByType = filteredTransactions
  }

  if (filterValue === "withdrawals") {
    filteredTransactionsByType = filteredTransactions.filter(
      (transaction) => transaction.amount < 0
    )
  }
  if (filterValue === "deposits") {
    filteredTransactionsByType = filteredTransactions.filter(
      (transaction) => transaction.amount > 0
    )
  }

  // 3 sort by

  const sortBy = searchParams.get("sortBy") || "created_at-dsc"
  const [field, direction] = sortBy.split("-")
  const modifier = direction === "asc" ? 1 : -1

  const sortedTransactions = filteredTransactionsByType?.sort((a, b) => {
    const fieldA = a[field]
    const fieldB = b[field]
    if (fieldA < fieldB) {
      return -1 * modifier
    }
    if (fieldA > fieldB) {
      return 1 * modifier
    }
    return 0
  })

  return (
    <StyledTransactions>
      <Input
        type="text"
        value={query}
        placeholder="Search by description"
        onChange={(e) => setQuery(e.target.value)}
      />

      <SortBy
        options={[
          { value: "description-asc", label: "Sort by description (A-Z)" },
          { value: "description-dsc", label: "Sort by description (Z-A)" },
          { value: "created_at-asc", label: "Sort by date (oldest first)" },
          { value: "created_at-dsc", label: "Sort by date (newest first)" },
        ]}
      />
      <Filter
        filterField="type"
        options={[
          { value: "all", label: "All" },
          { value: "withdrawals", label: "Withdrawals" },
          { value: "deposits", label: "Deposits" },
        ]}
      />

      <TransactionList
        userCurrency={userCurrency}
        transactions={sortedTransactions}
        type="page"
      />
      <ButtonBack />
    </StyledTransactions>
  )
}
