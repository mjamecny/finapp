import { useTranslation } from "react-i18next"

const useAccountCategories = () => {
  const { t } = useTranslation()

  const accountCategories = [
    { value: "Bank", label: t("accountCategories.bank") },
    { value: "Bitcoin", label: t("accountCategories.bitcoin") },
    { value: "Cash", label: t("accountCategories.cash") },
  ]

  return accountCategories
}

export default useAccountCategories
