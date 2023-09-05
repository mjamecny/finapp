import supabase from "./supabase"

export async function signup({ username, email, password, currency }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        currency,
      },
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession()

  if (!session.session) return null

  const { data, error } = await supabase.auth.getUser()

  if (error) {
    throw new Error(error.message)
  }

  return data?.user
}

export async function logout() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message)
  }
}

export async function updateCurrentUser({ password, username, avatar }) {
  // 1 update password or fullName
  let updateData
  if (password) updateData = { password }
  if (username) updateData = { data: { username } }

  const { data, error } = await supabase.auth.updateUser(updateData)

  if (error) {
    throw new Error(error.message)
  }

  if (!avatar) return data

  // 2 upload avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar)

  if (storageError) {
    throw new Error(storageError.message)
  }

  // 3 update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${
        import.meta.env.VITE_SUPABASE_URL
      }/storage/v1/object/public/avatars/${fileName}`,
    },
  })

  if (error2) {
    throw new Error(error2.message)
  }

  return updatedUser
}
