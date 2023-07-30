import supabase from "./supabase"

export async function getTransactions(userId) {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("userId", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching transactions:", error.message)
    return null
  }

  return data
}

export async function createTransaction({ newTransaction }) {
  const { data, error } = await supabase
    .from("transactions")
    .insert([
      {
        userId: newTransaction.userId,
        amount: newTransaction.amount,
        description: newTransaction.description,
        accountId: newTransaction.accountId,
        type: newTransaction.type,
      },
    ])
    .select()

  if (error) {
    console.error(error)
    throw new Error("Transaction could not be created")
  }

  await supabase
    .from("accounts")
    .update({
      balance: newTransaction.newBalance,
    })
    .eq("id", newTransaction.accountId)

  return data
}

export async function deleteTransaction({ deletedTransaction }) {
  const { data, error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", deletedTransaction.id)

  if (error) {
    console.error(error)
    throw new Error("Transaction could not be deleted")
  }

  await supabase
    .from("accounts")
    .update({
      balance: deletedTransaction.balance,
    })
    .eq("id", deletedTransaction.accountId)

  return data
}
