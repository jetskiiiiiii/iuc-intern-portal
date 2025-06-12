"use client"

import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"
import { useState } from "react"
import loginAsGuestAction from "../actions/log-in-as-guest-action"

export default function LogInAsGuestButton() {
  const [ loginAsGuestError, setLoginAsGuestError ] = useState<string | null>(null)
  const handleClick = (async () => {
    const error = await loginAsGuestAction()
    setLoginAsGuestError(error.dbError ?? null)
  })

  let loginAsGuestButtonText: string
  if (loginAsGuestError) {
    loginAsGuestButtonText = loginAsGuestError
  } else {
    loginAsGuestButtonText = "Log in as guest"
  }
  
  return (
    <div className={`${iuc_styles["forgot-password-button-parent"]}`}>
        <button
          type="button"
          onClick={handleClick}
          className={`btn btn-neutral ${iuc_styles["forgot-password-button"]}`}>
          {loginAsGuestButtonText}
        </button>
    </div>
  )
} 
