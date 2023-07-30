import { styled } from "styled-components"
import Logout from "../features/authentication/Logout"
import { useNavigate } from "react-router-dom"
import { useUser } from "../features/authentication/useUser"

const StyledHeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  list-style: none;
`

const Username = styled.p`
  color: #f8f9fa;
`

export default function HeaderMenu() {
  const navigate = useNavigate()

  const { user } = useUser()
  return (
    <StyledHeaderMenu>
      <li>
        <Username>{user.user_metadata.username}</Username>
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  )
}
