import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import GlobalStyles from "./styles/GlobalStyles"
import AddTransaction from "./features/transactions/AddTransaction"
import AddAccount from "./features/accounts/AddAccount"
import PageNotFound from "./pages/PageNotFound"
import Login from "./features/authentication/Login"
import Signup from "./features/authentication/Signup"
import AppLayout from "./ui/AppLayout"
import ProtectedRoute from "./ui/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import Welcome from "./pages/Welcome"
import Transactions from "./pages/Transactions"
import UpdateTransaction from "./features/transactions/UpdateTransaction"

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
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="transaction/add" element={<AddTransaction />} />
              <Route
                path="transaction/:transactionId/edit"
                element={<UpdateTransaction />}
              />
              <Route path="account/add" element={<AddAccount />} />
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
    </>
  )
}

export default App
