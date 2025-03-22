"use client";

import NavBar from "../navbar/components/navbar";
import ClockInOutForm from "./components/clock-in-out-form";
import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"

export default function ClockInOut() {
  return (
    <main className={iuc_styles["page-body"]}>
      <NavBar pageTitle="Clock In/Out"/>
      <ClockInOutForm />  
    </main>
  );
}
