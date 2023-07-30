import { useAccounts } from "./useAccounts"
import styled from "styled-components"
import SpinnerMini from "../../ui/SpinnerMini"

const StyledTotalAmount = styled.div`
  display: flex;
  justify-content: center;
  color: #f8f9fa;
  border: 1px solid #f8f9fa;
  border-radius: 30px;
  padding: 1.2rem 1.6rem;
  font-size: 4.4rem;
  font-weight: 600;
`

export default function TotalAmount({ userId, convertedBtcPrice }) {
  const { accounts } = useAccounts(userId)

  const totalAmount = accounts?.reduce(
    (sum, account) =>
      account.type === "Bitcoin"
        ? sum + account.balance * convertedBtcPrice
        : sum + account.balance,
    0
  )

  return (
    <StyledTotalAmount>
      {/* {!totalAmount ? (
        <SpinnerMini />
      ) : (
        <p className="amount">
          {!totalAmount
            ? "Loading..."
            : `${Math.round(totalAmount).toLocaleString("cs-CZ")} CZK`
        </p>
      )} */}
      {/* {isLoading ? (
        <SpinnerMini />
      ) : (
        `${Math.round(totalAmount).toLocaleString("cs-CZ")} CZK`
      )} */}
      {`${Math.round(
        accounts?.reduce(
          (sum, account) =>
            account.type === "Bitcoin"
              ? sum + account.balance * convertedBtcPrice
              : sum + account.balance,
          0
        )
      ).toLocaleString("cs-CZ")} CZK`}
    </StyledTotalAmount>
  )
}
