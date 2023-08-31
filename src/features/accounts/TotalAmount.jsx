import styled from "styled-components"

import SpinnerMini from "../../ui/SpinnerMini"

import { useAccounts } from "./useAccounts"
import { useTransactions } from "../transactions/useTransactions"
import useFetchRate from "../../hooks/useFetchRate"
import useFetchBtcPrice from "../../hooks/useFetchBtcPrice"
import { useUser } from "../authentication/useUser"

const StyledTotalAmount = styled.p`
  font-size: 3.6rem;
  font-weight: 600;
  color: var(--color-grey-font-900);
  text-align: center;
`

export default function TotalAmount() {
  const { user } = useUser()
  const userCurrency = user?.user_metadata?.currency
  const { isLoading, accounts } = useAccounts()
  const { isLoading: isLoadingTransactions, transactions } = useTransactions()
  const { btcPrice, isLoading: isLoadingPrice } = useFetchBtcPrice()
  const { rate, isLoading: isLoadingRate } = useFetchRate()

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
