"use server"

import { PreSetAccountInfoEntry, SetAccountInfoEntry } from "@/lib/interface" 
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { accountInfoFormSchemaPartial } from "./set-account-info-schema"
import { revalidatePath } from "next/cache"

export default async function setAccountInfoAction(
  _prevState: PreSetAccountInfoEntry, 
  formData: FormData
): Promise<PreSetAccountInfoEntry> {
  const supabase = await createClient()
  const { data: userData, error: authError } = await supabase.auth.getUser()
  if (authError || !userData?.user) {
    redirect("/")
  }
  const form = Object.fromEntries(formData)
  const { firstName, lastName, username, email, password, phoneNumber } = form 

  const validationResult = accountInfoFormSchemaPartial.safeParse(form)
  if (!validationResult.success) {
    console.log(validationResult.error.flatten().fieldErrors)
    return {
      form,
      errors: validationResult.error.flatten().fieldErrors
    }
  }

  const user_ID : string = userData.user?.id as string
  const accountInfoEntry : SetAccountInfoEntry = {
    firstName: firstName as string,
    lastName: lastName as string,
    username: username as string,
    email: email as string,
    phoneNumber: phoneNumber as string,
  }
  const timeUpdated = new Date()

  // Upsert user info into profiles table
  const { error: upsertError } = await supabase
    .from("profiles")
    .upsert({user_ID: user_ID, ...accountInfoEntry, lastUpdated: timeUpdated}, {
      onConflict: "user_ID",
      ignoreDuplicates: false
    })
  if (upsertError) {
    const errorMessage = upsertError.message as string
    const errorCode = upsertError.code as string
    return {
      form,
      dbError: errorMessage }
  }

  if (userData.user?.email !== email as string) {
    const { data: _emailData, error: emailError } = await supabase.auth.updateUser({
      email: email as string,
    })
    if (emailError) {
      const errorMessage = emailError.message as string
      const errorCode = emailError.code as string
      return {
        form,
        errors: { email: [errorMessage] }
      }
    }
  }

  const { data: _passwordData, error: passwordError } = await supabase.auth.updateUser({
    password: password as string,
  })
  if (passwordError) {
    const errorMessage = passwordError.message as string
    const errorCode = passwordError.code as string
    return { 
      form,
      errors: { password: [errorMessage] }
    }
  }

  revalidatePath("/")
  redirect("/dashboard")
}
