import styled from "styled-components"

import { Transaction } from "./Transaction"
import Empty from "../../ui/Empty"

const StyledTransactions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.6rem 2.4rem;
  /* height: 24rem; */
  /* overflow-y: scroll; */
`

export default function TransactionList({ userId, transactions }) {
  if (!transactions.length) return <Empty resourceName="transactions" />

  return (
    <>
      <StyledTransactions>
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
