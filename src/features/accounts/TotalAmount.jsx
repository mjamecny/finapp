import styled from "styled-components"

import { useAccounts } from "./useAccounts"
import { useTransactions } from "../transactions/useTransactions"

const StyledTotalAmount = styled.div`
  display: flex;
  justify-content: center;
  color: #f8f9fa;
  border: 1px solid #f8f9fa;
  border-radius: 7px;
  padding: 1.2rem 1.6rem;
  font-size: 3.6rem;
  font-weight: 600;
`

export default function TotalAmount({ userId, convertedBtcPrice }) {
  const { accounts } = useAccounts(userId)
  const { transactions } = useTransactions(userId)

  const balancesSum = accounts?.reduce(
    (sum, account) =>
      account.type === "Bitcoin"
        ? sum + account.balance * convertedBtcPrice
        : sum + account.balance,
    0
  )

  const transactionsSum = transactions.reduce(
    (sum, transaction) =>
      transaction.type === "Bitcoin"
        ? sum + transaction.amount * convertedBtcPrice
        : sum + transaction.amount,
    0
  )

  const totalAmount = balancesSum + transactionsSum

  return (
    <StyledTotalAmount>
      {`${Math.round(totalAmount).toLocaleString("cs-CZ")} CZK`}
    </StyledTotalAmount>
  )
}
