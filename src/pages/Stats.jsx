import { styled } from "styled-components"

import RecentSpending from "../features/transactions/RecentSpending"
import WithDepoGraph from "../features/transactions/WithDepoGraph"

const StyledStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export default function Stats() {
  return (
    <StyledStats>
      <WithDepoGraph />
      <RecentSpending />
    </StyledStats>
  )
}
