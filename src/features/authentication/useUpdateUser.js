import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { toast } from "react-hot-toast"

import { updateCurrentUser } from "../../services/apiAuth"

export function useUpdateUser() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success(t("update_user_data.toast"))
      queryClient.setQueryData(["user"], user)
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  return { isUpdating, updateUser }
}
