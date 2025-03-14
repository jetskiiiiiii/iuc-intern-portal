import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/navigation"

export const protectLogin = async (redirectTo = "/clockinoutform") => {
  const supabase = createClient()

  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (!authError || authData.user) {
    redirect(redirectTo)
  }
}
