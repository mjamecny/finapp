import { useTranslation } from "react-i18next"

import AccountList from "../features/accounts/AccountList"
import TotalAmount from "../features/accounts/TotalAmount"
import TransactionList from "../features/transactions/TransactionList"
import Row from "../ui/Row"
import Empty from "../ui/Empty"
import Spinner from "../ui/Spinner"

import { useTransactions } from "../features/transactions/useTransactions"
import { useAccounts } from "../features/accounts/useAccounts"

export default function Dashboard() {
  const { transactions } = useTransactions()
  const { isLoading, accounts } = useAccounts()
  const { t } = useTranslation()

  const slicedTransactions = transactions?.slice(0, 4)

  if (isLoading) return <Spinner />

  return (
    <>
      {!accounts.length ? (
        <Empty
          message={t("empty.accounts")}
          buttonLabel={t("empty.add_account")}
          path="/account/add"
        />
      ) : (
        <Row type="vertical">
          <TotalAmount />
          <AccountList />
          <TransactionList transactions={slicedTransactions} />
        </Row>
      )}
    </>
  )
}
