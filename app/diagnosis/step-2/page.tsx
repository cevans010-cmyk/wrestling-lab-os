"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DiagnosisStep2Page() {
      const [style, setStyle] = useState("");

  useEffect(() => {
    const savedStyle = localStorage.getItem("style");
    if (savedStyle) {
      setStyle(savedStyle);
    }
  }, []);
  return (
    <main className="min-h-screen text-white">
      <div className="relative min-h-screen overflow-hidden bg-black">
        <div className="absolute inset-0">
          <img
            src="/bg.jpg"
            alt="background"
            className="h-full w-full object-cover opacity-55"
          />
        </div>

        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:42px_42px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,220,0.08),_transparent_40%)]" />

        <div className="absolute inset-x-0 top-[18%] h-px bg-gradient-to-r from-transparent via-teal-400/35 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-teal-400">
            Wrestling Lab Diagnostic System
          </p>

         <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
             Identify your biggest weakness
         </h1>

         <p className="mt-4 text-sm text-zinc-400">
             Selected style: <span className="font-bold text-teal-400">{style}</span>
         </p>

          <div className="mt-10 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              What is your biggest current weakness?
            </label>

            <select
             onChange={(e) => {
                 localStorage.setItem("weakness", e.target.value);
             }}
             className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option>Under-developed understanding of fundamentals</option>
              <option>Poor decision making under pressure</option>
              <option>Chain wrestling breakdown</option>
              <option>Low percentage scrambling outcomes</option>
              <option>Lack of tactical awareness</option>
              <option>Physical condition</option>
            </select>
          </div>

          <div className="mt-10 flex w-full max-w-xl gap-4">
             <Link
                 href="/diagnosis"
                 className="block w-1/2 rounded-full border border-teal-400 px-6 py-4 text-center text-lg font-black uppercase text-teal-400"
             >
                 Back
             </Link>

             <Link
                 href="/diagnosis/results"
                 onClick={() => {
                     const savedWeakness =
                         localStorage.getItem("weakness") ||
                         "Under-developed understanding of fundamentals";
                     localStorage.setItem("weakness", savedWeakness);
                 }}
                 className="block w-1/2 rounded-full bg-teal-400 px-6 py-4 text-center text-lg font-black uppercase text-black shadow-[0_0_25px_rgba(45,212,191,0.5)]"
             >
                 Continue
            </Link>
         </div>
        </div>
      </div>
    </main>
  );
}