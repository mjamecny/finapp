import { FaBitcoin, FaMoneyBillWaveAlt } from "react-icons/fa"
import { BsBank2 } from "react-icons/bs"
import { AiOutlineClose } from "react-icons/ai"
import { FaPen } from "react-icons/fa"
import styled, { css } from "styled-components"

import { useDeleteTransaction } from "./useDeleteTransaction"
import { convertToDDMMYYYY } from "../../utils/helpers"

import SpinnerMini from "../../ui/SpinnerMini"
import { useNavigate } from "react-router-dom"

const StyledTransaction = styled.div`
  display: flex;
  justify-content: space-between;
  color: #f8f9fa;
  border: 1px solid #f8f9fa;
  font-size: 1.6rem;
  padding: 1.2rem;
  border-radius: 7px;
`

const AccountIcon = styled.div`
  & svg {
    width: 3rem;
    height: 3rem;
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
const Description = styled.p`
  font-weight: 600;
`
const Price = styled.p`
  font-weight: 600;

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

const TransactionRowHorizontal = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`

const TransactionRowVertical = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.2rem;
  gap: 0.4rem;
`

export function Transaction({ transaction, userId }) {
  const { isDeleting, deleteTransaction } = useDeleteTransaction()
  const { type, description, amount, id, created_at } = transaction

  const navigate = useNavigate()

  return (
    <StyledTransaction>
      <TransactionRowHorizontal>
        {type === "Bitcoin" && (
          <AccountIcon type="Bitcoin">
            <FaBitcoin />
          </AccountIcon>
        )}
        {type === "Cash" && (
          <AccountIcon type="Cash">
            <FaMoneyBillWaveAlt />
          </AccountIcon>
        )}
        {type === "Bank" && (
          <AccountIcon type="Bank">
            <BsBank2 />
          </AccountIcon>
        )}
        <Description>{description}</Description>
      </TransactionRowHorizontal>

      <TransactionRowHorizontal>
        <TransactionRowVertical>
          {amount < 0 ? (
            <Price type="withdraw">
              {type === "Bitcoin" ? amount : `${amount} CZK`}
            </Price>
          ) : (
            <Price type="deposit">
              {type === "Bitcoin" ? amount : `${amount} CZK`}
            </Price>
          )}
          <p>
            {created_at === new Date()
              ? "Today"
              : convertToDDMMYYYY(created_at)}
          </p>
        </TransactionRowVertical>
        {isDeleting ? (
          <SpinnerMini />
        ) : (
          <>
            <AiOutlineClose onClick={() => deleteTransaction(id)} />
            <FaPen onClick={() => navigate(`/transaction/${id}/edit`)} />
          </>
        )}
      </TransactionRowHorizontal>
    </StyledTransaction>
  )
}
