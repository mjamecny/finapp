import { useEffect, useState } from "react"

const useBtcToCzkConversion = () => {
  const [convertedBtcPrice, setConvertedBtcPrice] = useState(null)

  useEffect(() => {
    async function getCzkRate() {
      const res = await fetch(
        "https://api.coincap.io/v2/rates/czech-republic-koruna"
      )
      const data = await res.json()
      const czkRate = Number(data.data.rateUsd)
      const res2 = await fetch("https://api.coincap.io/v2/rates/bitcoin")
      const data2 = await res2.json()
      const btcPrice = Number(data2.data.rateUsd)

      setConvertedBtcPrice(btcPrice / czkRate)
    }

    getCzkRate()
  }, [])

  return convertedBtcPrice
}

export default useBtcToCzkConversion
