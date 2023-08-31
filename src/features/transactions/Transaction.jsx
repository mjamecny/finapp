import styled, { css } from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { FaBitcoin, FaMoneyBillWaveAlt } from "react-icons/fa"
import { BsBank2 } from "react-icons/bs"
import { AiOutlineClose } from "react-icons/ai"
import { FaPen } from "react-icons/fa"

import { useDeleteTransaction } from "./useDeleteTransaction"
import { convertToDDMMYYYY } from "../../utils/helpers"

import SpinnerMini from "../../ui/SpinnerMini"
import { useUser } from "../authentication/useUser"

const StyledTransaction = styled.div`
  color: var(--color-grey-font-900);
  border: 1px solid var(--color-grey-font-900);
  font-size: 1.4rem;
  padding: 0.8rem 0.6rem;
  border-radius: 7px;
`

const AccountIcon = styled.div`
  & svg {
    width: 2rem;
    height: 2rem;
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

const Price = styled.p`
  font-size: 1.2rem;
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
  font-size: 1.2rem;
  gap: 0.4rem;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: 600;
  color: var(--color-grey-font-900);
`

const ActionButtonContainer = styled.div`
  display: flex;
  gap: 0.4rem;
`

const ActionButton = styled.span`
  padding: 0.4rem;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d9d9d9;
  color: var(--color-grey-back-900);
  cursor: pointer;
`

const CreatedAt = styled.p`
  font-size: 1rem;
  color: #868e96;
`

export default function Transaction({ transaction }) {
  const { user } = useUser()
  const userCurrency = user?.user_metadata?.currency

  const { isDeleting, deleteTransaction } = useDeleteTransaction()

  const { type, description, amount, id, created_at } = transaction

  const navigate = useNavigate()

  return (
    <StyledTransaction>
      <TransactionRowHorizontal>
        <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
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
          <TransactionRowVertical>
            <StyledLink to={`/transaction/${id}`}>{description}</StyledLink>
            <CreatedAt>
              {created_at === new Date()
                ? "Today"
                : convertToDDMMYYYY(created_at)}
            </CreatedAt>
          </TransactionRowVertical>
        </div>

        <div
          style={{
            display: "flex",
            gap: "0.8rem",
            marginLeft: "auto",
            alignItems: "center",
          }}
        >
          {amount < 0 ? (
            <Price type="withdraw">
              {type === "Bitcoin"
                ? amount
                : `${amount} ${
                    (userCurrency === "usd" && "USD") ||
                    (userCurrency === "czech-republic-koruna" && "CZK") ||
                    (userCurrency === "eur" && "EUR")
                  }`}
            </Price>
          ) : (
            <Price type="deposit">
              {type === "Bitcoin"
                ? amount
                : `${amount} ${
                    (userCurrency === "usd" && "USD") ||
                    (userCurrency === "czech-republic-koruna" && "CZK") ||
                    (userCurrency === "eur" && "EUR")
                  }`}
            </Price>
          )}

          <ActionButtonContainer>
            {isDeleting ? (
              <SpinnerMini />
            ) : (
              <>
                <ActionButton>
                  <AiOutlineClose onClick={() => deleteTransaction(id)} />
                </ActionButton>

                <ActionButton>
                  <FaPen onClick={() => navigate(`/transaction/${id}/edit`)} />
                </ActionButton>
              </>
            )}
          </ActionButtonContainer>
        </div>
      </TransactionRowHorizontal>
    </StyledTransaction>
  )
}
