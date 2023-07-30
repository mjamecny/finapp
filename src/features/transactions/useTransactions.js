import { useQuery } from "@tanstack/react-query"
import { getTransactions } from "../../services/apiTransactions"

export function useTransactions(userId) {
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
