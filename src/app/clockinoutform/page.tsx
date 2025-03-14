"use client";

import ClockInOutForm from "./components/clock-in-out-form";
import SignOutButton from "../signout/components/signout-button";
import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"

export default function Page() {
  return (
    <main className={`${iuc_styles['page-body']}`}>
        <div className={`${iuc_styles["page-title"]}`}>
          <h1>Clock In/Out</h1>
          <SignOutButton />
        </div>

        <ClockInOutForm />  
    </main>
  );
}
