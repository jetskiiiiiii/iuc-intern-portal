"use client"

import SignOutButton from "@/app/signout/components/signout-button"
import { NavBarTypes } from "@/lib/interface"
import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"

export default function NavBar(props: NavBarTypes) {
  return (
    <div className={iuc_styles["page-navbar"]}>
      <h1 className={iuc_styles["page-title"]}>{props.pageTitle}</h1>
      <div className={iuc_styles["page-nav-links"]}>
        <SignOutButton /> 
      </div>
    </div>
  )
}
