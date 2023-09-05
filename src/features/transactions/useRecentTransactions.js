import { useQuery } from "@tanstack/react-query"
import { subDays } from "date-fns"
import { useSearchParams } from "react-router-dom"
import { getTransactionsAfterDate } from "../../services/apiTransactions"
import { useUser } from "../authentication/useUser"

export function useRecentTransactions() {
  const { user } = useUser()
  const userId = user?.id

  const [searchParams] = useSearchParams()

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"))

  const queryDate = subDays(new Date(), numDays).toISOString()

  const { isLoading, data: transactions } = useQuery({
    queryFn: () => getTransactionsAfterDate(queryDate, userId),
    queryKey: ["transactions", `last-${numDays}`],
  })

  return { isLoading, transactions }
}
