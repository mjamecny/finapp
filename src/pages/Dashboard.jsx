import AccountList from "../features/accounts/AccountList"
import TotalAmount from "../features/accounts/TotalAmount"
import TransactionList from "../features/transactions/TransactionList"
import Row from "../ui/Row"
import Spinner from "../ui/Spinner"
import Empty from "../ui/Empty"

import { useUser } from "../features/authentication/useUser"
import { useTransactions } from "../features/transactions/useTransactions"
import { useAccounts } from "../features/accounts/useAccounts"
import useBtcToCzkConversion from "../hooks/useBtcToCzkConversion"

export default function Dashboard() {
  const { user } = useUser()
  const userId = user?.id
  const { transactions } = useTransactions(userId)
  const { isLoading, accounts } = useAccounts(userId)
  const convertedBtcPrice = useBtcToCzkConversion()

  const slicedTransactions = transactions?.slice(0, 4)

  if (isLoading) return <Spinner />

  return (
    <>
      {!accounts.length ? (
        <Empty
          resourceName="accounts"
          buttonLabel="Add account"
          path="/account/add"
        />
      ) : (
        <Row type="vertical">
          {userId && (
            <TotalAmount
              userId={userId}
              convertedBtcPrice={convertedBtcPrice}
            />
          )}
          <AccountList convertedBtcPrice={convertedBtcPrice} />

          {userId && (
            <TransactionList
              userId={userId}
              transactions={slicedTransactions}
            />
          )}
        </Row>
      )}
    </>
  )
}
