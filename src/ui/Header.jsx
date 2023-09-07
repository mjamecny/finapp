import { styled } from "styled-components"
import { FaBars, FaX } from "react-icons/fa6"
import { useState } from "react"

import MainNav from "./MainNav"
import Logo from "./Logo"

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  padding: 1.2rem 0rem;
  font-size: 1.6rem;
  position: relative;

  & svg {
    cursor: pointer;
    width: 2.2rem;
    height: 2.2rem;
  }
`

export default function Header() {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <StyledHeader>
      <Logo type="medium" />

      {showMenu ? (
        <FaX onClick={() => setShowMenu((showMenu) => !showMenu)} />
      ) : (
        <FaBars onClick={() => setShowMenu((showMenu) => !showMenu)} />
      )}
      {showMenu && <MainNav setShowMenu={setShowMenu} />}
    </StyledHeader>
  )
}
