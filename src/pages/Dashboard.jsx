import AccountList from "../features/accounts/AccountList"
import TotalAmount from "../features/accounts/TotalAmount"
import TransactionList from "../features/transactions/TransactionList"
import Row from "../ui/Row"
import Empty from "../ui/Empty"
import Spinner from "../ui/Spinner"

import { useUser } from "../features/authentication/useUser"
import { useTransactions } from "../features/transactions/useTransactions"
import { useAccounts } from "../features/accounts/useAccounts"

export default function Dashboard() {
  const { user } = useUser()
  const userId = user?.id
  const userCurrency = user?.user_metadata?.currency

  const { transactions } = useTransactions(userId)
  const { isLoading, accounts } = useAccounts(userId)

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
          {userId && userCurrency && (
            <TotalAmount userId={userId} userCurrency={userCurrency} />
          )}
          {userCurrency && <AccountList userCurrency={userCurrency} />}

          {userCurrency && (
            <TransactionList
              transactions={slicedTransactions}
              userCurrency={userCurrency}
            />
          )}
        </Row>
      )}
    </>
  )
}
