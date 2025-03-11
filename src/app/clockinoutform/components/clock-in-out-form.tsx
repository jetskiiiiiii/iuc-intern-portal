"use client";

import { useState, useEffect } from "react";
import { clockInAction, clockOutAction, getClockInStatusAction, getTimeElapsed } from "../actions/clock-in-out-form-actions";

export default function ClockInOutForm() {
  // State to manage whether user is clocked in.
  // TODO: State needs to be updated from supabase 'is_clocked_in' column

  const [ isClockedIn, setIsClockedIn ] = useState<boolean>(false)
  const [ rowID, setRowID ] = useState<string>("")
  
  useEffect(() => {
    async function getClockInStatus() {
      const status = await getClockInStatusAction()
      setIsClockedIn(status[1])
      setRowID(status[0])
    }

    getClockInStatus()
  }, [])

//  useEffect(() => {
//    let interval: NodeJS.Timeout;
//    if (isClockedIn) {
//      interval = setInterval(() => {
//        setHoursWorked((prevHoursWorked) => prevHoursWorked + 10)
//      }, 10)
//    }
//    return () => clearInterval(interval)
//  }, [isClockedIn])

  const handleClockIn = async () => {
    setIsClockedIn(true)

    const timeClockedIn = new Date();
    setRowID(await clockInAction(timeClockedIn))
  }

  const handleClockOut = async () => {
    setIsClockedIn(false)

    const timeClockedOut = new Date();
    await clockOutAction(rowID, timeClockedOut)
  }

  const timeElapsed = async () => {
    await getTimeElapsed()
  }

//  const [hours, minutes] = timeElapsed

  return (
    <div>
      <div id="submit-button" className="w-full h-full p-4">
        <button
          onClick={isClockedIn ? handleClockOut : handleClockIn}
          className="btn btn-primary w-full text-2xl font-bold">
          {isClockedIn ? "Clock Out" : "Clock In"}
        </button>
      </div>
    </div>
  )
}
 //         {isClockedIn ?
 //           `${hours.toString().padStart(2, "0")}:
 //           ${minutes.toString().padStart(2, "0")}`
 //         : "Clock In"}
