import styled from "styled-components"

import SpinnerMini from "../../ui/SpinnerMini"

import { useAccounts } from "./useAccounts"
import { useTransactions } from "../transactions/useTransactions"
import useFetchRates from "../../hooks/useFetchRates"
import { useUser } from "../authentication/useUser"
import { getCurrency } from "../../utils/helpers"

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
  const { bitcoinPrice, isLoading: isLoadingRates } = useFetchRates()

  const currencyLabel = getCurrency(userCurrency)

  if (isLoading || isLoadingTransactions) return <SpinnerMini />

  const balancesSum = accounts?.reduce(
    (sum, account) =>
      account.type === "Bitcoin"
        ? sum + account.balance * bitcoinPrice
        : sum + account.balance,
    0
  )

  const transactionsSum = transactions.reduce(
    (sum, transaction) =>
      transaction.type === "Bitcoin"
        ? sum + transaction.amount * bitcoinPrice
        : sum + transaction.amount,
    0
  )

  const totalAmount = balancesSum + transactionsSum

  return (
    <StyledTotalAmount>
      {isLoadingRates ? (
        <SpinnerMini />
      ) : (
        `${Math.round(totalAmount).toLocaleString("cs-CZ")} ${currencyLabel}`
      )}
    </StyledTotalAmount>
  )
}
