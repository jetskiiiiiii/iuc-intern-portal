import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"
import { redirect } from "next/navigation"

export default function ClockInOutButton() {
  const handleClick = () => {
    redirect("/clockinoutform")
  }
  return (
    <button onClick={handleClick}
      className={`btn btn-neutral ${iuc_styles["iuc-sign-out-button"]}`}>
      Clock In/Out 
    </button>
  )
}
