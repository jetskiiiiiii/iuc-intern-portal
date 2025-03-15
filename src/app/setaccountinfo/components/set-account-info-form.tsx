"use client"

import setAccountInfoAction from "../actions/set-account-info-action"
import getUserDataForClient from "@/components/helpers/get-user-data-for-client";
import { uniqueNamesGenerator, Config, colors, animals, NumberDictionary} from "unique-names-generator"
import { useActionState, useEffect, useState } from "react";
import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"

export default function SetAccountInfoForm() {
  const { userData, authError } = getUserDataForClient()
  if (authError) {
    throw authError
  }
  
  const numberDictionary = NumberDictionary.generate({ min: 100, max: 999 });
  const config: Config = {
    dictionaries: [colors, animals, numberDictionary],
    separator: "",
    style: "capital",
    length: 3,
  }
  const randomeUsername = uniqueNamesGenerator(config) 

  // useState must be used to keep input value controlled
  const [ userEmail, setUserEmail ] = useState<string | null>(userData?.email || null)

  useEffect(() => {
    setUserEmail(userData?.email || null)
  }, [userData])

  const initialState = {
    message: "Create a password"
  }
  // Using useActionState hook to handle login errors
  const [ state, formAction ] = useActionState(setAccountInfoAction, initialState) 

  return (
    <div className={iuc_styles["iuc-form-parent"]}>
      <form action={formAction} id="set-account-info-form" className={iuc_styles["iuc-form-child"]}>

        <input id="firstName" name="firstName" type="text" placeholder="First name" required
          className={iuc_styles["iuc-form-input"]} />

        <input id="lastName" name="lastName" type="text" placeholder="Last name" required
          className={iuc_styles["iuc-form-input"]} />

        <input id="username" name="username" type="text" placeholder="Create a username" value={randomeUsername} readOnly 
          className={iuc_styles["iuc-form-input"]} />
        
        <input id="email" name="email" type="text" placeholder="Enter your email address" value={userEmail || ""} readOnly
          className={iuc_styles["iuc-form-input"]} />

        <input id="phoneNumber" name="phoneNumber" type="text" placeholder="Enter your phone number" required
          className={iuc_styles["iuc-form-input"]} />

        <input id="password" name="password" type="password" placeholder={state?.message} required
          className={iuc_styles["iuc-form-input"]} />

        <button
          className={`btn btn-primary ${iuc_styles["iuc-button-primary"]}`}>
          Save Info
        </button>

      </form>
    </div>
  )
}
