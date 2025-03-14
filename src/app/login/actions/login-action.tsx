"use server"

import { LogInEntry} from "@/lib/interface"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export default async function loginAction(prevState: { message: string }, formData: FormData) {
  const supabase = await createClient()

  const data: LogInEntry = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const { error: signInError } = await supabase.auth.signInWithPassword(data)

  if (signInError) {
    const errorMessage = signInError.code as string
    return { message: errorMessage }
  }

  revalidatePath('/', 'layout')
  redirect('/clockinoutform')
}

