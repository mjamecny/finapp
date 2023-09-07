import { useTranslation } from "react-i18next"

export function convertToDDMMYYYY(timestamp) {
  const dateObj = new Date(timestamp)

  const day = String(dateObj.getDate()).padStart(2, "0")
  const month = String(dateObj.getMonth() + 1).padStart(2, "0")
  const year = dateObj.getFullYear()

  return `${day}/${month}/${year}`
}

export function convertToDDMonthTime(timestamp) {
  // Create a Date object from the timestamp
  const date = new Date(timestamp)

  // Define the month names to use
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Get the day, month, and time components
  const day = date.getDate()
  const month = monthNames[date.getMonth()]
  const hours = date.getHours()
  const minutes = date.getMinutes()

  // Format the date and time
  return `${day} ${month} ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`
}

export const getToday = function (options = {}) {
  const today = new Date()

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999)
  else today.setUTCHours(0, 0, 0, 0)
  return today.toISOString()
}

export function getCurrency(currency) {
  switch (currency) {
    case "usd":
      return "USD"
    case "czech-republic-koruna":
      return "CZK"
    case "eur":
      return "EUR"
    default:
      return "USD"
  }
}
