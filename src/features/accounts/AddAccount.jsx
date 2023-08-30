import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import styled from "styled-components"

import Form from "../../ui/Form"
import FormRow from "../../ui/FormRow"
import Input from "../../ui/Input"
import Button from "../../ui/Button"
import Select from "../../ui/Select"

import { useCreateAccount } from "./useCreateAccount"
import { useAccounts } from "./useAccounts"
import { useUser } from "../authentication/useUser"
import ButtonBack from "../../ui/ButtonBack"
import { useTranslation } from "react-i18next"

const StyledAddAccount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #212529;
  height: 100vh;
`

const options = [
  { value: "Bank", label: "Bank" },
  { value: "Bitcoin", label: "Bitcoin" },
  { value: "Cash", label: "Cash" },
]

export default function AddAccount() {
  const [accountType, setAccountType] = useState("Bank")
  const [initialBalance, setInitialBalance] = useState("")

  const { user } = useUser()
  const userId = user?.id
  const { accounts } = useAccounts(userId)
  const { isCreating, createAccount } = useCreateAccount()

  const navigate = useNavigate()
  const { t } = useTranslation()

  function handleSubmit(e) {
    e.preventDefault()

    if (!initialBalance) {
      toast.error("Please fill initial balance")
      return
    }

    const hasAdded = accounts.some((account) => account.type === accountType)

    if (hasAdded) {
      toast.error("Account already added")
      setInitialBalance("")
      return
    }

    const newAccount = {
      balance: initialBalance,
      type: accountType,
      userId: user.id,
    }

    createAccount({ newAccount })

    setInitialBalance("")
    navigate("/dashboard")
  }

  return (
    <StyledAddAccount>
      <Form onSubmit={handleSubmit}>
        <FormRow label={t("add_account.account_label")}>
          <Select
            options={options}
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            disabled={isCreating}
          />
        </FormRow>
        <FormRow label={t("add_account.initial_label")}>
          <Input
            id="initialBalance"
            type="number"
            value={initialBalance}
            onChange={(e) => setInitialBalance(Number(e.target.value))}
            required
            disabled={isCreating}
          />
        </FormRow>

        <Button disabled={isCreating}>{t("add_account.add_button")}</Button>
      </Form>
      <ButtonBack />
    </StyledAddAccount>
  )
}
