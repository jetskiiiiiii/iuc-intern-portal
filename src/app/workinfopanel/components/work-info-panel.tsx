"use client";

import { useState, useEffect } from "react";
import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"
import { createClient } from "@/utils/supabase/client";
import { Profiles } from "@/lib/interface";

export default function WorkInfoPanel(userData: Profiles) {
  const supabase = createClient()
  
  const [ totalHoursWorked, setTotalHoursWorked ] = useState<number>(0)
  useEffect(() => {
    const fetchTotalHoursWorked = async () => {
      const { data: userHoursData, error: fetchError } = await supabase
        .from("total-hours-worked")
        .select("total_hours_worked")
        .eq("user_ID", userData.userData?.user_ID)
        .single()
      if (fetchError?.code === "PGRST116") {
        setTotalHoursWorked(0)
      } else if (fetchError) {
        throw fetchError
      } else {
        setTotalHoursWorked(userHoursData?.total_hours_worked ?? 0)
      }
    }

    fetchTotalHoursWorked()
  }, [supabase, userData])

  return (
    <div
      id="work-info-panel"
      className={`btn ${iuc_styles["work-info-panel"]}`}>
      <p>Total hours worked: {totalHoursWorked.toFixed(2)} hours</p>
    </div>
  )
}
