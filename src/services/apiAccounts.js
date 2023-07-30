import supabase from "./supabase"

export async function getAccounts(userId) {
  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("userId", userId)

  if (error) {
    console.error(error)
    throw new Error("Accounts could not be loaded")
  }

  return data
}

export async function createAccount({ newAccount }) {
  const { data, error } = await supabase
    .from("accounts")
    .insert([
      {
        type: newAccount.type,
        balance: newAccount.balance,
        userId: newAccount.userId,
      },
    ])
    .select()

  if (error) {
    console.error(error)
    throw new Error("Account could not be created")
  }

  return data
}

export async function deleteAccount(id) {
  const { data, error } = await supabase.from("accounts").delete().eq("id", id)

  if (error) {
    console.error(error)
    throw new Error("Account could not be deleted")
  }

  return data
}
