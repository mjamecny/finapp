import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

import { useSignup } from "./useSignup"

import Form from "../../ui/Form"
import Button from "../../ui/Button"
import FormRow from "../../ui/FormRow"
import Input from "../../ui/Input"
import ButtonHome from "../../ui/ButtonHome"
import SpinnerMini from "../../ui/SpinnerMini"
import Select from "../../ui/Select"

const StyledSignup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #212529;
  height: 100vh;
`

const currencyOptions = [
  { value: "czech-republic-koruna", label: "CZK" },
  { value: "euro", label: "EUR" },
  { value: "usd", label: "USD" },
]

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [currency, setCurrency] = useState("usd")
  const { signup, isLoading } = useSignup()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    if (!email || !password || !username) return
    signup({ username, email, password, currency })
  }

  return (
    <StyledSignup>
      <Form onSubmit={handleSubmit}>
        <FormRow label="Username">
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isLoading}
          />
        </FormRow>

        <FormRow label="Email">
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </FormRow>
        <FormRow label="Password">
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </FormRow>
        <FormRow label="Currency">
          <Select
            options={currencyOptions}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            disabled={isLoading}
          />
        </FormRow>

        <Button>{isLoading ? <SpinnerMini /> : "Sign up"}</Button>
      </Form>
      <ButtonHome />
    </StyledSignup>
  )
}
