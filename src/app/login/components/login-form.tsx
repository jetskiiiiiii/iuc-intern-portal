import loginAction from "../actions/login-action"
import { useActionState } from "react"
import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"

// TODO: Add a 'forget password' function

const initialState = {
  message: "Enter your password"
}

export default function LoginForm() {
  // Using useActionState hook to handle login errors
  const [ state, formAction ] = useActionState(loginAction, initialState) 

  return (
    <div className={iuc_styles["iuc-form-parent"]}>
      <form action={formAction} id="login-form" className={iuc_styles["iuc-form-child"]}>

        <input id="email" name="email" type="email" placeholder="Enter your email address" required 
          className={iuc_styles["iuc-form-input"]} />
        
        {/* // TODO: Assumes sign in error is in regards to password. */}
        <input id="password" name="password" type="password" placeholder={state?.message} required
          className={`${iuc_styles["iuc-form-input"]}
                    ${state?.message == "invalid_credentials" ? "" : ""}`}/>

        <button 
          className={`btn btn-primary ${iuc_styles["iuc-button-primary"]}`}>
          Log In
        </button>

      </form>
    </div>
  )
}
