"use client" 

import NavBar from "../navbar/components/navbar"
import ForgotPasswordForm from "./components/forgot-password-form";
import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"

export default function ForgotPassword() {
  return (
    <main className={iuc_styles["page-body"]}>
      <NavBar pageTitle="Reset password"/>
      <ForgotPasswordForm />
    </main>
  );
}
