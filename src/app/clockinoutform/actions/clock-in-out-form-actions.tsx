// actions/clockinout/actions.tsx

"use server";

import { createClient } from "@/utils/supabase/client";
import { ClockInOutEntry } from "@/lib/interface";

export async function submitEntryAction(formData: FormData) {
  const name = formData.get("name") as string;
  const status = formData.get("status") as string;
  
  const entry: ClockInOutEntry = {
    name: name,
    status: status,
  }; // only include columns which will be explicitly added

  const supabase = createClient();

  const { error: supabaseError } = await supabase
    .from('entry-with-status') // name of table in Supabase
    .insert([entry]);

  //  TODO: implement a better error handling system
  if (supabaseError) {
    throw supabaseError;
  } else {
    return null;
  }
}
