import { styled } from "styled-components"

import { useUser } from "../features/authentication/useUser"

import HeaderMenu from "./HeaderMenu"

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  padding: 1.2rem 0rem;
  font-size: 1.6rem;
`

const Username = styled.p`
  color: var(--color-grey-font-900);
`

export default function Header() {
  const { user } = useUser()

  return (
    <StyledHeader>
      <Username>{user.user_metadata.username}</Username>
      <HeaderMenu />
    </StyledHeader>
  )
}
