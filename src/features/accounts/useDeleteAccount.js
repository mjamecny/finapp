import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { deleteAccount as deleteAccountApi } from "../../services/apiAccounts"
import { useTranslation } from "react-i18next"

export function useDeleteAccount() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const { isLoading: isDeleting, mutate: deleteAccount } = useMutation({
    mutationFn: deleteAccountApi,
    onSuccess: () => {
      toast.success(t("delete_account.delete_toast"))
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
    },
    onError: (err) => toast.error(err.message),
  })

  return { isDeleting, deleteAccount }
}
