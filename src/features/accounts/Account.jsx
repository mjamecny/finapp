import { FaBitcoin, FaMoneyBillWaveAlt } from "react-icons/fa"
import { BsBank2 } from "react-icons/bs"
import { AiOutlineClose } from "react-icons/ai"
import styled, { css } from "styled-components"

import { useDeleteAccount } from "./useDeleteAccount"
import { useTransactions } from "../transactions/useTransactions"

import SpinnerMini from "../../ui/SpinnerMini"
import AccountStatsBar from "./AccountStatsBar"
import Spinner from "../../ui/Spinner"

const StyledAccount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 1rem;
  height: 12rem;
  background-color: #fdb600;
  color: #495057;
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

const AccountIcon = styled.span`
  & svg {
    width: 3.7rem;
    height: 3.7rem;
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

const Amount = styled.p`
  font-size: 2rem;
`

export default function Account({ account, convertedBtcPrice }) {
  const { isDeleting, deleteAccount } = useDeleteAccount()
  const { isLoading, transactions } = useTransactions(account?.userId)

  if (isLoading) return <Spinner />

  let transactionsSum

  if (account.type === "Bank") {
    transactionsSum = transactions
      .filter((transaction) => transaction.type === "Bank")
      .reduce((acc, cur) => acc + cur.amount, 0)
  }

  if (account.type === "Cash") {
    transactionsSum = transactions
      .filter((transaction) => transaction.type === "Cash")
      .reduce((acc, cur) => acc + cur.amount, 0)
  }

  if (account.type === "Bitcoin") {
    transactionsSum = transactions
      .filter((transaction) => transaction.type === "Bitcoin")
      .reduce((acc, cur) => acc + cur.amount, 0)
  }

  return (
    <StyledAccount type={account.type}>
      <CloseButton>
        {isDeleting ? (
          <SpinnerMini />
        ) : (
          <AiOutlineClose onClick={() => deleteAccount(account.id)} />
        )}
      </CloseButton>
      <AccountIcon>
        {account.type === "Bitcoin" && <FaBitcoin />}
        {account.type === "Cash" && <FaMoneyBillWaveAlt />}
        {account.type === "Bank" && <BsBank2 />}
      </AccountIcon>

      <Amount>
        {account.type === "Bitcoin"
          ? `${Math.round(
              (account.balance + transactionsSum) * convertedBtcPrice
            ).toLocaleString("cs-CZ")} CZK`
          : `${Math.round(account.balance + transactionsSum).toLocaleString(
              "cs-CZ"
            )} CZK`}
      </Amount>

      {account.type === "Bitcoin" && (
        <p>{(account.balance + transactionsSum).toFixed(5)}</p>
      )}

      <AccountStatsBar account={account} transactions={transactions} />
    </StyledAccount>
  )
}
