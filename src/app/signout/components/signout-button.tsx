import { User } from "@supabase/supabase-js"
import signOutAction from "../actions/signout-action"
import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"

export default function SignOutButton(userData: {userData?: User}) {
  const handleClick = (async () => {
    await signOutAction(userData)
  })

  return (
    <button onClick={handleClick}
      className={`btn btn-neutral ${iuc_styles["iuc-sign-out-button"]}`}>
      Sign Out
    </button>
  )
}
