import { FaBitcoin, FaMoneyBillWaveAlt } from "react-icons/fa"
import { BsBank2 } from "react-icons/bs"
import { AiOutlineClose } from "react-icons/ai"
import { toast } from "react-hot-toast"

export default function Account({ account, convertedBtcPrice, dispatch }) {
  const convertedAmount = account.amount * convertedBtcPrice

  function handleRemoveAccount() {
    dispatch({ type: "removeAccount", payload: account.type })
    toast.success("Account removed")
  }
  return (
    <div className={`account account--${account.type}`}>
      <AiOutlineClose onClick={handleRemoveAccount} className="close-button" />
      {account.type === "Bitcoin" && <FaBitcoin />}
      {account.type === "Cash" && <FaMoneyBillWaveAlt />}
      {account.type === "Bank" && <BsBank2 />}
      <p className="account-amount">
        {!convertedAmount
          ? "Loading..."
          : account.type === "Bitcoin"
          ? Math.round(account.amount * convertedBtcPrice).toLocaleString(
              "cs-CZ"
            )
          : Math.round(account.amount).toLocaleString("cs-CZ")}{" "}
        CZK
      </p>
      {account.type === "Bitcoin" && <p>{account.amount}</p>}
    </div>
  )
}
