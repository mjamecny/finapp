import { useEffect, useReducer, useState } from "react"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import { Toaster, toast } from "react-hot-toast"

import Logo from "./components/Logo"
import TotalAmount from "./components/TotalAmount"
import AccountList from "./components/AccountList"
import TransactionList from "./components/TransactionList"
import AddTransaction from "./components/AddTransaction"
import AddAccount from "./components/AddAccount"
import Button from "./components/Button"
import PageNotFound from "./components/PageNotFound"

const initialState = []

function reducer(state, action) {
  switch (action.type) {
    case "addTransaction":
      // Find the account in the state based on the provided transaction's id
      const account = state.find((acc) => acc.type === action.payload.type)
      if (account) {
        // Create a new transaction object with the provided details
        const newTransaction = {
          id: action.payload.transactionId,
          amount: action.payload.amount,
          description: action.payload.description,
          type: action.payload.type,
        }

        // Update the transactions array of the account with the new transaction
        const updatedAccount = {
          ...account,
          amount: account.amount + newTransaction.amount,
          transactions: [...account.transactions, newTransaction],
        }

        // Replace the old account object with the updated one in the state
        const updatedState = state.map((acc) =>
          acc.type === updatedAccount.type ? updatedAccount : acc
        )

        return updatedState
      }

      return state // If the account is not found, return the unchanged state

    case "removeTransaction":
      // Find the account in the state based on the provided transaction's type
      const accountToRemoveFrom = state.find(
        (acc) => acc.type === action.payload.type
      )

      if (accountToRemoveFrom) {
        // Filter out the transaction to be removed from the transactions array
        const updatedTransactions = accountToRemoveFrom.transactions.filter(
          (transaction) => transaction.id !== action.payload.transactionId
        )

        // Calculate the new amount by subtracting the removed transaction's amount
        const newAmount =
          accountToRemoveFrom.amount - action.payload.removedTransactionAmount

        // Create a new account object with the updated transactions and amount
        const updatedAccount = {
          ...accountToRemoveFrom,
          amount: newAmount,
          transactions: updatedTransactions,
        }

        // Replace the old account object with the updated one in the state
        const updatedState = state.map((acc) =>
          acc.type === updatedAccount.type ? updatedAccount : acc
        )

        return updatedState
      }

      return state // If the account is not found, return the unchanged state

    case "addAccount":
      if (action.payload) {
        return [...state, action.payload]
      }

      return state
    case "removeAccount":
      const accountToRemove = state.find((acc) => acc.type === action.payload)

      if (accountToRemove) {
        const updatedAccounts = state.filter(
          (acc) => acc.type !== action.payload
        )
        return updatedAccounts
      }

      return state

    default:
      throw new Error("Unknown action")
  }
}

function App() {
  const [state, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("state")) || initialState
  )
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={<Welcome state={state} dispatch={dispatch} />}
          />
          <Route
            path="dashboard"
            element={<Dashboard state={state} dispatch={dispatch} />}
          />
          <Route
            path="transaction/add"
            element={<AddTransaction state={state} dispatch={dispatch} />}
          />
          <Route
            path="account/add"
            element={<AddAccount state={state} dispatch={dispatch} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
          },
        }}
      />
    </>
  )
}

function Welcome({ state }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (state.length > 0) navigate("/dashboard")
  }, [])

  return (
    <div className="welcome">
      <Logo />
      <p className="info">
        Track your financial transactions for three different accounts.
      </p>
      <div className="buttons">
        {state.length > 0 && (
          <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
        )}
        <Button onClick={() => navigate("/account/add")}>Add account</Button>
      </div>
    </div>
  )
}

function Dashboard({ dispatch, state }) {
  const [czkRate, setCzkRate] = useState("")
  const [btcPrice, setBtcPrice] = useState("")

  const navigate = useNavigate()
  const convertedBtcPrice = btcPrice / czkRate

  useEffect(() => {
    async function getCzkRate() {
      const res = await fetch(
        "https://api.coincap.io/v2/rates/czech-republic-koruna"
      )
      const data = await res.json()
      setCzkRate(Number(data.data.rateUsd))
    }
    async function getBitcoinPrice() {
      const res = await fetch("https://api.coincap.io/v2/rates/bitcoin")
      const data = await res.json()
      setBtcPrice(Number(data.data.rateUsd))
    }
    getCzkRate()
    getBitcoinPrice()
  }, [])

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state))
  }, [state])

  useEffect(() => {
    if (state.length === 0) navigate("/")
  }, [])

  return (
    <div className="dashboard">
      {state.length > 0 ? (
        <TotalAmount state={state} convertedBtcPrice={convertedBtcPrice} />
      ) : null}

      <AccountList
        state={state}
        dispatch={dispatch}
        convertedBtcPrice={convertedBtcPrice}
      />

      <div className="buttons">
        {state.length > 0 && (
          <Button onClick={() => navigate("/transaction/add")}>
            Add transaction
          </Button>
        )}

        <Button
          onClick={() => {
            if (state.length === 3) {
              toast.error("Cannot add more accounts")
              return
            }
            navigate("/account/add")
          }}
        >
          Add account
        </Button>
      </div>

      {state.length > 0 ? (
        <TransactionList state={state} dispatch={dispatch} />
      ) : null}
    </div>
  )
}

export default App
