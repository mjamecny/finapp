import { styled } from "styled-components"
import { useTranslation } from "react-i18next"

import Filter from "../../ui/Filter"
import Heading from "../../ui/Heading"
import Category from "./Category"
import Spinner from "../../ui/Spinner"

import { useRecentTransactions } from "./useRecentTransactions"

const StyledRecentSpending = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`

const SpendingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.8rem;
  height: 20rem;
  overflow-y: scroll;
`

const EmptyWithdrawals = styled.p`
  display: flex;
  justify-content: center;
  font-size: 2rem;
`

function getRecentSpendingArr(transactions) {
  // Create an object to store the total amounts per category
  const categorySum = {}

  // Iterate through negative transactions and calculate totals
  transactions.forEach((transaction) => {
    const category = transaction.category
    const amount = Math.abs(transaction.amount) // Convert to positive value

    // If the category doesn't exist in the categorySum object, initialize it with the current amount
    if (!categorySum[category]) {
      categorySum[category] = amount
    } else {
      // If the category already exists, add the current amount to it
      categorySum[category] += amount
    }
  })

  // Convert the categorySum object into the desired format
  const result = Object.keys(categorySum).map((category) => ({
    id: category.toLowerCase(),
    label: category,
    totalAmount: categorySum[category],
  }))

  return result
}

export default function RecentSpending() {
  const { isLoading, transactions } = useRecentTransactions()
  const { t } = useTranslation()

  if (isLoading) return <Spinner />

  const recentSpendingArr = getRecentSpendingArr(transactions)

  return (
    <StyledRecentSpending>
      <Heading as="h2">{t("recent_spending.heading")}</Heading>

      <Filter
        filterField="last"
        options={[
          { value: "7", label: t("filter.last_7_days_label") },
          { value: "30", label: t("filter.last_30_days_label") },
          { value: "90", label: t("filter.last_90_days_label") },
        ]}
      />

      {!recentSpendingArr?.length ? (
        <EmptyWithdrawals>{t("recent_spending.empty")}</EmptyWithdrawals>
      ) : (
        <SpendingContainer>
          {recentSpendingArr.map((category) => (
            <Category key={category.id} category={category} />
          ))}
        </SpendingContainer>
      )}
    </StyledRecentSpending>
  )
}
