import { useEffect, useState } from "react"
import { useUser } from "../features/authentication/useUser"

const useFetchRates = () => {
  const { user } = useUser()
  const currency = user?.user_metadata?.currency

  const [bitcoinPrice, setBitcoinPrice] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchRates() {
      setIsLoading(true)
      const res = await fetch("https://api.coingecko.com/api/v3/exchange_rates")
      const data = await res.json()
      Object.keys(data?.rates).forEach((key) => {
        if (key === currency) {
          setBitcoinPrice(data?.rates[key].value)
        }
      })
      setIsLoading(false)
    }

    fetchRates()
  }, [currency])

  return { bitcoinPrice, isLoading }
}

export default useFetchRates
