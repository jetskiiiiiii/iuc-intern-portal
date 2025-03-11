"use server";

import { createClient } from "@/utils/supabase/server";
import { ClockInEntry, ClockOutEntry } from "@/lib/interface";

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

export async function getTimeElapsed() {
  const supabase = await createClient()

}

// export async function clockInOutFormAction(formData: FormData) {
//   const supabase = await createClient()
// 
//   const { data: authData, error: authError } = await supabase.auth.getUser()
//   if (authError) {
//     throw authError
//   }
// 
//   const status = formData.get("status") as string;
//   
//   const entry: ClockInOutEntry = {
//     userId: authData.user.id,
//     status: status,
//   }; // only include columns which will be explicitly added
// 
//   const { error: insertError } = await supabase
//     .from("clock-in-out-entry") // name of table in Supabase
//     .insert([entry]);
// 
//   //  TODO: implement a better error handling system
//   if (insertError) {
//     throw insertError;
//   } else {
//     return null
//   }
// }
