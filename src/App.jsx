import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import GlobalStyles from "./styles/GlobalStyles"

import AddTransaction from "./features/transactions/AddTransaction"
import AddAccount from "./features/accounts/AddAccount"
import Login from "./features/authentication/Login"
import Signup from "./features/authentication/Signup"
import UpdateTransaction from "./features/transactions/UpdateTransaction"
import AuthMFA from "./features/authentication/AuthMFA"

import AppLayout from "./ui/AppLayout"
import ProtectedRoute from "./ui/ProtectedRoute"

import PageNotFound from "./pages/PageNotFound"
import Stats from "./pages/Stats"
import Dashboard from "./pages/Dashboard"
import Welcome from "./pages/Welcome"
import Transactions from "./pages/Transactions"
import TransactionDetail from "./pages/TransactionDetail"
import UserAccount from "./pages/UserAccount"

import { DarkModeProvider } from "./context/DarkModeContext"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
})

function App() {
  return (
    <>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="mfa" element={<AuthMFA />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="transaction/add" element={<AddTransaction />} />
                <Route
                  path="transaction/:transactionId/edit"
                  element={<UpdateTransaction />}
                />
                <Route
                  path="transaction/:transactionId"
                  element={<TransactionDetail />}
                />

                <Route path="account/add" element={<AddAccount />} />
                <Route path="stats" element={<Stats />} />
                <Route path="user" element={<UserAccount />} />
              </Route>

              <Route index element={<Welcome />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
              },
            }}
          />
        </QueryClientProvider>
      </DarkModeProvider>
    </>
  )
}

export default App
