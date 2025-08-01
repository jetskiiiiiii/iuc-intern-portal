import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null

  // the next parameter is the url that the user intends to go to before they were directed for auth confirmation
  const next = searchParams.get('next') ?? '/'

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;

  redirectTo.searchParams.delete("token_hash");
//  redirectTo.searchParams.delete("type");

  if (token_hash && type) {
    const supabase = await createClient()
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
     redirectTo.searchParams.delete("next");
      return NextResponse.redirect(redirectTo);
    }
  }

  redirect('/error')
}
