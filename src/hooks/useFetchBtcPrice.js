import { useEffect, useState } from "react"

const useFetchBtcPrice = () => {
  const [btcPrice, setBtcPrice] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchBtcPrice() {
      setIsLoading(true)
      const res = await fetch("https://api.coincap.io/v2/rates/bitcoin")
      const data = await res.json()
      setBtcPrice(Number(data.data.rateUsd))
      setIsLoading(false)
    }

    fetchBtcPrice()
  }, [])

  return { btcPrice, isLoading }
}

export default useFetchBtcPrice
