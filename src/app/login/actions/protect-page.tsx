import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/navigation"

export default async function protectPage(redirectTo: string = "/clockinoutform") {
  const supabase = createClient()

  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (!authError || authData.user) {
    redirect(redirectTo)
  }
}
