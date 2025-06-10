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
  const { data: userData, error: authError } = await supabase.auth.getUser()
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

  const { data: clockInOutData, error: fetchError } = await supabase
    .from("clock-in-out-entry")
    .select(`clock_in_time, clock_out_time`)
    .eq("row_ID", rowID)
    .single()
  if (fetchError) {
    throw fetchError
  }

  const clockInTime : Date = new Date(clockInOutData["clock_in_time"])
  const clockOuTime : Date = new Date(clockInOutData["clock_out_time"])
  const currentHoursWorked : number = (clockOuTime.getTime() - clockInTime.getTime()) / (1000 * 60 * 60)

  const { data: userHoursData, error: fetchErrorSecond } = await supabase
    .from("total-hours-worked")
    .select("total_hours_worked")
    .eq("user_ID", userData.user?.id)
  if (fetchErrorSecond) {
    throw fetchErrorSecond
  } else {
    const totalHoursWorked : number = (userHoursData.length === 0 ? 0 : userHoursData[0]["total_hours_worked"]) + currentHoursWorked
    const { error: upsertError } = await supabase
      .from("total-hours-worked")
      .upsert({ "user_ID": userData.user.id, "total_hours_worked": totalHoursWorked}, {onConflict: "user_ID", ignoreDuplicates: false})
    if (upsertError) {
      throw upsertError
    }
  }
}
