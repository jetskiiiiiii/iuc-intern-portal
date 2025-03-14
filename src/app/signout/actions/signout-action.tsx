"use server" 

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function signOutAction() {
  const supabase = await createClient()

  const { error: signOutError } = await supabase.auth.signOut()

  if (signOutError) {
    throw signOutError
  } else {
    redirect("/")
  }
}
