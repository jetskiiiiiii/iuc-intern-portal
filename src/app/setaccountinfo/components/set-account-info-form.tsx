import setAccountInfoAction from "../actions/set-account-info-action"

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { uniqueNamesGenerator, Config, colors, animals, NumberDictionary} from "unique-names-generator"

export default async function SetAccountInfoForm() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if ( error || !data?.user ) {
    redirect("/")
  }

  const numberDictionary = NumberDictionary.generate({ min: 100, max: 999 });
  const config: Config = {
    dictionaries: [colors, animals, numberDictionary],
    separator: "",
    style: "capital",
    length: 3,
  }
  const randomeUsername = uniqueNamesGenerator(config) 

  return (
    <section>
      <form>
        <label htmlFor="password">Set A Password</label>
        <input id="password" name="password" type="password" required />

        <label htmlFor="firstName">First Name</label>
        <input id="firstName" name="firstName" type="text" required />
        
        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" name="lastName" type="text" required />

        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" defaultValue={randomeUsername} required />
        
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="text" value={data.user.email} readOnly />

        <label htmlFor="phoneNumber">Phone Number</label>
        <input id="phoneNumber" name="phoneNumber" type="text" required />

        <button formAction={setAccountInfoAction}>Save Info</button>
      </form>
    </section>
  )
}
