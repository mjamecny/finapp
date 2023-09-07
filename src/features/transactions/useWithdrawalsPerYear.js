import { useQuery } from "@tanstack/react-query"
import { subDays } from "date-fns"
import { getWithdrawalsPerYear } from "../../services/apiTransactions"
import { useUser } from "../authentication/useUser"

export function useWithdrawalsPerYear() {
  const { user } = useUser()
  const userId = user?.id

  const numDays = 365

  const queryDate = subDays(new Date(), numDays).toISOString()

  const { isLoading, data: withdrawals } = useQuery({
    queryFn: () => getWithdrawalsPerYear(queryDate, userId),
    queryKey: ["withdrawals", `last-${numDays}`],
  })

  return { isLoading, withdrawals }
}
