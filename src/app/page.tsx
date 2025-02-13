"use client";

import SubmitEntry from '@/components/clockinoutform/entry-submit';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col gap-4 items-center justify-center">
      <section className="items-center">
        <h1 className="w-full text-gray-500">Clock In/Out</h1>
        <SubmitEntry />  
      </section>
    </main>
  );
}
