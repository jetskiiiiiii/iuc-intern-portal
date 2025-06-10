"use client";

import { useState, useEffect } from "react";
import { clockInAction, clockOutAction, getClockInStatusAction } from "../actions/clock-in-out-form-actions";
import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"

export default function ClockInOutForm() {
  // State to manage whether user is clocked in.
  const [ rowID, setRowID ] = useState<string>("")
  const [ hoursWorked, setHoursWorked ] = useState<number>(0)
  const [ isClockedIn, setIsClockedIn ] = useState<boolean>(false)
  const [ isHovered, setIsHovered ] = useState<boolean>(false)
  const [ isHidden, setIsHidden ] = useState<boolean>(true)
  
  // To determine whether user is already clocked in
  useEffect(() => {
    async function getClockInStatus() {
      const status = await getClockInStatusAction()
      setRowID(status[0] as string)
      setHoursWorked(status[1] as number)
      setIsClockedIn(status[2] as boolean)
    }
    getClockInStatus()
  }, [])

  // To set the stopwatch
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isClockedIn) {
      interval = setInterval(() => {
        setHoursWorked((prevHoursWorked) => prevHoursWorked + 1000)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isClockedIn])

  // Manually set the time to show clock in component (aprox. time to fetch status)
  // TODO: Implement a (possibly) better way to decide when to render
  useEffect(() => {
    const loadClockInStatus = setTimeout(() => {
      setIsHidden(false)
    }, 400)
    return () => clearTimeout(loadClockInStatus)
  })

  const handleClockIn = async () => {
    setIsClockedIn(true)
    const timeClockedIn = new Date();
    setRowID(await clockInAction(timeClockedIn))
  }

  const handleClockOut = async () => {
    setIsClockedIn(false)
    setHoursWorked(0)
    const timeClockedOut = new Date();
    await clockOutAction(rowID, timeClockedOut)
  }

  const seconds = Math.floor((hoursWorked / 1000) % 60)
  const minutes = Math.floor((hoursWorked / 60000) % 60)
  const hours = Math.floor(hoursWorked / 3600000)
  const stopwatch = `${hours > 0 ? `${hours}:` : ""}${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

  const renderStopwatch = () => {
    if (isClockedIn && isHovered) {
      return <p>Clock Out</p>
    } else if (isClockedIn) {
      return <p>{stopwatch}</p>
    } else {
      return <p>Clock In</p>
    }
  }

  const renderButtonColors = () => {
    let color: string
    if (isHovered && isClockedIn) {
      color = "btn-error"
    } else if (isClockedIn) {
      color = "btn-neutral-content"
    } else {
      color = "btn-primary"
    }
    return color
  }

  return (
      <div className={`${iuc_styles["iuc-form-parent"]} p-4`}>
        <button
          onClick={isClockedIn ? handleClockOut : handleClockIn}
          className={`btn w-full h-full text-6xl font-bold border-0 transition-colors duration-200
          ${renderButtonColors()}
          ${// Let element fecth clock in status
            isHidden ? "hidden": ""}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          {renderStopwatch()}
        </button>
      </div>
  )
}
