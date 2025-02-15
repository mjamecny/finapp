import { AiOutlineClose } from "react-icons/ai"
import styled, { css } from "styled-components"

import { useDeleteAccount } from "./useDeleteAccount"
import { useTransactions } from "../transactions/useTransactions"
import useFetchRates from "../../hooks/useFetchRates"
import { useUser } from "../authentication/useUser"
import { getCurrency } from "../../utils/helpers"

import SpinnerMini from "../../ui/SpinnerMini"
import AccountStatsBar from "./AccountStatsBar"
import AccountIcon from "../../ui/AccountIcon"

const StyledAccount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 1rem;
  height: 12rem;
  background-color: #fdb600;
  color: #212529;
  border-radius: 2rem;
  position: relative;

  ${(props) =>
    props.type === "Bitcoin" &&
    css`
      background-color: #fdb600;
    `}

  ${(props) =>
    props.type === "Cash" &&
    css`
      background-color: #23c246;
    `}

  ${(props) =>
    props.type === "Bank" &&
    css`
      background-color: #f8fd00;
    `}

    .close-button {
    position: absolute;
    right: 10px;
    top: 7px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`

const CloseButton = styled.div`
  position: absolute;
  right: 10px;
  top: 7px;

  & svg {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }
`

const StyledAmount = styled.p`
  font-size: 2rem;
`

function getTransactionsSum(transactions, type) {
  return transactions
    .filter((transaction) => transaction.type === type)
    .reduce((acc, cur) => acc + cur.amount, 0)
}

export default function Account({ account }) {
  const { type, balance, id } = account
  const { user } = useUser()
  const userCurrency = user?.user_metadata?.currency
  const { isDeleting, deleteAccount } = useDeleteAccount()
  const { isLoading, transactions } = useTransactions()
  const { bitcoinPrice, isLoading: isLoadingRates } = useFetchRates()

  if (isLoading) return <SpinnerMini />

  let transactionsSum = getTransactionsSum(transactions, type)

  let sum = balance + transactionsSum

  return (
    <StyledAccount type={type}>
      <CloseButton>
        {isDeleting ? (
          <SpinnerMini />
        ) : (
          <AiOutlineClose onClick={() => deleteAccount(id)} />
        )}
      </CloseButton>
      <AccountIcon type={type} size="medium" />

      {isLoadingRates ? (
        <SpinnerMini />
      ) : (
        <Amount
          accountType={type}
          userCurrency={userCurrency}
          sum={sum}
          bitcoinPrice={bitcoinPrice}
        />
      )}

      {type === "Bitcoin" && <p>{(balance + transactionsSum).toFixed(5)}</p>}

      <AccountStatsBar
        account={account}
        transactions={transactions}
        userCurrency={userCurrency}
      />
    </StyledAccount>
  )
}

function Amount({ sum, accountType, userCurrency, bitcoinPrice }) {
  const currencyLabel = getCurrency(userCurrency)

  if (accountType === "Bitcoin") {
    return (
      <StyledAmount>
        {`${Math.round(sum * bitcoinPrice).toLocaleString(
          "cs-CZ"
        )} ${currencyLabel}`}
      </StyledAmount>
    )
  }

  return (
    <StyledAmount>
      {`${Math.round(sum).toLocaleString("cs-CZ")} ${currencyLabel}`}
    </StyledAmount>
  )
}
