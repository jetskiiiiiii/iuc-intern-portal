"use server"

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function PrivatePage() {
  const supabase = await createClient()

  // Authenticate user using getUser()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/")
  }

  const { data:userData, error:userError } = await supabase
    .from("profiles")
    .select()
  if (userError) {
    throw new Error(userError.message)
  }

  // TODO: add update password function
  // TODO: set account info should update if info exists, not insert
  return <p>Hello  b {data.user.id} {userData[0].username}</p>
}
