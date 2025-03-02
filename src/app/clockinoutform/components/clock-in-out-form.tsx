// components/clockinoutform/clock-in-out-form.tsx

"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import { submitEntryAction } from "../actions/clock-in-out-form-actions";
import clock_in_out_form_styles from "../ui/clock-in-out-form.module.css";

export default function ClockInOutForm() {
  const [ name, setName ] = useState<string>('');
  const [ statusClockIn, setStatusClockIn ] = useState<string | null>(null);
  const [ confirmation, setConfirmation ] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const error = await submitEntryAction(formData);

    if (error) {
      setConfirmation(error);
    } else {
      setConfirmation(statusClockIn ? 'Clocked in.' : 'Clocked out.');
      setStatusClockIn(null);
      setName('');
    }
  };

  // confirmation message timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setConfirmation(null);
    }, 2000);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    }; 
  })

  return (
    <div>

      <form 
        action={async (formData) => {
          await handleSubmit(formData);}}>

        <div id="name-field" className="w-full">
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

        <div id="status-buttons" className="flex h-[70vh]"> 
          <div id="clock-in-button" className="w-full p-4">
            <input
              type="radio"
              id="status_clock_in"
              name="status"
              value="clock-in"
              onChange={(e) => setStatusClockIn(e.target.value)}
              className="peer opacity-0 fixed w-0"
              required/>
            <label
              htmlFor="status_clock_in"
              className={`${clock_in_out_form_styles['status-radio-label']} btn w-full h-full text-5xl font-bold hover:btn-secondary peer-checked:btn-secondary`}> 
              Clock In
            </label>
          </div>

          <div id="clock-out-button" className="w-full p-4">
            <input
              type="radio"
              id="status_clock_out"
              name="status"
              value="clock-out"
              className="peer opacity-0 fixed w-0"/>
            <label
              htmlFor="status_clock_out"
              className={`${clock_in_out_form_styles['status-radio-label']} btn w-full h-full text-5xl font-bold hover:btn-secondary peer-checked:btn-secondary`}> 
              Clock Out
            </label>
          </div>
        </div>

        <div id="submit-button" className="w-full h-full p-4">
         <button type="submit" className="btn btn-primary w-full text-2xl font-bold">
           Submit
         </button>
        </div>

      </form>

      <div>
        {confirmation && <p className="h-[10vh]">{confirmation}</p>}
      </div>
    </div>
  )
}
