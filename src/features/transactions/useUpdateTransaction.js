import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateTransaction as updateTransactionApi } from "../../services/apiTransactions"
import { toast } from "react-hot-toast"

export function useUpdateTransaction() {
  const queryClient = useQueryClient()

  const { mutate: updateTransaction, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newTransaction, id }) =>
      updateTransactionApi(newTransaction, id),
    onSuccess: () => {
      toast.success("Transaction successfully updated")
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  return { isUpdating, updateTransaction }
}
