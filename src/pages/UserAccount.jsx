import UpdateUserData from "../features/authentication/UpdateUserData"
import UpdateUserPassword from "../features/authentication/UpdateUserPassword"

export default function UserAccount() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.4rem" }}>
      <UpdateUserData />
      <UpdateUserPassword />
    </div>
  )
}
