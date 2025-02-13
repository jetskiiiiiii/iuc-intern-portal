// components/clockinoutform/entry-submit.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { submitEntryAction } from "@/actions/clockinout/actions";
import { ClockInOutEntry } from "@/lib/interface";

export default function SubmitEntry() {
  const [ entry, setEntry ] = useState<ClockInOutEntry>({name: ''});
  const [ error, setError ] = useState<string | null>(null);
  const [ success, setSuccess ] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const error = await submitEntryAction(formData);

    if (error) {
      setError(error);
    } else {
      setSuccess("Name added!");
      setEntry({name: ''});
    }
  };

  return (
    <div>
      <form 
        className="w-full outline-none items-center gap-2"
        action={async (formData) => {
          await handleSubmit(formData);}}>
        <div>
          <input
            type="text"
            id="name"
            name="name"
            value={entry.name}
            onChange={(e) => setEntry({name: e.target.value})}
            className="w-full px-4 py-2 border rounded focus-visible:ring-transparent"
            placeholder="Name"
            required/>
        </div>

        <div>
         <Button type="submit" className="w-full font-bold py-4 px-4 my-2 rounded">
           Submit
         </Button>
        </div>

      </form>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </div>
  )
}
