"use server"

import { createClient } from "@/utils/supabase/server"
import { SupabaseClient } from "@supabase/supabase-js"
import { uniqueNamesGenerator, Config, colors, animals, NumberDictionary } from "unique-names-generator"

/**
 * Generates a unique username and checks for duplicates in the database.
 *
 * @param {Config} config - Configuration for the username generator.
 * @param {SupabaseClient} supabase - Supabase client instance.
 * @returns {Promise<{ duplicateCheckData: any[], randomUsername: string }>} - Object containing duplicate check data and the generated username.
 * @throws {Error} - If there's an error during the database query.
 */
async function runUsernameGenerator(config: Config, supabase: SupabaseClient)  {
  const randomUsername = uniqueNamesGenerator(config)

  // Checks if the generated username already exists in the 'usernames' table
  const { data: duplicateCheckData, error: duplicateCheckError } = await supabase
    .from("usernames")
    .select("*")
    .eq("username", randomUsername)
  if (duplicateCheckError) {
    throw duplicateCheckError
  }
  
  return {
    duplicateCheckData: duplicateCheckData,
    randomUsername: randomUsername,
  }
}

/**
 * Generates a unique username and ensures it's not a duplicate in the database.
 *
 * @returns {Promise<string>} - A unique generated username.
 * @throws {Error} - If there's an error during authentication or username generation.
 */
export default async function generateUsername() {
  const supabase = await createClient()

  const { data: userData, error: authError } = await supabase.auth.getUser()
  if (authError || !userData?.user) {
    throw authError
  }

  // Configure the username generator
  const numberDictionary = NumberDictionary.generate({ min: 100, max: 999 });
  const config: Config = {
    dictionaries: [colors, animals, numberDictionary],
    separator: "",
    style: "capital",
    length: 3,
  }

  let usernameCheck
  let duplicateCheckData
  let randomUsername
  
  // Generate usernames until a unique one is found
  do {
    usernameCheck = await runUsernameGenerator(config, supabase) 
    duplicateCheckData = usernameCheck.duplicateCheckData
    randomUsername = usernameCheck.randomUsername
  } while (duplicateCheckData && duplicateCheckData.length > 0)

  return randomUsername
}
