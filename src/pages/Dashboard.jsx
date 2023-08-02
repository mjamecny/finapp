import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import AccountList from "../features/accounts/AccountList"
import TotalAmount from "../features/accounts/TotalAmount"
import Button from "../ui/Button"
import TransactionList from "../features/transactions/TransactionList"
import Row from "../ui/Row"
import FlexHorizontalCenter from "../ui/FlexHorizontalCenter"
import ButtonArrow from "../ui/ButtonArrow"
import Heading from "../ui/Heading"

import { useUser } from "../features/authentication/useUser"
import { useTransactions } from "../features/transactions/useTransactions"
import { useAccounts } from "../features/accounts/useAccounts"

export default function Dashboard() {
  const [convertedBtcPrice, setConvertedBtcPrice] = useState("")

  const { user } = useUser()
  const userId = user?.id
  const { isLoading, transactions } = useTransactions(userId)
  const { accounts } = useAccounts(userId)

  const navigate = useNavigate()

  const slicedTransactions = transactions?.slice(0, 4)

  useEffect(() => {
    async function getCzkRate() {
      const res = await fetch(
        "https://api.coincap.io/v2/rates/czech-republic-koruna"
      )
      const data = await res.json()
      const czkRate = Number(data.data.rateUsd)
      const res2 = await fetch("https://api.coincap.io/v2/rates/bitcoin")
      const data2 = await res2.json()
      const btcPrice = Number(data2.data.rateUsd)

      setConvertedBtcPrice(btcPrice / czkRate)
    }
    getCzkRate()
  }, [convertedBtcPrice])

  if (isLoading) return "Loading..."

  return (
    <>
      {accounts?.length ? (
        <Row type="vertical">
          {userId && (
            <TotalAmount
              userId={userId}
              convertedBtcPrice={convertedBtcPrice}
            />
          )}
          {userId && <AccountList convertedBtcPrice={convertedBtcPrice} />}

          <FlexHorizontalCenter>
            <Button onClick={() => navigate("/transaction/add")}>
              Add transaction
            </Button>
            {accounts.length < 3 && (
              <Button onClick={() => navigate("/account/add")}>
                Add account
              </Button>
            )}
          </FlexHorizontalCenter>

          {userId && (
            <div
              style={{ display: "flex", flexDirection: "column", flex: "1" }}
            >
              <Heading as="h2">Last transactions</Heading>
              <TransactionList
                userId={userId}
                transactions={slicedTransactions}
              />
              {transactions.length > 0 && (
                <ButtonArrow to="/transactions">All transactions</ButtonArrow>
              )}
            </div>
          )}
        </Row>
      ) : (
        <Row type="vertical" style={{ justifyContent: "center" }}>
          <FlexHorizontalCenter>
            <Row type="vertical">
              <p style={{ fontSize: "2.4rem", color: "#f8f9fa" }}>
                Add your first account
              </p>
              <Button onClick={() => navigate("/account/add")}>
                Add account
              </Button>
            </Row>
          </FlexHorizontalCenter>
        </Row>
      )}
    </>
  )
}
