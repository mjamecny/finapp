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

const IconWrapper = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline-offset: 6px;

  & svg {
    color: var(--color-grey-font-900);
  }
`

export default function Header() {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <StyledHeader>
      <Logo type="medium" />

      {showMenu ? (
        <IconWrapper>
          <FaX onClick={() => setShowMenu((showMenu) => !showMenu)} />
        </IconWrapper>
      ) : (
        <IconWrapper>
          <FaBars onClick={() => setShowMenu((showMenu) => !showMenu)} />
        </IconWrapper>
      )}
      {showMenu && <MainNav setShowMenu={setShowMenu} />}
    </StyledHeader>
  )
}
