import styled from "styled-components"

import SpinnerMini from "../../ui/SpinnerMini"

import { useAccounts } from "./useAccounts"
import { useTransactions } from "../transactions/useTransactions"
import useFetchRate from "../../hooks/useFetchRate"
import useFetchBtcPrice from "../../hooks/useFetchBtcPrice"

const StyledTotalAmount = styled.div`
  display: flex;
  justify-content: center;
  color: var(--color-grey-font-900);
  border: 1px solid var(--color-grey-font-900);
  border-radius: 7px;
  padding: 1.2rem 1.6rem;
  font-size: 3.6rem;
  font-weight: 600;
`

export default function TotalAmount({ userId, userCurrency }) {
  const { isLoading, accounts } = useAccounts(userId)
  const { isLoading: isLoadingTransactions, transactions } =
    useTransactions(userId)
  const { btcPrice, isLoading: isLoadingPrice } = useFetchBtcPrice()
  const { rate, isLoading: isLoadingRate } = useFetchRate(userCurrency)

  if (isLoading || isLoadingTransactions) return <SpinnerMini />

  const btcConverted = btcPrice / rate

  const balancesSum = accounts?.reduce(
    (sum, account) =>
      account.type === "Bitcoin"
        ? sum + account.balance * btcConverted
        : sum + account.balance,
    0
  )

  const transactionsSum = transactions.reduce(
    (sum, transaction) =>
      transaction.type === "Bitcoin"
        ? sum + transaction.amount * btcConverted
        : sum + transaction.amount,
    0
  )

  const totalAmount = balancesSum + transactionsSum

  return (
    <StyledTotalAmount>
      {isLoadingRate || isLoadingPrice ? (
        <SpinnerMini />
      ) : (
        `${Math.round(totalAmount).toLocaleString("cs-CZ")} ${
          (userCurrency === "usd" && "USD") ||
          (userCurrency === "czech-republic-koruna" && "CZK") ||
          (userCurrency === "eur" && "EUR")
        }`
      )}
    </StyledTotalAmount>
  )
}
