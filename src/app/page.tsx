"use client";

import LoginForm from "./login/components/login-form";
import "@/app/globals.css"
import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"
import protectPage from "@/components/helpers/protect-page";

export default function Home() {
  protectPage()

  return (
    <main className={iuc_styles["page-body"]}>
      <section className={iuc_styles["page-title"]}>
        <h1>IUC Intern Portal</h1>
      </section>

      <LoginForm />
      <div id="not-an-intern" className="w-[40vw] my-2 flex flex-row justify-center items-center bg-info-content rounded-md">
        <h1 className="font-bold text-[1vw] py-[0.5vw] px-[0.1vw]">Not an intern?</h1>
        <p className="text-[1vw] py-[0.5vw] px-[0.1vw]">Email</p>
        <p className="text-[1vw] italic py-[0.5vw] px-[0.1vw]">irvineurgentcareinterns@gmail.com</p>
      </div>
    </main>
  );
}
