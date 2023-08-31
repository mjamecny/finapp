import { styled } from "styled-components"

import Logout from "../features/authentication/Logout"
import DarkModeToggle from "./DarkModeToggle"

import { useUser } from "../features/authentication/useUser"

const StyledHeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  list-style: none;
`

const Username = styled.p`
  color: var(--color-grey-font-900);
`

export default function HeaderMenu() {
  const { user } = useUser()

  return (
    <StyledHeaderMenu>
      <li>
        <Username>{user.user_metadata.username}</Username>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  )
}
