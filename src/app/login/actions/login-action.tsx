"use server"

import { LogInEntry} from "@/lib/interface"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

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
  redirect('/clockinoutform')
  // redirect('/dashboard')
}

