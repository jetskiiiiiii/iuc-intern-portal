"use client";

import ClockInOutForm from "./components/clock-in-out-form";
import iuc_theme_styles from "@/components/ui/iuc-intern-portal.module.css"

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col gap-4 items-center justify-center">
      <section className="items-center">
        <h1 className={iuc_theme_styles["iuc-intern-portal-header"]}>Clock In/Out</h1>
        <ClockInOutForm />  
      </section>
    </main>
  );
}
