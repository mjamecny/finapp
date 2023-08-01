import styled, { css } from "styled-components"

import { Transaction } from "./Transaction"
import Empty from "../../ui/Empty"

const StyledTransactions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.6rem 1.6rem;

  ${(props) =>
    props.type === "page" &&
    css`
      height: 45rem;
      overflow-y: scroll;
    `}
`

export default function TransactionList({ userId, transactions, type }) {
  if (!transactions.length) return <Empty resourceName="transactions" />

  return (
    <>
      <StyledTransactions type={type}>
        {transactions?.map((transaction) => (
          <Transaction
            key={transaction.id}
            transaction={transaction}
            userId={userId}
          />
        ))}
      </StyledTransactions>
    </>
  )
}
