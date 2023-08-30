import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAccount as createAccountApi } from "../../services/apiAccounts"
import { toast } from "react-hot-toast"
import { useTranslation } from "react-i18next"

export function useCreateAccount() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const { mutate: createAccount, isLoading: isCreating } = useMutation({
    mutationFn: createAccountApi,
    onSuccess: () => {
      toast.success(t("add_account.add_toast"))
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  return { isCreating, createAccount }
}
