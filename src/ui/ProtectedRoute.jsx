import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import supabase from "../services/supabase"
import { useUser } from "../features/authentication/useUser"
import AuthMFA from "../features/authentication/AuthMFA"

import Spinner from "./Spinner"

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate()
  const [readyToShow, setReadyToShow] = useState(false)
  const [showMFAScreen, setShowMFAScreen] = useState(false)

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser()

  useEffect(() => {
    ;(async () => {
      try {
        const { data, error } =
          await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
        if (error) {
          throw error
        }

        if (data.nextLevel === "aal2" && data.nextLevel !== data.currentLevel) {
          setShowMFAScreen(true)
          navigate("/mfa")
        }
      } finally {
        setReadyToShow(true)
      }
    })()
  }, [])

  // 2. If there no authenticated user, redirected to the /login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login")
  }, [isAuthenticated, isLoading, navigate])

  // 3. While loading, show spinner
  if (isLoading) return <Spinner />

  if (readyToShow && isAuthenticated) {
    if (showMFAScreen) {
      return <AuthMFA setShowMFAScreen={setShowMFAScreen} />
    }
    return children
  }
}
