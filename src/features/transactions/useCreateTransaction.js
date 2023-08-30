import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTransaction as createTransactionApi } from "../../services/apiTransactions"
import { toast } from "react-hot-toast"
import { useTranslation } from "react-i18next"

export function useCreateTransaction() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const { mutate: createTransaction, isLoading: isCreating } = useMutation({
    mutationFn: createTransactionApi,
    onSuccess: () => {
      toast.success(t("add_transaction.add_toast"))
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  return { isCreating, createTransaction }
}
