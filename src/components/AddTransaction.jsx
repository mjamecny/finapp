import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { toast } from "react-hot-toast"

export default function AddTransaction({ state, dispatch }) {
  const [amount, setAmount] = useState("")
  const [accountType, setAccountType] = useState(state[0].type)
  const [transactionType, setTransactionType] = useState("withdraw")
  const [description, setDescription] = useState("")

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    if (!amount) {
      toast.error("Please fill amount")
      return
    }

    if (!description) {
      toast.error("Please fill description")
      return
    }

    const transactionId = crypto.randomUUID()

    dispatch({
      type: "addTransaction",
      payload: {
        type: accountType,
        amount: transactionType === "withdraw" ? -amount : amount,
        transactionId,
        description,
      },
    })

    toast.success("Transaction added")

    navigate("/dashboard")
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Account</label>
          <select
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          >
            {state.map((account) => (
              <option key={account.type} value={account.type}>
                {account.type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <div className="transaction-type">
            <input
              type="radio"
              name="transactionType"
              value="withdraw"
              checked={transactionType === "withdraw"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            -
            <input
              type="radio"
              name="transactionType"
              value="deposit"
              checked={transactionType === "deposit"}
              onChange={(e) => setTransactionType(e.target.value)}
              required
            />
            +
          </div>
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <button className="btn" onClick={handleSubmit}>
          Add
        </button>
      </form>

      <div className="back">
        <AiOutlineArrowLeft onClick={() => navigate("/dashboard")} />
      </div>
    </div>
  )
}
