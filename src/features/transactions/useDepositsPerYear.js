import { useQuery } from "@tanstack/react-query"
import { subDays } from "date-fns"
import { getDepositsPerYear } from "../../services/apiTransactions"
import { useUser } from "../authentication/useUser"

export function useDepositsPerYear() {
  const { user } = useUser()
  const userId = user?.id

  const numDays = 365

  const queryDate = subDays(new Date(), numDays).toISOString()

  const { isLoading, data: deposits } = useQuery({
    queryFn: () => getDepositsPerYear(queryDate, userId),
    queryKey: ["deposits", `last-${numDays}`],
  })

  return { isLoading, deposits }
}
