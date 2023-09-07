import { FaBitcoin, FaMoneyBillWaveAlt } from "react-icons/fa"
import { BsBank2 } from "react-icons/bs"
import { AiOutlineClose } from "react-icons/ai"
import styled, { css } from "styled-components"

import { useDeleteAccount } from "./useDeleteAccount"
import { useTransactions } from "../transactions/useTransactions"
import { useUser } from "../authentication/useUser"
import useFetchRate from "../../hooks/useFetchRate"
import useFetchBtcPrice from "../../hooks/useFetchBtcPrice"
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
  const { type, balance } = account
  const { user } = useUser()
  const userCurrency = user?.user_metadata?.currency
  const { isDeleting, deleteAccount } = useDeleteAccount()
  const { isLoading, transactions } = useTransactions()
  const { btcPrice, isLoading: isLoadingPrice } = useFetchBtcPrice()
  const { rate, isLoading: isLoadingRate } = useFetchRate()

  const btcConverted = btcPrice / rate

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

      {isLoadingPrice || isLoadingRate ? (
        <SpinnerMini />
      ) : (
        <Amount
          accountType={type}
          userCurrency={userCurrency}
          sum={sum}
          btcConverted={btcConverted}
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

function Amount({ sum, accountType, userCurrency, btcConverted }) {
  const currencyLabel = getCurrency(userCurrency)

  if (accountType === "Bitcoin") {
    return (
      <StyledAmount>
        {`${Math.round(sum * btcConverted).toLocaleString(
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
