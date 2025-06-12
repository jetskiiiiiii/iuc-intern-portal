"use client"

import SignOutButton from "@/app/signout/components/signout-button"
import SetAccountInfoButton from "@/app/setaccountinfo/components/setAccountInfoButton"
import ClockInOutButton from "@/app/clockinoutform/components/clockInOutButton"
import DashboardButton from "@/app/dashboard/components/dashboardButton"
import { NavBarTypes } from "@/lib/interface"
import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"

export default function NavBar(props: NavBarTypes) {
  return (
    <div className={iuc_styles["page-navbar"]}>
      <h1 className={iuc_styles["page-title"]}>{props.pageTitle}</h1>
      <div className={iuc_styles["page-nav-links"]}>
        {props.showDashboard ? <DashboardButton /> : ""}
        {props.showClockIn ? <ClockInOutButton /> : ""}
        {props.showAccount ? <SetAccountInfoButton /> : ""}
        {props.showSignOut ? <SignOutButton userData={props.userData} /> : ""}
      </div>
    </div>
  )
}
