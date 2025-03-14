"use client";

import LoginForm from "./login/components/login-form";
import "@/app/globals.css"
import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"
import { protectLogin } from "./login/actions/protect-login";

export default function Home() {
  protectLogin()

  return (
    <main className={iuc_styles['page-body']}>
      <section className={iuc_styles["page-title"]}>
        <h1>IUC INTERN PORTAL</h1>
      </section>

      <LoginForm />
    </main>
  );
}
