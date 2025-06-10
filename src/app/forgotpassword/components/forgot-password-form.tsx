"use client"

import forgotPasswordAction from "../actions/forgot-password-action"
import { useActionState } from "react"
import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"
import { redirect } from "next/navigation"

export default function ForgotPasswordForm() {
  // Using useActionState hook to handle login errors
  const [ formState, formAction, pending ] = useActionState(forgotPasswordAction, {}) 

  let submitButtonText: string; 
  if (pending) {
    submitButtonText = "Confirming...";
  } else if (formState.success) {
    submitButtonText = "Password reset link sent to email!"
  } else if (formState.dbError) {
    submitButtonText = formState.dbError
  } else {
    submitButtonText = "Submit";
  }

  return (
    <div className={iuc_styles["iuc-form-parent"]}>
      <form
        id="forgot-password-form"
        action={formAction}
        noValidate
        className={iuc_styles["iuc-form-child"]}>

        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter your email address"
          required 
          className={iuc_styles["iuc-form-input"]} />
        
        {(formState.dbError || (formState.errors?.email && formState.errors?.email?.length > 0)) && (
          <span className={iuc_styles["iuc-form-input-error"]}>
            {formState.dbError || (formState.errors?.email && formState.errors?.email?.length > 0)}
          </span>
        )}

        <div className={`${iuc_styles["login-buttons-parent"]}`}>
          <button 
            type="submit"
            aria-disabled={pending}
            className={`btn btn-primary ${iuc_styles["iuc-button-primary"]}`}>
          {submitButtonText}
          </button>
          <button
            onClick={() => {redirect("/")}}
            className={`btn btn-neutral ${iuc_styles["forgot-password-button"]}`}>
          Go back
          </button>
        </div>

      </form>
    </div>
  )
}
