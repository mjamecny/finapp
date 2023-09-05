import { styled } from "styled-components"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { useUser } from "./useUser"
import { useUpdateUser } from "./useUpdateUser"

import Form from "../../ui/Form"
import FormRow from "../../ui/FormRow"
import Input from "../../ui/Input"
import Button from "../../ui/Button"
import FileInput from "../../ui/FileInput"
import SpinnerMini from "../../ui/SpinnerMini"
import Heading from "../../ui/Heading"

const StyledUpdateUserData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
`

export default function UpdateUserData() {
  const {
    user: {
      email,
      user_metadata: { username: currentUsername },
    },
  } = useUser()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { isUpdating, updateUser } = useUpdateUser()

  const [username, setUsername] = useState(currentUsername)
  const [avatar, setAvatar] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    if (!username) return

    updateUser(
      { username, avatar },
      {
        onSuccess: () => {
          setAvatar(null)
          e.target.reset()
          navigate("/dashboard")
        },
      }
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
      <Heading as="h2">{t("update_user_data.heading")}</Heading>
      <Form onSubmit={handleSubmit}>
        <FormRow label="Email">
          <Input value={email} disabled id="email" />
        </FormRow>
        <FormRow label={t("update_user_data.label_username")}>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            disabled={isUpdating}
          />
        </FormRow>
        <FormRow label={t("update_user_data.avatar")} id="image">
          <FileInput
            id="avatar"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            disabled={isUpdating}
          />
        </FormRow>
        <Button size="small" disabled={isUpdating}>
          {isUpdating ? <SpinnerMini /> : t("update_user_data.label_button")}
        </Button>
      </Form>
    </div>
  )
}
