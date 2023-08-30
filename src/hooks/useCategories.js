import { useTranslation } from "react-i18next"
// import {
//   FaBook,
//   FaBus,
//   FaCar,
//   FaCat,
//   FaFish,
//   FaGift,
//   FaHome,
//   FaHotjar,
//   FaMedkit,
//   FaMoneyBill,
//   FaQuestion,
//   FaRedo,
//   FaTheaterMasks,
// } from "react-icons/fa"

const useCategories = () => {
  // const Home = () => <FaHome />
  // const Food = () => <FaFish />
  // const Entertainment = () => <FaTheaterMasks />
  // const Health = () => <FaMedkit />
  // const Salary = () => <FaMoneyBill />
  // const Gift = () => <FaGift />
  // const Pets = () => <FaCat />
  // const Car = () => <FaCar />
  // const Transport = () => <FaBus />
  // const Study = () => <FaBook />
  // const Subscription = () => <FaRedo />
  // const Utilities = () => <FaHotjar />
  // const Other = () => <FaQuestion />
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
