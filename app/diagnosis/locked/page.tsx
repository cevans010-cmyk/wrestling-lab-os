"use client";

import { useRouter } from "next/navigation";

export default function DiagnosisLockedPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-teal-400">
          Wrestling Lab Diagnostic System
        </p>

        <h1 className="mt-6 text-4xl font-black uppercase text-white">
          Your free diagnosis has already been used
        </h1>

        <p className="mt-4 text-zinc-300">
          You have already completed your free performance breakdown. Book your
          consult to go deeper into your results and get a clear plan moving
          forward.
        </p>

        <div className="mt-8 space-y-4">
          <button
            onClick={() =>
              window.open("https://calendly.com/cevans010/30min", "_blank")
            }
            className="w-full rounded-full bg-teal-400 px-6 py-4 text-lg font-black uppercase text-black shadow-[0_0_25px_rgba(45,212,191,0.5)]"
          >
            Book Your Free Consult
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full rounded-full border border-teal-400 px-6 py-4 text-lg font-black uppercase text-teal-400"
          >
            Back To Home
          </button>
        </div>
      </div>
    </main>
  );
}