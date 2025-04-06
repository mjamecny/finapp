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
  width: 170px;
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

function getWithdrawalsSum(transactions, type) {
  return transactions
    .filter((transaction) => transaction.type === type)
    .reduce((acc, cur) => (cur.amount < 0 ? acc + cur.amount : acc), 0)
}

function getDepositsSum(transactions, type) {
  return transactions
    .filter((transaction) => transaction.type === type)
    .reduce((acc, cur) => (cur.amount > 0 ? acc + cur.amount : acc), 0)
}

export default function AccountStatsBar({
  account,
  transactions,
  userCurrency,
}) {
  const { type } = account
  let withdrawalsSum = getWithdrawalsSum(transactions, type)
  let depositsSum = getDepositsSum(transactions, type)

  return (
    <StyledAccountStatsBar>
      <AccountStat>
        <StatIcon type="deposits">
          <FaArrowUp />
        </StatIcon>
        <Sum
          accountType={type}
          sum={depositsSum}
          type="depoSum"
          userCurrency={userCurrency}
        />
      </AccountStat>
      <AccountStat>
        <StatIcon type="withdrawals">
          <FaArrowDown />
        </StatIcon>
        <Sum
          accountType={type}
          sum={withdrawalsSum}
          type="withSum"
          userCurrency={userCurrency}
        />
      </AccountStat>
    </StyledAccountStatsBar>
  )
}

function Sum({ accountType, type, sum, userCurrency }) {
  if (accountType === "Bitcoin" && type === "depoSum") {
    return <span>{sum}</span>
  }

  if (type === "depoSum") {
    return (
      <span>{`${Math.round(sum)} ${
        (userCurrency === "united-states-dollar" && "USD") ||
        (userCurrency === "czech-republic-koruna" && "CZK") ||
        (userCurrency === "euro" && "EUR")
      }`}</span>
    )
  }

  if (accountType === "Bitcoin" && type === "withSum") {
    return <span>{Math.abs(sum)}</span>
  }

  if (type === "withSum") {
    return (
      <span>{`${Math.abs(Math.round(sum))} ${
        (userCurrency === "united-states-dollar" && "USD") ||
        (userCurrency === "czech-republic-koruna" && "CZK") ||
        (userCurrency === "euro" && "EUR")
      }`}</span>
    )
  }
}
