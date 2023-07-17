import { AiOutlineArrowLeft } from "react-icons/ai"
import { useNavigate } from "react-router-dom"

export default function PageNotFound() {
  const navigate = useNavigate()
  return (
    <div className="page-not-found">
      <p>Page not found</p>
      <div className="back">
        <AiOutlineArrowLeft onClick={() => navigate("/")} />
      </div>
    </div>
  )
}
