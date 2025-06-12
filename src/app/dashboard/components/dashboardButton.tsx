import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"
import { redirect } from "next/navigation"

export default function DashboardButton() {
  const handleClick = () => {
    redirect("/dashboard")
  }
  return (
    <button onClick={handleClick}
      className={`btn btn-neutral ${iuc_styles["iuc-sign-out-button"]}`}>
      Dashboard
    </button>
  )
}

