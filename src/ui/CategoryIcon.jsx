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

const categories = [
  { value: "home", icon: <FaHome /> },
  {
    value: "food",
    icon: <FaFish />,
  },
  {
    value: "entertainment",
    icon: <FaTheaterMasks />,
  },
  { value: "health", icon: <FaMedkit /> },
  { value: "salary", icon: <FaMoneyBill /> },
  { value: "gift", icon: <FaGift /> },
  { value: "pets", icon: <FaCat /> },
  { value: "car", icon: <FaCar /> },
  { value: "transport", icon: <FaBus /> },
  { value: "study", icon: <FaBook /> },
  {
    value: "subscription",
    icon: <FaRedo />,
  },
  { value: "utilities", icon: <FaHotjar /> },
  { value: "other", icon: <FaQuestion /> },
]
export default function CategoryIcon({ category }) {
  const icon = categories.find((c) => c.value === category)?.icon
  return <span>{icon}</span>
}
