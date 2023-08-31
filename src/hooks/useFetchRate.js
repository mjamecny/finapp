import { useEffect, useState } from "react"
import { useUser } from "../features/authentication/useUser"

const useFetchRate = () => {
  const { user } = useUser()
  const currency = user?.user_metadata?.currency

  const [rate, setRate] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getRate() {
      setIsLoading(true)
      const res = await fetch(`https://api.coincap.io/v2/rates/${currency}`)
      const data = await res.json()
      const rateUsd =
        data.data && data.data.rateUsd ? Number(data.data.rateUsd) : null
      setRate(rateUsd)
      setIsLoading(false)
    }

    if (currency === "usd") {
      setRate(1)
      setIsLoading(false)
      return
    }
    getRate()
  }, [])

  return { rate, isLoading }
}

export default useFetchRate
