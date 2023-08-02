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
        to: newTransaction.to,
        category: newTransaction.category,
      },
    ])
    .select()

  if (error) {
    console.error(error)
    throw new Error("Transaction could not be created")
  }

  return data
}

export async function updateTransaction(newTransaction, id) {
  const { data, error } = await supabase
    .from("transactions")
    .update({ ...newTransaction })
    .eq("id", id)

  if (error) {
    console.error(error)
    throw new Error("Cabin could not be updated")
  }

  return data
}

export async function deleteTransaction(id) {
  const { data, error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id)

  if (error) {
    console.error(error)
    throw new Error("Transaction could not be deleted")
  }

  return data
}
