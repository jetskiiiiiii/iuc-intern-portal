// components/clockinoutform/clock-in-out-form.tsx

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { submitEntryAction } from "../actions/clock-in-out-form-actions";
import styles from "../ui/clock-in-out-form.module.css";
import iuc_theme_styles from "@/components/ui/iuc-intern-portal.module.css";

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

        <div id="statusButtons" className={styles['status-radio-container']}> 
          <div className="w-full">
            <input
              type="radio"
              id="status_clock_in"
              name="status"
              value="clock-in"
              onChange={(e) => setStatusClockIn(e.target.value)}
              className={styles['status-radio']}
              required/>
            <label
              htmlFor="status_clock_in"
              className={styles['status-radio-label']}>
              Clock In
            </label>
          </div>

          <div className="w-full">
            <input
              type="radio"
              id="status_clock_out"
              name="status"
              value="clock-out"
              className={styles['status-radio']}/>
            <label
              htmlFor="status_clock_out"
              className={styles['status-radio-label']}>
              Clock Out
            </label>
          </div>
        </div>

        <div id="submitButton">
         <Button type="submit" className="w-full font-bold py-4 px-4 my-2 rounded">
           Submit
         </Button>
        </div>

      </form>

      <div className="min-h-10">
        {confirmation && <p className="text-black-500">{confirmation}</p>}
      </div>
    </div>
  )
}
