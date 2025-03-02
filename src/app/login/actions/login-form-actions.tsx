'use server'

import { LogInEntry, SignUpEntry } from "@/lib/interface"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/server"

// TODO: fix error handling (invalid login credentials, password rule)

export async function loginAction(formData: FormData) {
  const supabase = await createClient()

  const data: LogInEntry = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    throw new Error(error.message)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

// signup function not used 
export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data: SignUpEntry = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    username: formData.get("username") as string,
    last_name: formData.get("last_name") as string,
    first_name: formData.get("first_name") as string,
    phone_number: formData.get("phone_number") as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    throw new Error(error.message)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
