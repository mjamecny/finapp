import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import { getTransaction } from "../../services/apiTransactions"

export function useTransaction() {
  const { transactionId } = useParams()

  const { isLoading, data: transaction } = useQuery({
    queryKey: ["transaction", transactionId],
    queryFn: () => getTransaction(transactionId),
    retry: false,
  })

  return { transaction, isLoading }
}
