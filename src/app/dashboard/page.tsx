import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import NavBar from "../navbar/components/navbar";
import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"
import WorkInfoPanel from "../workinfopanel/components/work-info-panel";

export default async function Dashboard() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/")
  }

  const { data : userData, error : authError } = await supabase
    .from("profiles")
    .select()
    .eq('user_ID', data.user.id)
  if (authError) {
    throw new Error(authError.message)
  }

  const user = userData[0]

  return (
    <main className={iuc_styles["page-body"]}>
      <NavBar pageTitle={`Dashboard`} userData={data.user} showClockIn={true} showAccount={true} showSignOut={true}/>
      <div
        className={iuc_styles["dashboard"]}>
        <p
          className={iuc_styles["dashboard-greeting"]}>Hi, {user.username}</p>
        <WorkInfoPanel userData={user}/>
      </div>
    </main>
  )
}
