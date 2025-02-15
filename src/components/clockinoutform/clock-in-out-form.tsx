// components/clockinoutform/clock-in-out-form.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { submitEntryAction } from "@/actions/clockinout/actions";

export default function ClockInOutForm() {
  const [ name, setName ] = useState<string>('');
  const [ statusClockIn, setStatusClockIn ] = useState<string | null>(null);
  const [ statusClockOut, setStatusClockOut ] = useState<string | null>(null);

  const [ error, setError ] = useState<string | null>(null);
  const [ success, setSuccess ] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const error = await submitEntryAction(formData);

    if (error) {
      setError(error);
    } else {
      setSuccess(statusClockIn ? 'Clocked in.' : 'Clocked out.');
      setStatusClockIn(null);
      setStatusClockOut(null);
      setName('');
    }
  };

  return (
    <div>
      <form 
        className="w-full outline-none items-center gap-2"
        action={async (formData) => {
          await handleSubmit(formData);}}>
        <div id="nameField">
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded focus-visible:ring-transparent"
            placeholder="Name"
            required/>
        </div>

        <div id="statusButtons" className="w-full">
          <div className="w-full">
            <input
              type="radio"
              id="status_clock_in"
              name="status"
              value="clock-in"
              onChange={(e) => setStatusClockIn(e.target.value)}
              className="mr-2 mt-2"/>
            <label htmlFor="status_clock_in">Clock In</label>
          </div>

          <div className="w-full">
            <input
              type="radio"
              id="status_clock_out"
              name="status"
              value="clock-out"
              onChange={(e) => setStatusClockOut(e.target.value)}
              className="mr-2"/>
            <label htmlFor="status_clock_out">Clock Out</label>
          </div>
        </div>

        <div id="submitButton">
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
