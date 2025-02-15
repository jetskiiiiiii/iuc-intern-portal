"use client";

import ClockInOutForm from "@/components/clockinoutform/clock-in-out-form";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col gap-4 items-center justify-center">
      <section className="items-center">
        <h1 className="w-full text-gray-500">Clock In/Out</h1>
        <ClockInOutForm />  
      </section>
    </main>
  );
}
