"use server";

import { createClient } from "@/utils/supabase/server";
import { ClockInEntry, ClockOutEntry } from "@/lib/interface";

export async function getClockInStatusAction() {
  let rowID: string =  ""
  let hoursWorked: number = 0
  let isClockedIn: boolean = false

  const supabase = await createClient()

  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError) {
    throw authError
  }

  const { data: statusData, error: statusError } = await supabase
    .from("clock-in-out-entry")
    .select("row_ID, clock_in_time, is_clocked_in")
    .eq("user_ID", authData.user.id)
    .eq("is_clocked_in", true)
  if (statusError) {
    throw statusError
  }

  if (statusData.length > 0) {
    rowID = statusData[0].row_ID

    const timeNow = new Date(statusData[0].clock_in_time).valueOf()
    const timeClockedIn = new Date().valueOf()
    hoursWorked = timeClockedIn - timeNow

    isClockedIn = true
  } 

  return [rowID, hoursWorked, isClockedIn]
}

export async function clockInAction(timeClockedIn: Date) {
  const supabase = await createClient()

  const { error: authError } = await supabase.auth.getUser()
  if (authError) {
    throw authError
  }

  const clockInTime: ClockInEntry = {
    clock_in_time: timeClockedIn,
    is_clocked_in: true,
  }

  const { data: rowID, error: insertError } = await supabase
    .from("clock-in-out-entry")
    .insert(clockInTime)
    .select()
  if (insertError) {
    throw insertError
  } else {
    return rowID[0].row_ID
  }
}

// Update "clock-out-time" column based on row_ID
export async function clockOutAction(rowID: string, timeClockedOut: Date) {
  const supabase = await createClient()

  const { error: authError } = await supabase.auth.getUser()
  if (authError) {
    throw authError
  }

  const clockOutTime: ClockOutEntry = {
    clock_out_time: timeClockedOut,
    is_clocked_in: false,
  }

  const { error: updateError } = await supabase
    .from("clock-in-out-entry")
    .update(clockOutTime)
    .eq("row_ID", rowID)
  if (updateError) {
    throw updateError
  }
}
