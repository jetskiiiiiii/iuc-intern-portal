"use client"

import setAccountInfoAction from "../actions/set-account-info-action"
import generateUsername from "@/components/helpers/generateUsername";
import { useActionState, useEffect, useState } from "react";
import { accountInfoFormSchema } from "../actions/set-account-info-schema";
import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"
import ValidatedInput from "@/components/ui/validated-input";

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import ForgotPasswordButton from "@/components/helpers/forgotPasswordButton";

export default function SetAccountInfoForm(userData: {userData?: User}) {
  // Using useActionState hook to send form to server
  const [ formState, formAction, pending ] = useActionState(setAccountInfoAction, {})

  // Establish supabase endpoint
  const supabase = createClient()

  // Get existing user data
  const [ isNewUser, setIsNewUser ] = useState<boolean>(false)
  const [ firstName, setFirstName ] = useState<string>("")
  const [ lastName , setLastName ] = useState<string>("")
  const [ email, setEmail ] = useState<string>("")
  const [ username, setUsername ] = useState<string>("")
  const [ phoneNumber, setPhoneNumber ] = useState<string>("")

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase.from('profiles').select("*")
      if (error) {
        throw error
      } else if (data && data.length > 0) {
        const profile = data[0]
        setFirstName(profile.firstName as string)
        setLastName(profile.lastName as string)
        setEmail(profile.email as string)
        setUsername(profile.username as string)
        setPhoneNumber(profile.phoneNumber as string)
      } else {
        setIsNewUser(true)
        setEmail(userData?.userData?.email as string)
        const getUsername = async () => {
          setUsername(await generateUsername())
        }
        getUsername()
      }
    };
    fetchProfile();
  }, [supabase, userData])

  // Handle generate username button
  const handleRegenerateUsername = async () => {
    setUsername(await generateUsername())
  }

  // TODO: RETRIEVE PROFILE INFO IF EXISTS, THEN UPDATE INSTEAD OF INSERT

  // Send form to client side validator
  const [ isSubmitted, setIsSubmitted ] = useState<boolean>(false)
  const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitted(true)
    const data = new FormData(event.currentTarget)
    const form = Object.fromEntries(data)

    const validateFormResult = accountInfoFormSchema.safeParse(form)
    if (!validateFormResult.success) {
      event.preventDefault()
    }
  }

  let saveButtonText: string; 
  if (pending) {
    saveButtonText = "Saving...";
  } else if (isNewUser) {
    saveButtonText = "Create profile";
  } else {
    saveButtonText = "Save info";
  }

  const [ resetPassword, setResetPassword ] = useState<boolean>(false)
  useEffect(() => {
    const confirmPasswordReset = async () => {
      const { data } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === "PASSWORD_RECOVERY") {
          setResetPassword(true)
        }
      })
    }
    confirmPasswordReset()
  })
  return (
    <div className={iuc_styles["iuc-form-parent"]}>
      <form
        id="set-account-info-form"
        onSubmit={formSubmit}
        action={formAction}
        noValidate
        className={iuc_styles["iuc-form-child"]}>

        <ValidatedInput
          name="firstName"
          wasSubmitted={isSubmitted}
          fieldSchema={accountInfoFormSchema.shape["firstName"]}
          errors={formState.errors?.firstName}
          defaultValue={isSubmitted ? (formState.form?.firstName ?? "") : (firstName ?? "")}
          placeholder="Enter your first name"
        />

        <ValidatedInput
          name="lastName"
          wasSubmitted={isSubmitted}
          fieldSchema={accountInfoFormSchema.shape["lastName"]}
          errors={formState.errors?.lastName}
          defaultValue={isSubmitted ? (formState.form?.lastName ?? "") : (lastName ?? "")}
          placeholder="Enter your last name"
        />

        <div
          id="username_container"
          className="flex flex-row justify-center items-center content-between">
          <input
            id="username"
            name="username"
            value={isSubmitted ? formState.form?.username : username}
            readOnly 
            className={
              `${iuc_styles["iuc-form-input"]}
              ${iuc_styles["iuc-form-input-parent"]}`
            }/>
          <button
            type="button"
            onClick={handleRegenerateUsername}
            className={
              `btn btn-soft
              ${iuc_styles["iuc-sign-out-button"]}`
            }>
          Regenerate username
          </button>
        </div>
        
        {/* TODO: SEND EMAIL VERIFICATION */}
        <ValidatedInput
          name="email"
          wasSubmitted={isSubmitted}
          fieldSchema={accountInfoFormSchema.shape["email"]}
          errors={formState.errors?.email}
          defaultValue={isSubmitted ? (formState.form?.email ?? "") as string : (email ?? "")}
          placeholder="Enter your email address"
        />

        <ValidatedInput
          name="phoneNumber"
          wasSubmitted={isSubmitted}
          fieldSchema={accountInfoFormSchema.shape["phoneNumber"]}
          errors={formState.errors?.phoneNumber}
          defaultValue={isSubmitted ? (formState.form?.phoneNumber ?? "") : (phoneNumber ?? "")}
          placeholder="Enter your phone number"
        />

        {/* TODO: BETTER PASSWORD LOGIC RESETTING, FORGETTING */
        /* TODO: ADD FORGOT PASSWORD DETECTION (FROM EMAIL)*/}
        {(isNewUser || resetPassword) ? 
        <ValidatedInput
          type="password"
          name="password"
          wasSubmitted={isSubmitted}
          fieldSchema={accountInfoFormSchema.shape["password"]}
          errors={formState.errors?.password}
          defaultValue={""}
          placeholder={isNewUser ? "Set your password" : "Reset your password (optional)"}
        /> : 
        <ForgotPasswordButton />}

        {formState.dbError && (
          <span className={iuc_styles["iuc-form-input-error"]}>{formState.dbError}</span>
        )}

        <button
          type="submit"
          aria-disabled={pending}
          className={`btn btn-primary ${iuc_styles["iuc-button-primary"]}`}>
          {saveButtonText}
        </button>

      </form>
    </div>
  )
}
