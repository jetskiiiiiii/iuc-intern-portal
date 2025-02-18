"use client";

import "./globals.css"
import app_styles from "../components/ui/iuc-intern-portal.module.css"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col gap-4 items-center justify-center">
      <section className="items-center">
        <h1 className={app_styles["iuc-intern-portal-header"]}>IUC INTERN PORTAL</h1>
      </section>
    </main>
  );
}
