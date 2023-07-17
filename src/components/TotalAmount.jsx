export default function TotalAmount({ state, convertedBtcPrice }) {
  const totalAmount = state.reduce(
    (sum, account) =>
      account.type === "crypto"
        ? sum + account.amount * convertedBtcPrice
        : sum + account.amount,
    0
  )
  return (
    <div className="total-amount">
      {!totalAmount ? (
        <p className="amount">Loading...</p>
      ) : (
        <p className="amount">
          {!totalAmount
            ? "Loading..."
            : Math.round(totalAmount).toLocaleString("cs-CZ")}{" "}
          CZK
        </p>
      )}
    </div>
  )
}
