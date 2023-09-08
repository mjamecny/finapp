import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { parseISO, startOfMonth, format } from "date-fns"
import { useTranslation } from "react-i18next"
import { styled } from "styled-components"

import Heading from "../../ui/Heading"
import Spinner from "../../ui/Spinner"

import { useWithdrawalsPerYear } from "./useWithdrawalsPerYear"
import { useDepositsPerYear } from "./useDepositsPerYear"
import { useUser } from "../authentication/useUser"
import { getCurrency } from "../../utils/helpers"

const StyledMonthlySpending = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`

const EmptyWithdrawals = styled.p`
  display: flex;
  justify-content: center;
  font-size: 2rem;
`
export default function WithDepoGraph() {
  const { user } = useUser()
  const { t } = useTranslation()
  const { withdrawals, isLoading } = useWithdrawalsPerYear()
  const { deposits, isLoading2 } = useDepositsPerYear()

  if (isLoading || isLoading2) return <Spinner />

  const userCurrency = getCurrency(user?.user_metadata?.currency)

  // Group the withdrawals by month
  let monthlyStatsW = {}
  if (withdrawals?.length) {
    monthlyStatsW = withdrawals.reduce((stats, transaction) => {
      const transactionDate = parseISO(transaction.created_at)
      const monthStart = startOfMonth(transactionDate)
      const monthKey = format(monthStart, "MMM yyyy")

      if (!stats[monthKey]) {
        stats[monthKey] = {
          month: monthKey,
          totalAmountWithdrawals: 0,
          totalAmountDeposits: 0,
        }
      }

      stats[monthKey].totalAmountWithdrawals += Math.abs(transaction.amount)

      return stats
    }, {})
  }

  // Group the deposits by month
  let monthlyStatsD = {}
  if (deposits?.length) {
    monthlyStatsD = deposits.reduce((stats, transaction) => {
      const transactionDate = parseISO(transaction.created_at)
      const monthStart = startOfMonth(transactionDate)
      const monthKey = format(monthStart, "MMM yyyy")

      if (!stats[monthKey]) {
        stats[monthKey] = {
          month: monthKey,
          totalAmountWithdrawals: 0,
          totalAmountDeposits: 0,
        }
      }

      stats[monthKey].totalAmountDeposits += Math.abs(transaction.amount)

      return stats
    }, {})
  }

  // Combine the monthly withdrawal and deposit data
  const mergedMonthlyStats = {}

  Object.keys(monthlyStatsW).forEach((month) => {
    mergedMonthlyStats[month] = {
      ...mergedMonthlyStats[month],
      ...monthlyStatsW[month],
    }
  })

  Object.keys(monthlyStatsD).forEach((month) => {
    mergedMonthlyStats[month] = {
      ...mergedMonthlyStats[month],
      ...monthlyStatsD[month],
    }
  })

  // Convert the merged data into an array
  const monthlyStatsArray = Object.values(mergedMonthlyStats)

  // Sort the merged array by month
  monthlyStatsArray.sort((a, b) => {
    const dateA = new Date(a.month)
    const dateB = new Date(b.month)
    return dateA - dateB
  })

  return (
    <StyledMonthlySpending>
      <Heading as="h2">{t("monthly_spending.heading")}</Heading>
      {!withdrawals?.length && !deposits?.length ? (
        <EmptyWithdrawals>{t("monthly_spending.notfound")}</EmptyWithdrawals>
      ) : (
        <ResponsiveContainer height={300} width="90%">
          <AreaChart data={monthlyStatsArray}>
            <CartesianGrid strokeDasharray="1" />
            <XAxis
              dataKey="month"
              tick={{ fill: "var(--color-grey-font-900)" }}
            />
            <YAxis tick={{ fill: "var(--color-grey-font-900)" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "var(--color-grey-back-900)" }}
            />
            <Area
              dataKey="totalAmountWithdrawals"
              type="monotone"
              stroke="#e03131"
              fill="#e03131"
              name={t("monthly_spending.w_label")}
              unit={userCurrency}
            />
            <Area
              dataKey="totalAmountDeposits"
              type="monotone"
              stroke="#2f9e44"
              fill="#2f9e44"
              name={t("monthly_spending.d_label")}
              unit={userCurrency}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </StyledMonthlySpending>
  )
}
