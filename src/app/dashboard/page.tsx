import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ClockInOutForm from "../clockinoutform/components/clock-in-out-form";

export default async function Dashboard() {
  const supabase = await createClient()

  // Authenticate user using getUser()
  const { data, error } = await supabase.auth.getUser()
  if ( error || !data?.user) {
    redirect('/login')
  }

  const { data:userData, error:userError } = await supabase
    .from("profiles")
    .select()
    .eq('id', data.user.id)

  if (userError) {
    throw new Error(userError.message)
  }

  return (
    <section>
      <p>Hello {userData[0].username}</p>
      <ClockInOutForm />
    </section>
  )
}
