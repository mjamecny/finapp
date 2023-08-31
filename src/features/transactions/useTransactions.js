import { useQuery } from "@tanstack/react-query"
import { getTransactions } from "../../services/apiTransactions"
import { useUser } from "../authentication/useUser"

export function useTransactions() {
  const { user } = useUser()
  const userId = user?.id

  const {
    data: transactions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(userId),
  })

  return { isLoading, transactions, error }
}
