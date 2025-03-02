import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export default async function Dashboard() {
  const supabase = await createClient()

  // Authenticate user using getUser()
  const { data, error } = await supabase.auth.getUser()
  if ( error || !data?.user) {
    redirect('/login')
  }

  return (
    <p>Hello</p>
  )
}
