import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { toast } from "react-hot-toast"

export default function AddAccount({ state, dispatch }) {
  const [accountType, setAccountType] = useState("Bank")
  const [initialBalance, setInitialBalance] = useState("")

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    if (!initialBalance) {
      toast.error("Please fill initial balance")
      return
    }

    const hasAdded = state.some((account) => account.type === accountType)

    if (hasAdded) {
      toast.error("Account already added")
      setInitialBalance("")
      return
    }

    const newAccount = {
      amount: initialBalance,
      type: accountType,
      transactions: [],
    }

    dispatch({ type: "addAccount", payload: newAccount })
    setInitialBalance("")
    toast.success("Account added")
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
            <option value="Bank">Bank</option>
            <option value="Bitcoin">Bitcoin</option>
            <option value="Cash">Cash</option>
          </select>
        </div>
        <div>
          <label>Initial balance</label>
          <input
            type="number"
            value={initialBalance}
            onChange={(e) => setInitialBalance(Number(e.target.value))}
            required
          />
        </div>

        <button className="btn" onClick={handleSubmit}>
          Add account
        </button>
      </form>
      <div className="back">
        <AiOutlineArrowLeft onClick={() => navigate(-1)} />
      </div>
    </div>
  )
}
