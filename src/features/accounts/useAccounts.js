import { useQuery } from "@tanstack/react-query"
import { getAccounts } from "../../services/apiAccounts"

export function useAccounts(userId) {
  const {
    data: accounts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["accounts"],
    queryFn: () => getAccounts(userId),
  })

  return { isLoading, accounts, error }
}
