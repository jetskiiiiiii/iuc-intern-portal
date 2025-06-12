"use client"

import loginAction from "../actions/login-action"
import { useActionState } from "react"
import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"
import ForgotPasswordButton from "@/app/forgotpassword/components/forgotPasswordButton"
import LogInAsGuestButton from "@/app/loginasguest/components/logInAsGuestButton"

export default function LoginForm() {
  // Using useActionState hook to handle login errors
  const [ formState, formAction, pending ] = useActionState(loginAction, {}) 

  let loginButtonText: string; 
  if (pending) {
    loginButtonText = "Logging in...";
  } else {
    loginButtonText = "Log in";
  }

  return (
    <div className={iuc_styles["iuc-form-parent"]}>
      <form
        id="login-form"
        action={formAction}
        noValidate
        className={iuc_styles["iuc-form-child"]}>

        <div className={iuc_styles["iuc-form-input-parent"]}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            required 
            className={iuc_styles["iuc-form-input"]} />
          {(formState.errors?.email && formState.errors?.email?.length > 0) && (
            <span className={iuc_styles["iuc-form-input-error"]}>{formState.errors?.email[0]}</span>
          )}
        </div>
        
        <div className={iuc_styles["iuc-form-input-parent"]}>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            className={`${iuc_styles["iuc-form-input"]}`}/>
          {(formState.dbError ) && (
            <span className={iuc_styles["iuc-form-input-error"]}>{formState.dbError}</span>
          )}
        </div>

        <div className={`${iuc_styles["login-buttons-parent"]}`}>
          <button 
            type="submit"
            aria-disabled={pending}
            className={`btn btn-primary ${iuc_styles["iuc-button-primary"]}`}>
            {loginButtonText}
          </button>
          <div
            className={`${iuc_styles["login-buttons-misc-container"]}`}>
            <LogInAsGuestButton />
            <ForgotPasswordButton />
          </div>
        </div>

      </form>
    </div>
  )
}
