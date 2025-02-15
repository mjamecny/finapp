import { useEffect, useState } from "react"
import { useUser } from "../features/authentication/useUser"

const useFetchRates = () => {
  const { user } = useUser()
  const currency = user?.user_metadata?.currency

  const [bitcoinPrice, setBitcoinPrice] = useState(null)
  // const [rate, setRate] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchRates() {
      setIsLoading(true)
      const res = await fetch("https://api.coincap.io/v2/rates")
      const data = await res.json()
      const filterRate = data.data.filter((rate) => rate.id === currency)[0]
        .rateUsd
      const filterBtcPrice = data.data.filter(
        (rate) => rate.id === "bitcoin"
      )[0].rateUsd

      setBitcoinPrice(filterBtcPrice / filterRate)
      setIsLoading(false)
    }

    fetchRates()
  }, [currency])

  return { bitcoinPrice, isLoading }
}

export default useFetchRates
