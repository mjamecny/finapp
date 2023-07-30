import { useAccounts } from "./useAccounts"
import styled from "styled-components"

import Account from "./Account"
import Empty from "../../ui/Empty"

const StyledAccounts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
`

export default function AccountList({ userId, convertedBtcPrice }) {
  const { isLoading, accounts } = useAccounts(userId)

  if (isLoading) return "Loading"

  if (!accounts.length) return <Empty resourceName="accounts" />

  return (
    <StyledAccounts>
      {accounts?.map((account) => (
        <Account
          key={account.id}
          account={account}
          convertedBtcPrice={convertedBtcPrice}
        />
      ))}
    </StyledAccounts>
  )
}
