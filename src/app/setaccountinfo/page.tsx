import { createClient } from "@/utils/supabase/server"
import NavBar from "../navbar/components/navbar"
import SetAccountInfoForm from "./components/set-account-info-form"
import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"
import { redirect } from "next/navigation"

export default async function SetAccountInfo() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/")
  }

  return (
    <main className={iuc_styles["page-body"]}>
      <NavBar pageTitle="Set Account Info" userData={data.user} showDashboard={true} showClockIn={true} showSignOut={true}/>
      <SetAccountInfoForm userData={data?.user}/>
    </main>
  );
}
