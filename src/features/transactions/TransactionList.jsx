import styled, { css } from "styled-components"
import { useNavigate } from "react-router-dom"

import Transaction from "./Transaction"
import Empty from "../../ui/Empty"
import Button from "../../ui/Button"
import Heading from "../../ui/Heading"
import ButtonArrow from "../../ui/ButtonArrow"

const StyledTransactions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.6rem 1.6rem;
  flex: 1;

  ${(props) =>
    props.type === "page" &&
    css`
      height: 45rem;
      overflow-y: scroll;
    `}
`

export default function TransactionList({ userId, transactions, type }) {
  const navigate = useNavigate()

  if (!transactions?.length)
    return (
      <Empty
        resourceName="transactions"
        buttonLabel="Add transaction"
        path="/transaction/add"
      />
    )

  return (
    <StyledTransactions type={type}>
      {type !== "page" && <Heading as="h2">Last transactions</Heading>}
      {transactions?.map((transaction) => (
        <Transaction
          key={transaction.id}
          transaction={transaction}
          userId={userId}
        />
      ))}
      <Button onClick={() => navigate("/transaction/add")}>
        Add transaction
      </Button>
      {type !== "page" && (
        <ButtonArrow to="/transactions">All transactions</ButtonArrow>
      )}
    </StyledTransactions>
  )
}
