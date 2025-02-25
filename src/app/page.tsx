"use client";

import LoginForm from '../components/loginform/login-form' 
import "./globals.css"
import iuc_styles from "../components/ui/iuc-intern-portal.module.css"

export default function Home() {
  return (
    <main className={`${iuc_styles['page-body']}`}>
      <section className={iuc_styles["page-title"]}>
        <h1>IUC INTERN PORTAL</h1>
      </section>

      <LoginForm />
    </main>
  );
}
