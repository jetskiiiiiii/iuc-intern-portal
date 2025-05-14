"use server"

import { PreSetAccountInfoEntry, SetAccountInfoEntry } from "@/lib/interface" 
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { accountInfoFormSchema } from "./set-account-info-schema"

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

  const validationResult = accountInfoFormSchema.safeParse(form)
  if (!validationResult.success) {
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

  // Upsert user info into profiles table
  const { error: insertError } = await supabase
    .from("profiles")
    .upsert({user_ID, ...accountInfoEntry})
  if (insertError) {
    const errorMessage = insertError.message as string
    const errorCode = insertError.code as string
    return {
      form,
      dbError: errorMessage }
  }

  const { data: _passwordData, error: passwordError } = await supabase.auth.updateUser({
    password: password as string,
  })
  if (passwordError) {
    const errorMessage = passwordError.message as string
    const errorCode = passwordError.code as string
    return { 
      form,
      errors: { password: [errorMessage] }}
  }

  revalidatePath("/", "layout")
  redirect("/clockinoutform")
  // redirect("/dashboard")
}
