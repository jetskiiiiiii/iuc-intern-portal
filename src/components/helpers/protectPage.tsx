import { createClient } from "@/utils/supabase/server"
import { User } from "@supabase/supabase-js"
import { redirect } from "next/navigation"

export async function protectPage(): Promise<User | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/")
  }

  return data.user
}
