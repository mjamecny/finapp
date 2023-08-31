import { useSearchParams } from "react-router-dom"
import { useState } from "react"
import styled from "styled-components"

import { useTransactions } from "../features/transactions/useTransactions"

import TransactionList from "../features/transactions/TransactionList"
import ButtonBack from "../ui/ButtonBack"
import Input from "../ui/Input"
import SortBy from "../ui/SortBy"
import Filter from "../ui/Filter"
import { useTranslation } from "react-i18next"

const StyledTransactions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`

export default function Transactions() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState("")
  const { isLoading, transactions } = useTransactions()
  const { t } = useTranslation()

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
        placeholder={t("filter.search_placeholder")}
        onChange={(e) => setQuery(e.target.value)}
      />

      <SortBy
        options={[
          {
            value: "description-asc",
            label: t("sort.sort_option_description_asc"),
          },
          {
            value: "description-dsc",
            label: t("sort.sort_option_description_dsc"),
          },
          { value: "created_at-asc", label: t("sort.sort_option_date_asc") },
          { value: "created_at-dsc", label: t("sort.sort_option_date_dsc") },
        ]}
      />
      <Filter
        filterField="type"
        options={[
          { value: "all", label: t("filter.all_label") },
          { value: "withdrawals", label: t("filter.withdrawals_label") },
          { value: "deposits", label: t("filter.deposits_label") },
        ]}
      />

      <TransactionList transactions={sortedTransactions} type="page" />
      <ButtonBack />
    </StyledTransactions>
  )
}
