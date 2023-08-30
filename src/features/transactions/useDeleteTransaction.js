import { useTranslation } from "react-i18next"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { deleteTransaction as deleteTransactionApi } from "../../services/apiTransactions"

export function useDeleteTransaction() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const { isLoading: isDeleting, mutate: deleteTransaction } = useMutation({
    mutationFn: deleteTransactionApi,
    onSuccess: () => {
      toast.success(t("delete_transaction.delete_toast"))
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
    },
    onError: (err) => toast.error(err.message),
  })

  return { isDeleting, deleteTransaction }
}
