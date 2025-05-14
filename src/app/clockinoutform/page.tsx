import { createClient } from "@/utils/supabase/server";
import protectPage from "../login/actions/protect-page";
import NavBar from "../navbar/components/navbar";
import ClockInOutForm from "./components/clock-in-out-form";
import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"
import { redirect } from "next/navigation";

export default async function ClockInOut() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/")
  }

  return (
    <main className={iuc_styles["page-body"]}>
      <NavBar pageTitle="Clock In/Out" showAccount={true} showSignOut={true}/>
      <ClockInOutForm />
    </main>
  );
}
