import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateTransaction as updateTransactionApi } from "../../services/apiTransactions"
import { toast } from "react-hot-toast"
import { useTranslation } from "react-i18next"

export function useUpdateTransaction() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const { mutate: updateTransaction, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newTransaction, transactionId }) =>
      updateTransactionApi(newTransaction, transactionId),
    onSuccess: () => {
      toast.success(t("update_transaction.update_toast"))
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  return { isUpdating, updateTransaction }
}
