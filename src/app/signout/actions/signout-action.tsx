"use server" 

import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export default async function signOutAction(userData: {userData?: User}) {
  const supabase = await createClient()

  if (userData.userData?.is_anonymous) {
    // Delete user if guest
    const responseDeleteProfile = await supabase
      .from('profiles')
      .delete()
      .eq("user_ID", userData.userData?.id)
    if (responseDeleteProfile.error) {
      throw responseDeleteProfile.error
    }

    const responseDeleteHoursWorked = await supabase
      .from('total-hours-worked')
      .delete()
      .eq("user_ID", userData.userData?.id)
    if (responseDeleteHoursWorked.error) {
      throw responseDeleteHoursWorked.error
    }

    const responseDeleteClockInOutEntries = await supabase
      .from('clock-in-out-entry')
      .delete()
      .eq("user_ID", userData.userData?.id)
    if (responseDeleteClockInOutEntries.error) {
      throw responseDeleteClockInOutEntries.error
    }
  }

  const { error: signOutError } = await supabase.auth.signOut({scope: 'local'})
  if (signOutError) {
    throw signOutError
  } else {
    redirect("/")
  }
}
