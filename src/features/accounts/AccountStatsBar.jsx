import styled, { css } from "styled-components"
import { FaArrowUp, FaArrowDown } from "react-icons/fa"

const StyledAccountStatsBar = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  border-radius: 7px;
  bottom: -7px;
  width: 124px;
  height: 20px;
  background-color: var(--color-grey-back-900);
  color: var(--color-grey-font-900);
`

const AccountStat = styled.p`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  font-size: 1rem;
  font-weight: 600;
`

const StatIcon = styled.span`
  width: 1rem;
  height: 1rem;

  ${(props) =>
    props.type === "withdrawals" &&
    css`
      color: #ff0000;
    `}

  ${(props) =>
    props.type === "deposits" &&
    css`
      color: #23c246;
    `}
`

export default function AccountStatsBar({
  account,
  transactions,
  userCurrency,
}) {
  let withdrawalsSum
  let depositsSum

  if (account.type === "Bank") {
    withdrawalsSum = transactions
      .filter((transaction) => transaction.type === "Bank")
      .reduce((acc, cur) => (cur.amount < 0 ? acc + cur.amount : acc), 0)

    depositsSum = transactions
      .filter((transaction) => transaction.type === "Bank")
      .reduce((acc, cur) => (cur.amount > 0 ? acc + cur.amount : acc), 0)
  }

  if (account.type === "Cash") {
    withdrawalsSum = transactions
      .filter((transaction) => transaction.type === "Cash")
      .reduce((acc, cur) => (cur.amount < 0 ? acc + cur.amount : acc), 0)

    depositsSum = transactions
      .filter((transaction) => transaction.type === "Cash")
      .reduce((acc, cur) => (cur.amount > 0 ? acc + cur.amount : acc), 0)
  }

  if (account.type === "Bitcoin") {
    withdrawalsSum = transactions
      .filter((transaction) => transaction.type === "Bitcoin")
      .reduce((acc, cur) => (cur.amount < 0 ? acc + cur.amount : acc), 0)

    depositsSum = transactions
      .filter((transaction) => transaction.type === "Bitcoin")
      .reduce((acc, cur) => (cur.amount > 0 ? acc + cur.amount : acc), 0)
  }

  return (
    <StyledAccountStatsBar>
      <AccountStat>
        <StatIcon type="deposits">
          <FaArrowUp />
        </StatIcon>

        <span>
          {account.type === "Bitcoin"
            ? depositsSum
            : `${Math.round(depositsSum)} ${
                (userCurrency === "usd" && "USD") ||
                (userCurrency === "czech-republic-koruna" && "CZK") ||
                (userCurrency === "eur" && "EUR")
              }`}
        </span>
      </AccountStat>
      <AccountStat>
        <StatIcon type="withdrawals">
          <FaArrowDown />
        </StatIcon>

        <span>
          {account.type === "Bitcoin"
            ? Math.abs(withdrawalsSum)
            : `${Math.abs(Math.round(withdrawalsSum))} ${
                (userCurrency === "usd" && "USD") ||
                (userCurrency === "czech-republic-koruna" && "CZK") ||
                (userCurrency === "eur" && "EUR")
              }`}
        </span>
      </AccountStat>
    </StyledAccountStatsBar>
  )
}
