import { styled } from "styled-components"

import Logout from "../features/authentication/Logout"
import DarkModeToggle from "./DarkModeToggle"

import Locale from "./Locale"

const StyledHeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  list-style: none;
`

export default function HeaderMenu() {
  return (
    <StyledHeaderMenu>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
      <li>
        <Locale />
      </li>
    </StyledHeaderMenu>
  )
}
