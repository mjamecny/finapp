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
  background-color: #212529;
  color: #f8f9fa;
  font-size: 1rem;
  font-weight: 600;
`

const AccountStat = styled.p`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`

const StatIcon = styled.div`
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
    
  & svg {
    width: 1rem;
    height: 1rem;
  }
`

export default function AccountStatsBar({ account, transactions }) {
  let withdrawalsSum
  let depositsSum

  if (account.type === "Bank") {
    withdrawalsSum = transactions
      .filter((transaction) => transaction.type === "Bank")
      .reduce((acc, cur) => (cur.amount < 0 ? acc + cur.amount : 0), 0)

    depositsSum = transactions
      .filter((transaction) => transaction.type === "Bank")
      .reduce((acc, cur) => (cur.amount > 0 ? acc + cur.amount : 0), 0)
  }

  if (account.type === "Cash") {
    withdrawalsSum = transactions
      .filter((transaction) => transaction.type === "Cash")
      .reduce((acc, cur) => (cur.amount < 0 ? acc + cur.amount : 0), 0)

    depositsSum = transactions
      .filter((transaction) => transaction.type === "Cash")
      .reduce((acc, cur) => (cur.amount > 0 ? acc + cur.amount : 0), 0)
  }

  if (account.type === "Bitcoin") {
    withdrawalsSum = transactions
      .filter((transaction) => transaction.type === "Bitcoin")
      .reduce((acc, cur) => (cur.amount < 0 ? acc + cur.amount : 0), 0)

    depositsSum = transactions
      .filter((transaction) => transaction.type === "Bitcoin")
      .reduce((acc, cur) => (cur.amount > 0 ? acc + cur.amount : 0), 0)
  }

  return (
    <StyledAccountStatsBar>
      <AccountStat>
        <StatIcon type="deposits">
          <FaArrowUp />
        </StatIcon>

        <span>
          {account.type === "Bitcoin" ? depositsSum : `${depositsSum} CZK`}
        </span>
      </AccountStat>
      <AccountStat>
        <StatIcon type="withdrawals">
          <FaArrowDown />
        </StatIcon>

        <span>
          {account.type === "Bitcoin"
            ? Math.abs(withdrawalsSum)
            : `${Math.abs(withdrawalsSum)} CZK`}
        </span>
      </AccountStat>
    </StyledAccountStatsBar>
  )
}