import { styled } from "styled-components"
import { useTranslation } from "react-i18next"
import {
  FaRedo,
  FaTheaterMasks,
  FaHome,
  FaFish,
  FaMedkit,
  FaMoneyBill,
  FaGift,
  FaCat,
  FaCar,
  FaBus,
  FaBook,
  FaQuestion,
  FaHotjar,
} from "react-icons/fa"

const StyledCategory = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 9rem;
  background-color: #495057;
  color: #f8f9fa;
  border-radius: 2rem;
`

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;

  & svg {
    width: 2rem;
    height: 2rem;
  }
`

const CategoryName = styled.p`
  font-size: 1rem;
`

const TotalAmount = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
`

const capitalizeFirstLetter = (inputString) =>
  `${inputString.charAt(0).toUpperCase()}${inputString.slice(1)}`

export default function Category({ category }) {
  const { label, totalAmount } = category
  const { t } = useTranslation()

  const categories = [
    { value: "home", label: t("category.home"), icon: <FaHome /> },
    {
      value: "food",
      label: t("category.food"),
      icon: <FaFish />,
    },
    {
      value: "entertainment",
      label: t("category.entertainment"),
      icon: <FaTheaterMasks />,
    },
    { value: "health", label: t("category.health"), icon: <FaMedkit /> },
    { value: "salary", label: t("category.salary"), icon: <FaMoneyBill /> },
    { value: "gift", label: t("category.gift"), icon: <FaGift /> },
    { value: "pets", label: t("category.pets"), icon: <FaCat /> },
    { value: "car", label: t("category.car"), icon: <FaCar /> },
    { value: "transport", label: t("category.transport"), icon: <FaBus /> },
    { value: "study", label: t("category.study"), icon: <FaBook /> },
    {
      value: "subscription",
      label: t("category.subscription"),
      icon: <FaRedo />,
    },
    {
      value: "utilities",
      label: t("category.utilities"),
      icon: <FaHotjar />,
    },
    { value: "other", label: t("category.other"), icon: <FaQuestion /> },
  ]

  return (
    <StyledCategory>
      <IconBox>
        {categories.map((category) => {
          if (category.value === label) {
            return (
              <>
                {category.icon}
                <CategoryName>
                  {capitalizeFirstLetter(category.label)}
                </CategoryName>
              </>
            )
          }
        })}
      </IconBox>
      <TotalAmount>{totalAmount} CZK</TotalAmount>
    </StyledCategory>
  )
}
