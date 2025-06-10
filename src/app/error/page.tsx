"use client" 
import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"
import NavBar from "../navbar/components/navbar";
import Link from "next/link";

export default function Error() {
  return (
    <main className={iuc_styles["page-body"]}>
      <NavBar pageTitle="Oops! Something went wrong." />
      <div className={`${iuc_styles["iuc-form-parent"]} p-4`}>
        <Link href={"/dashboard"}>
          <button 
            type="submit"
            className={`btn btn-primary w-full ${iuc_styles["iuc-button-primary"]}`} >
            Go home 
          </button>
        </Link>
      </div>
    </main>
  )
}

