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
      const res = await fetch(
        `https://rest.coincap.io/v3/rates?apiKey=${
          import.meta.env.VITE_COINCAP_KEY
        }`
      )
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
