import { useTranslation } from "react-i18next"

const useCategories = () => {
  const { t } = useTranslation()

  const categories = [
    { value: "home", label: t("category.home") },
    {
      value: "food",
      label: t("category.food"),
    },
    {
      value: "entertainment",
      label: t("category.entertainment"),
    },
    { value: "health", label: t("category.health") },
    { value: "salary", label: t("category.salary") },
    { value: "gift", label: t("category.gift") },
    { value: "pets", label: t("category.pets") },
    { value: "car", label: t("category.car") },
    { value: "transport", label: t("category.transport") },
    { value: "study", label: t("category.study") },
    {
      value: "subscription",
      label: t("category.subscription"),
    },
    { value: "utilities", label: t("category.utilities") },
    { value: "other", label: t("category.other") },
  ]

  return categories
}

export default useCategories
