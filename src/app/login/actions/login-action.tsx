"use server"

import { LogInWithEmailEntry, LogInWithUsernameEntry, PreLoginEntry } from "@/lib/interface"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export default async function loginAction(
  _prevState: PreLoginEntry,
  formData: FormData
): Promise<PreLoginEntry> {
  const supabase = await createClient()

  // Form doesn't need to be sent back since we assume credentials are invalid
  const form = Object.fromEntries(formData)
  const { email, password } = form

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email as string)) {
    return {
      errors: {
        email: ["Please enter a valid email address"]
      } 
    }
  }

  // Supabase has no 'sign in with username' functionality
  const data: LogInWithEmailEntry = {
    email: email as string,
    password: password as string,
  }

  const { error: signInError } = await supabase.auth.signInWithPassword(data)
  if (signInError) {
    const errorMessage = signInError.message as string
    const errorCode = signInError.code as string
    return {
      dbError: errorMessage
    }
  }

  revalidatePath('/', 'layout')
  redirect('/clockinoutform')
}

