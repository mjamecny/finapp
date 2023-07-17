import { FaBitcoin, FaMoneyBillWaveAlt } from "react-icons/fa"
import { BsBank2 } from "react-icons/bs"
import { AiOutlineClose } from "react-icons/ai"
import { toast } from "react-hot-toast"

export function Transaction({ transaction, dispatch }) {
  function handleRemoveTransaction() {
    dispatch({
      type: "removeTransaction",
      payload: {
        transactionId: transaction.id,
        type: transaction.type,
        removedTransactionAmount: transaction.amount,
      },
    })

    toast.success("Transaction removed")
  }

  return (
    <div className="transaction">
      {transaction.type === "Bitcoin" && <FaBitcoin />}
      {transaction.type === "Cash" && <FaMoneyBillWaveAlt />}
      {transaction.type === "Bank" && <BsBank2 />}
      <p className="description">{transaction.description}</p>
      <p
        className={`price ${
          transaction.amount < 0 ? "price--red" : "price--green"
        }`}
      >
        {transaction.type === "Bitcoin"
          ? transaction.amount
          : `${transaction.amount} CZK`}
      </p>
      <AiOutlineClose onClick={handleRemoveTransaction} />
    </div>
  )
}
