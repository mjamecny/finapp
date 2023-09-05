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

import { useTransactionsPerYear } from "./useTransactionsPerYear"

const StyledMonthlySpending = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`

export default function MonthlySpending() {
  const { t } = useTranslation()
  const { transactions, isLoading } = useTransactionsPerYear()

  if (isLoading) return <Spinner />

  // Group the transactions by month
  const monthlyStats = transactions.reduce((stats, transaction) => {
    const transactionDate = parseISO(transaction.created_at)
    const monthStart = startOfMonth(transactionDate)
    const monthKey = format(monthStart, "MMM yyyy")

    if (!stats[monthKey]) {
      stats[monthKey] = {
        month: monthKey,
        totalAmount: 0,
      }
    }

    stats[monthKey].totalAmount += Math.abs(transaction.amount)

    return stats
  }, {})

  // Convert the result object into an array of monthly statistics
  const monthlyStatsArray = Object.values(monthlyStats)

  monthlyStatsArray.sort((a, b) => {
    const dateA = new Date(a.month)
    const dateB = new Date(b.month)
    return dateA - dateB
  })

  return (
    <StyledMonthlySpending>
      <Heading as="h2">{t("monthly_spending.heading")}</Heading>
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
            dataKey="totalAmount"
            type="monotone"
            stroke="var(--color-grey-font-900)"
            fill="var(--color-grey-font-900)"
            name="Total Withdrawals"
            unit="CZK"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledMonthlySpending>
  )
}
