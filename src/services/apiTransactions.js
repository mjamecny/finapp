import { getToday } from "../utils/helpers"
import supabase from "./supabase"

export async function getTransactions(userId) {
  const { data, error } = await supabase
    .from("decrypted_transactions")
    .select(
      "id,created_at,amount,accountId,type,userId,decrypted_to,category,decrypted_description"
    )
    .eq("userId", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching transactions:", error.message)
    return null
  }

  return data
}

export async function getTransaction(id) {
  const { data, error } = await supabase
    .from("decrypted_transactions")
    .select(
      "id,created_at,amount,accountId,type,userId,decrypted_to,category,decrypted_description"
    )
    .eq("id", id)
    .single()

  if (error) {
    console.error(error)
    throw new Error("Transaction not found")
  }

  return data
}

export async function getTransactionsAfterDate(date, userId) {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .lt("amount", 0)
    .eq("userId", userId)
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }))

  if (error) {
    console.error(error)
    throw new Error("Transactions could not get loaded")
  }

  return data
}

export async function getTransactionsPerYear(date, userId) {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("userId", userId)
    .lt("amount", 0)
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }))

  if (error) {
    console.error(error)
    throw new Error("Transactions could not get loaded")
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
    throw new Error("Transaction could not be updated")
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
