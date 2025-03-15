"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { User, AuthError } from "@supabase/supabase-js"

export default function getUserDataForClient() {
  const [ userData, setUserData ] = useState<User | null>(null)
  const [ authError, setAuthError ] = useState<AuthError | null>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({data, error}) => {
      if (error) {
        setAuthError(error)
      }
      setUserData(data.user || null)
    })
  }, [supabase])

  return { userData, authError }
}
