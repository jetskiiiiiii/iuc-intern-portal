import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"
import { redirect } from "next/navigation"

export default function SetAccountInfoButton() {
  const handleClick = () => {
    redirect("/setaccountinfo")
  }
  return (
    <button onClick={handleClick}
      className={`btn btn-error ${iuc_styles["iuc-sign-out-button"]}`}>
      Account 
    </button>
  )
}
