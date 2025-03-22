"use client";

import LoginForm from "./login/components/login-form";
import "@/app/globals.css"
import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"
import protectPage from "@/components/helpers/protect-page";
import NavBar from "./navbar/components/navbar";

export default function Home() {
  protectPage()

  return (
    <main className={iuc_styles["page-body"]}>
      <NavBar pageTitle="IUC Intern Portal" showSignOut={false}/>
      <LoginForm />
      <div id="not-an-intern-info" className="w-[40vw] my-2 flex flex-row justify-center items-center bg-info-content rounded-md">
        <h1 className="font-bold text-[1vw] py-[0.5vw] px-[0.1vw]">Not an intern?</h1>
        <p className="text-[1vw] py-[0.5vw] px-[0.1vw]">Email</p>
        <p className="text-[1vw] italic py-[0.5vw] px-[0.1vw]">irvineurgentcareinterns@gmail.com</p>
      </div>
    </main>
  );
}
