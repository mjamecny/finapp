import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLogin } from "./useLogin"
import styled from "styled-components"

import Form from "../../ui/Form"
import FormRow from "../../ui/FormRow"
import Input from "../../ui/Input"
import Button from "../../ui/Button"
import ButtonHome from "../../ui/ButtonHome"
import SpinnerMini from "../../ui/SpinnerMini"

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #212529;
  height: 100vh;
`

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { login, isLoading } = useLogin()

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    if (!email || !password) return
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("")
          setPassword("")
        },
      }
    )
  }

  return (
    <StyledLogin>
      <Form onSubmit={handleSubmit}>
        <FormRow label="Email">
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormRow>
        <FormRow label="Password">
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormRow>

        <Button> {isLoading ? <SpinnerMini /> : "Login"}</Button>
      </Form>
      <ButtonHome />
    </StyledLogin>
  )
}
