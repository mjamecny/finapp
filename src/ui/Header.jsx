import { styled } from "styled-components"
import { Link } from "react-router-dom"

import HeaderMenu from "./HeaderMenu"
import Logo from "./Logo"
import Locale from "./Locale"

const StyledHeader = styled.header`
  padding: 1.2rem 1.6rem;
  font-size: 1.6rem;
  height: min-content;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;
`

const StyledLink = styled(Link)`
  text-decoration: none;
`

export default function Header() {
  return (
    <StyledHeader>
      <StyledLink to="/dashboard">
        <Logo type="small" />
      </StyledLink>
      <HeaderMenu />
      <Locale />
    </StyledHeader>
  )
}
