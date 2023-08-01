import { styled } from "styled-components"

import HeaderMenu from "./HeaderMenu"
import Logo from "./Logo"
import { Link } from "react-router-dom"

const StyledHeader = styled.header`
  padding: 1.2rem 1.6rem;
  font-size: 1.6rem;
  height: min-content;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;
`

export default function Header() {
  return (
    <StyledHeader>
      <Link to="/dashboard">
        <Logo type="small" />
      </Link>
      <HeaderMenu />
    </StyledHeader>
  )
}
