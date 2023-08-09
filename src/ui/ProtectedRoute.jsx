import { useUser } from "../features/authentication/useUser"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

import Spinner from "./Spinner"

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate()
  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser()

  // 2. If there no authenticated user, redirected to the /login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login")
  }, [isAuthenticated, isLoading, navigate])

  // 3. While loading, show spinner
  if (isLoading) return <Spinner />

  // 4. If there is a user, render the app
  if (isAuthenticated) return children
}
