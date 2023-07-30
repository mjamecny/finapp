import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { deleteAccount as deleteAccountApi } from "../../services/apiAccounts"

export function useDeleteAccount() {
  const queryClient = useQueryClient()

  const { isLoading: isDeleting, mutate: deleteAccount } = useMutation({
    mutationFn: deleteAccountApi,
    onSuccess: () => {
      toast.success("Account successfully deleted")
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
    },
    onError: (err) => toast.error(err.message),
  })

  return { isDeleting, deleteAccount }
}
