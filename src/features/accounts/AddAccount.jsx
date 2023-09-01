import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import styled from "styled-components"
import { useTranslation } from "react-i18next"

import Form from "../../ui/Form"
import FormRow from "../../ui/FormRow"
import Input from "../../ui/Input"
import Button from "../../ui/Button"
import Select from "../../ui/Select"
import ButtonBack from "../../ui/ButtonBack"

import { useCreateAccount } from "./useCreateAccount"
import { useAccounts } from "./useAccounts"
import { useUser } from "../authentication/useUser"
import useAccountCategories from "../../hooks/useAccountCategories"

const StyledAddAccount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #212529;
  height: 100vh;
`

export default function AddAccount() {
  const [accountType, setAccountType] = useState("Bank")
  const [initialBalance, setInitialBalance] = useState("")

  const { user } = useUser()
  const { accounts } = useAccounts()
  const { isCreating, createAccount } = useCreateAccount()

  const navigate = useNavigate()
  const { t } = useTranslation()
  const accountCategories = useAccountCategories()

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
            options={accountCategories}
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
