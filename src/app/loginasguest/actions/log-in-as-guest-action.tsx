"use server"

import { PreLoginEntry } from "@/lib/interface";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function loginAsGuestAction(): Promise<PreLoginEntry> {
  const supabase = await createClient()
  const { data: userData, error: loginError } = await supabase.auth.signInAnonymously()
  if (loginError) {
    const loginErrorCode = loginError.code
    const loginErrorMessage = loginError.message
    return {
      dbError: loginErrorMessage
    }
  }

  const { error: insertError } = await supabase
    .from("profiles")
    .insert({user_ID: userData.user?.id, username: "Guest"})
  if (insertError) {
    const errorCode = insertError.code as string
    const errorMessage = insertError.message as string
    return {
      dbError: errorMessage
    }
  } else {
    redirect("/dashboard")
  }
}
