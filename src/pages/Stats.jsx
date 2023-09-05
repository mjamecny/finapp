import { styled } from "styled-components"

import RecentSpending from "../features/transactions/RecentSpending"
import MonthlySpending from "../features/transactions/MonthlySpending"

const StyledStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export default function Stats() {
  return (
    <StyledStats>
      <MonthlySpending />
      <RecentSpending />
    </StyledStats>
  )
}
