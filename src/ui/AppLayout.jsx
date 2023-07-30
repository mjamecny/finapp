import styled from "styled-components"
import { Outlet } from "react-router-dom"

import Header from "./Header"

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content;
  height: 100vh;
`

export default function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Outlet />
    </StyledAppLayout>
  )
}
