import ButtonIcon from "../../ui/ButtonIcon"
import SpinnerMini from "../../ui/SpinnerMini"

import { HiArrowRightOnRectangle } from "react-icons/hi2"
import { useLogout } from "./useLogout"

export default function Logout() {
  const { logout, isLoading } = useLogout()
  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  )
}
