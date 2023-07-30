import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAccount as createAccountApi } from "../../services/apiAccounts"
import { toast } from "react-hot-toast"

export function useCreateAccount() {
  const queryClient = useQueryClient()

  const { mutate: createAccount, isLoading: isCreating } = useMutation({
    mutationFn: createAccountApi,
    onSuccess: () => {
      toast.success("New account successfully created")
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  return { isCreating, createAccount }
}
