import { Transaction } from "./Transaction"

export default function TransactionList({ state, dispatch }) {
  const hasTransactions = state.some(
    (account) => account.transactions.length > 0
  )

  return (
    <div className="transactions">
      {hasTransactions ? (
        state.map((account) =>
          account.transactions.map((transaction) => (
            <Transaction
              key={transaction.id}
              transaction={transaction}
              dispatch={dispatch}
            />
          ))
        )
      ) : (
        <p className="no-content">No transactions available.</p>
      )}
    </div>
  )
}
