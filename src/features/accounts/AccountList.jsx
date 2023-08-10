import styled from "styled-components"
import { useNavigate } from "react-router-dom"

import { useAccounts } from "./useAccounts"

import Account from "./Account"
import Empty from "../../ui/Empty"
// import Spinner from "../../ui/Spinner"
import Button from "../../ui/Button"
import SpinnerMini from "../../ui/SpinnerMini"

const StyledAccounts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`

const AccountsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
`

export default function AccountList({ userId, btcConverted, userCurrency }) {
  const { isLoading, accounts } = useAccounts(userId)
  const navigate = useNavigate()

  if (isLoading) return <SpinnerMini />

  if (!accounts.length)
    return (
      <Empty
        resourceName="accounts"
        buttonLabel="Add account"
        path="/account/add"
      />
    )

  return (
    <StyledAccounts>
      <AccountsContainer>
        {accounts?.map((account) => (
          <Account
            key={account.id}
            account={account}
            // btcPrice={btcPrice}
            btcConverted={btcConverted}
            userCurrency={userCurrency}
          />
        ))}
      </AccountsContainer>

      {accounts.length < 3 && (
        <Button onClick={() => navigate("/account/add")}>Add account</Button>
      )}
    </StyledAccounts>
  )
}
