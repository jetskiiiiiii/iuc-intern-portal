"use client" 

import NavBar from "../navbar/components/navbar"
import SetAccountInfoForm from "./components/set-account-info-form"
import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"

export default function SetAccountInfo() {
  return (
    <main className={iuc_styles["page-body"]}>
      <NavBar pageTitle="Set Account Info" />
      <SetAccountInfoForm />
    </main>
  );
}
