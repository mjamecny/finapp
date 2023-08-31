import { useQuery } from "@tanstack/react-query"
import { getAccounts } from "../../services/apiAccounts"
import { useUser } from "../authentication/useUser"

export function useAccounts() {
  const { user } = useUser()
  const userId = user?.id

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
