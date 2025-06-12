"use client"

import setAccountInfoAction from "../actions/set-account-info-action"
import generateUsername from "@/components/helpers/generateUsername";
import { useActionState, useEffect, useState } from "react";
import { accountInfoFormSchema, accountInfoFormSchemaPartial } from "../actions/set-account-info-schema";
import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"
import ValidatedInput from "@/components/ui/validated-input";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import ForgotPasswordButton from "@/app/forgotpassword/components/forgotPasswordButton";
import { useSearchParams } from "next/navigation";

export default function SetAccountInfoForm(userData: {userData?: User}) {
  // Establish supabase endpoint
  const supabase = createClient()

  // Using useActionState hook to send form to server
  const [ formState, formAction, pending ] = useActionState(setAccountInfoAction, {})

  // Send form to client side validator
  const [ isSubmitted, setIsSubmitted ] = useState<boolean>(false)
  const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget)
    const form = Object.fromEntries(data)

    const validateFormResult = accountInfoFormSchemaPartial.safeParse(form)
    if (!validateFormResult.success) {
      event.preventDefault()
    }
    setIsSubmitted(true)
    setFirstName(formState.form?.firstName ?? "")
    setLastName(formState.form?.lastName ?? "")
    setEmail(formState.form?.email ?? "")
    setPhoneNumber(formState.form?.phoneNumber ?? "")
  }

  // Get existing user data
  const [ profileLoaded, setProfileLoaded ] = useState<boolean>(false)
  const [ isNewUser, setIsNewUser ] = useState<boolean>(false)
  const [ firstName, setFirstName ] = useState<string>("")
  const [ lastName , setLastName ] = useState<string>("")
  const [ email, setEmail ] = useState<string>("")
  const [ username, setUsername ] = useState<string>("")
  const [ phoneNumber, setPhoneNumber ] = useState<string>("")

  const isGuest = userData.userData?.is_anonymous

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase.from("profiles").select("*")
      if (error) {
        throw error
      } else if (data && data.length > 0) { // If user exists
        const profile = data[0]
        setFirstName(profile.firstName)
        setLastName(profile.lastName)
        setEmail(profile.email)
        setUsername(profile.username)
        setPhoneNumber(profile.phoneNumber)
      } else {
        setIsNewUser(true)
        setEmail(userData?.userData?.email as string)
        const getUsername = async () => {
          setUsername(await generateUsername())
        }
        getUsername()
      }

      setProfileLoaded(true)
    };
    fetchProfile();
  }, [supabase, userData])

  // Handle generate username button
  const handleRegenerateUsername = async () => {
    setUsername(await generateUsername())
  }

  // Manually get event from type since 'PASSWORD_RECOVERY' is emitted (Supabase error)
  const searchParams = useSearchParams()
  const initialIsResetPassword = searchParams?.get('type') == "recovery"
  const [ resetPassword, setResetPassword ] = useState<boolean>(initialIsResetPassword)

  let saveButtonText: string
  if (pending) {
    saveButtonText = "Saving...";
  } else if (isNewUser) {
    saveButtonText = "Create profile";
  } else {
    saveButtonText = "Save info"
  }

  return (profileLoaded &&
    <div className={iuc_styles["iuc-form-parent"]}>
      <form
        id="set-account-info-form"
        onSubmit={formSubmit}
        action={formAction}
        noValidate
        className={iuc_styles["iuc-form-child"]}>

        <ValidatedInput
          type="text"
          name="firstName"
          wasSubmitted={isSubmitted}
          fieldSchema={accountInfoFormSchema.shape["firstName"]}
          errors={formState.errors?.firstName}
          defaultValue={firstName}
          placeholder="Enter your first name"
        />

        <ValidatedInput
          type="text"
          name="lastName"
          wasSubmitted={isSubmitted}
          fieldSchema={accountInfoFormSchema.shape["lastName"]}
          errors={formState.errors?.lastName}
          defaultValue={lastName}
          placeholder="Enter your last name"
        />

        <div
          id="username_container"
          className="flex flex-row justify-center items-center content-between">
          <input
            id="username"
            name="username"
            value={username}
            readOnly 
            className={
              `${iuc_styles["iuc-form-input"]}
              ${iuc_styles["iuc-form-input-parent"]}`
            }/>
          {!isGuest && 
            <button
              type="button"
              onClick={handleRegenerateUsername}
              className={
                `btn btn-soft
                ${iuc_styles["iuc-sign-out-button"]}`
              }>
            Regenerate username
            </button>
          }
        </div>
        
        {/* TODO: SEND EMAIL VERIFICATION */}
        <ValidatedInput
          type="email"
          name="email"
          wasSubmitted={isSubmitted}
          fieldSchema={accountInfoFormSchema.shape["email"]}
          errors={formState.errors?.email}
          defaultValue={email}
          placeholder="Enter your email address"
        />

        <ValidatedInput
          type="tel"
          name="phoneNumber"
          wasSubmitted={isSubmitted}
          fieldSchema={accountInfoFormSchema.shape["phoneNumber"]}
          errors={formState.errors?.phoneNumber}
          defaultValue={phoneNumber}
          placeholder="Enter your phone number"
        />

        {(isNewUser || resetPassword) ? (
        <ValidatedInput
          type="password"
          name="password"
          wasSubmitted={isSubmitted}
          fieldSchema={accountInfoFormSchema.shape["password"]}
          errors={formState.errors?.password}
          defaultValue={""}
          placeholder={"Set your password"}/> 
        ) : (
          <ForgotPasswordButton />
        )}

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
