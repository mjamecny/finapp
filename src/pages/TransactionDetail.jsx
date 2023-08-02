import styled, { css } from "styled-components"
import { useNavigate, useParams } from "react-router-dom"
import {
  FaBitcoin,
  FaMoneyBillWaveAlt,
  FaPen,
  FaHome,
  FaFish,
  FaMedkit,
  FaMoneyBill,
  FaGift,
  FaCat,
  FaCar,
  FaBus,
  FaBook,
  FaQuestion,
} from "react-icons/fa"
import { BsBank2 } from "react-icons/bs"
import { AiOutlineClose } from "react-icons/ai"

import { convertToDDMonthTime } from "../utils/helpers"
import { useUser } from "../features/authentication/useUser"
import { useTransactions } from "../features/transactions/useTransactions"
import { useDeleteTransaction } from "../features/transactions/useDeleteTransaction"

import Heading from "../ui/Heading"
import SpinnerMini from "../ui/SpinnerMini"

const StyledTransactionDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const DetailsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid var(--color-grey-font-900);
  height: 300px;
  border-radius: 7px;
  padding: 1.2rem 1.6rem;
  margin-top: 1.6rem;
`

const DetailsItems = styled.div`
  width: 24rem;
  margin-top: 2.4rem;
  font-size: 1.4rem;
`

const AccountIcon = styled.div`
  & svg {
    width: 5rem;
    height: 5rem;
  }
  ${(props) =>
    props.type === "Bitcoin" &&
    css`
      color: #fdb600;
    `}

  ${(props) =>
    props.type === "Cash" &&
    css`
      color: #23c246;
    `}

  ${(props) =>
    props.type === "Bank" &&
    css`
      color: #f8fd00;
    `}
`

const options = [
  { value: "home", label: "Home", icon: <FaHome /> },
  { value: "food", label: "Food", icon: <FaFish /> },
  { value: "health", label: "Health", icon: <FaMedkit /> },
  { value: "salary", label: "Salary", icon: <FaMoneyBill /> },
  { value: "gift", label: "Gift", icon: <FaGift /> },
  { value: "pets", label: "Pets", icon: <FaCat /> },
  { value: "car", label: "Car", icon: <FaCar /> },
  { value: "transport", label: "Transport", icon: <FaBus /> },
  { value: "study", label: "Study", icon: <FaBook /> },
  { value: "other", label: "Other", icon: <FaQuestion /> },
]

const Amount = styled.p`
  font-size: 2.4rem;
  margin-top: 0.8rem;
  ${(props) =>
    props.type === "withdraw" &&
    css`
      color: red;
    `}
  ${(props) =>
    props.type === "deposit" &&
    css`
      color: green;
    `}
`

const Description = styled.p`
  font-size: 2rem;
`

const ButtonIcon = styled.span`
  & svg {
    width: 2rem;
    height: 2rem;
  }
`

export default function TransactionDetail() {
  const { transactionId } = useParams()
  const id = Number(transactionId)

  const { user } = useUser()
  const userId = user?.id
  const { transactions } = useTransactions(userId)
  const { isDeleting, deleteTransaction } = useDeleteTransaction()

  const filteredTransaction = transactions?.find(
    (transaction) => transaction.id === id
  )

  const navigate = useNavigate()

  return (
    <StyledTransactionDetail>
      <Heading as="h2">Transaction details</Heading>
      {filteredTransaction && (
        <DetailsBox>
          {filteredTransaction.type === "Bitcoin" && (
            <AccountIcon type="Bitcoin">
              <FaBitcoin />
            </AccountIcon>
          )}
          {filteredTransaction.type === "Cash" && (
            <AccountIcon type="Cash">
              <FaMoneyBillWaveAlt />
            </AccountIcon>
          )}
          {filteredTransaction.type === "Bank" && (
            <AccountIcon type="Bank">
              <BsBank2 />
            </AccountIcon>
          )}
          {filteredTransaction.amount < 0 ? (
            <Amount type="withdraw">
              {filteredTransaction.type === "Bitcoin"
                ? Math.abs(filteredTransaction.amount)
                : `${Math.abs(filteredTransaction.amount)} CZK`}
            </Amount>
          ) : (
            <Amount type="deposit">
              {filteredTransaction.type === "Bitcoin"
                ? filteredTransaction.amount
                : `${filteredTransaction.amount} CZK`}
            </Amount>
          )}

          <Description>{filteredTransaction.description}</Description>

          <DetailsItems>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid var(--color-grey-font-900)",
                padding: "0.6rem 0.4rem",
              }}
            >
              <p>Created</p>
              <p>{convertToDDMonthTime(filteredTransaction.created_at)}</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid var(--color-grey-font-900)",
                padding: "0.6rem 0.4rem",
              }}
            >
              <p>Category</p>
              <p style={{ display: "flex", gap: "0.4rem" }}>
                {options.map((option) => {
                  if (option.value === filteredTransaction.category) {
                    return option.icon
                  }
                })}
                <span>
                  {options.map((option) => {
                    if (option.value === filteredTransaction.category) {
                      return option.label
                    }
                  })}
                </span>
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid var(--color-grey-font-900)",
                padding: "0.6rem 0.4rem",
              }}
            >
              <p>To</p>
              <p>{filteredTransaction.to}</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "0.8rem",
                padding: "1.2rem 1.6rem",
              }}
            >
              <ButtonIcon
                onClick={() =>
                  navigate(`/transaction/${filteredTransaction.id}/edit`)
                }
              >
                <FaPen />
              </ButtonIcon>
              {isDeleting ? (
                <SpinnerMini />
              ) : (
                <ButtonIcon
                  onClick={() => {
                    deleteTransaction(filteredTransaction.id)
                    navigate(-1)
                  }}
                >
                  <AiOutlineClose />
                </ButtonIcon>
              )}
            </div>
          </DetailsItems>
        </DetailsBox>
      )}
    </StyledTransactionDetail>
  )
}
