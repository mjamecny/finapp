import styled from "styled-components"
import { Outlet } from "react-router-dom"

import Header from "./Header"
import Footer from "./Footer"

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr min-content;
  height: 100vh;
  gap: 1.8rem;
`

export default function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Outlet />
      <Footer />
    </StyledAppLayout>
  )
}
