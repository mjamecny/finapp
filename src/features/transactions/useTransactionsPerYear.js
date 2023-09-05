import { useQuery } from "@tanstack/react-query"
import { subDays } from "date-fns"
import { getTransactionsPerYear } from "../../services/apiTransactions"
import { useUser } from "../authentication/useUser"

export function useTransactionsPerYear() {
  const { user } = useUser()
  const userId = user?.id

  const numDays = 365

  const queryDate = subDays(new Date(), numDays).toISOString()

  const { isLoading, data: transactions } = useQuery({
    queryFn: () => getTransactionsPerYear(queryDate, userId),
    queryKey: ["transactions", `last-${numDays}`],
  })

  return { isLoading, transactions }
}
