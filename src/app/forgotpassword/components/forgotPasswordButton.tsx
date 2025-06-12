"use client"

import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"
import { redirect } from "next/navigation"

export default function ForgotPasswordButton() {
  const handleClick = (() => {
    redirect("/forgotpassword")
  })

  return (
    <div className={`${iuc_styles["forgot-password-button-parent"]}`}>
        <button
          type="button"
          onClick={handleClick}
          className={`btn btn-neutral ${iuc_styles["forgot-password-button"]}`}>
          Forgot password
        </button>
    </div>
  )
} 
