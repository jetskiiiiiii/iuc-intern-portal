"use server"

import { PreForgotPasswordEntry } from "@/lib/interface"
import { createClient } from "@/utils/supabase/server"

export default async function forgotPasswordAction(
  _prevState: PreForgotPasswordEntry,
  formData: FormData
): Promise<PreForgotPasswordEntry> {
  const supabase = await createClient()

  const form = Object.fromEntries(formData)
  const { email } = form

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email as string)) {
    return {
      errors: {
        email: ["Please enter a valid email address"]
      }
    }
  }

  const { data, error: resetPasswordError } = await supabase.auth.resetPasswordForEmail(email as string)
  if (resetPasswordError) {
    const errorMessage = resetPasswordError.message as string
    const errorCode = resetPasswordError.code as string
    return {
      dbError: errorMessage
    }
  }
  return {
    success: true
  }
}

