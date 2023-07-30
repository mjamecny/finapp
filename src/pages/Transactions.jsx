import { useUser } from "../features/authentication/useUser"
import TransactionList from "../features/transactions/TransactionList"
import { useTransactions } from "../features/transactions/useTransactions"
import ButtonBack from "../ui/ButtonBack"

export default function Transactions() {
  const { user } = useUser()
  const userId = user?.id
  const { isLoading, transactions, error } = useTransactions(userId)

  return (
    <div>
      <TransactionList userId={userId} transactions={transactions} />
      <ButtonBack />
    </div>
  )
}
