"use server"

import { SetAccountInfoEntry } from "@/lib/interface" 

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export default async function setAccountInfoAction(formData: FormData) {
  const supabase = createClient()
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData?.user) {
    redirect("/")
  }
  
  const accountInfo : SetAccountInfoEntry = {
    id: authData.user.id, 
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    phoneNumber: formData.get("phoneNumber") as string,
  }

  const { error: insertError } = await supabase
    .from("profiles")
    .insert(accountInfo)
  if (insertError) {
    throw new Error(insertError.message)
  }

  const { data: passwordData, error: passwordError } = await supabase.auth.updateUser({
    password: formData.get("password") as string,
  })
  if (passwordError) {
    throw new Error(passwordError.message)
  }
  
  revalidatePath("/", "layout")
  redirect("/clockinoutform")
  // redirect("/dashboard")
}
