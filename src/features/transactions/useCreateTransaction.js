import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTransaction as createTransactionApi } from "../../services/apiTransactions"
import { toast } from "react-hot-toast"

export function useCreateTransaction() {
  const queryClient = useQueryClient()

  const { mutate: createTransaction, isLoading: isCreating } = useMutation({
    mutationFn: createTransactionApi,
    onSuccess: () => {
      toast.success("New transaction successfully created")
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  return { isCreating, createTransaction }
}
