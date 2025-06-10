import signOutAction from "../actions/signout-action"
import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"

export default function SignOutButton() {
  return (
    <button onClick={signOutAction}
      className={`btn btn-neutral ${iuc_styles["iuc-sign-out-button"]}`}>
      Sign Out
    </button>
  )
}
