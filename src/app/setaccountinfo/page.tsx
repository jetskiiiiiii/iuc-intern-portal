import SetAccountInfoForm from "./components/set-account-info-form"
import "@/app/globals.css"
import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"

export default function SetAccountInfo() {
  return (
    <main className={iuc_styles["page-body"]}>
      <section className={iuc_styles["page-title"]}>
        <h1>Set Account Info</h1>
      </section>

      <SetAccountInfoForm />
    </main>
  )
}
