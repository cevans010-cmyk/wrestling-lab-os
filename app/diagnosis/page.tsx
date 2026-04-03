"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DiagnosisPage() {
  const [style, setStyle] = useState("Freestyle wrestling");

  useEffect(() => {
    const savedStyle = localStorage.getItem("style");
    if (savedStyle) {
      setStyle(savedStyle);
    } else {
      localStorage.setItem("style", "Freestyle wrestling");
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
            Start Your Diagnosis
          </h1>

          <div className="mt-10 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              What is your experience level?
            </label>

            <select className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <div className="mt-6 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              What style do you compete in?
            </label>

            <select
              value={style}
              onChange={(e) => {
                setStyle(e.target.value);
                localStorage.setItem("style", e.target.value);
              }}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="Freestyle wrestling">Freestyle wrestling</option>
              <option value="MMA / BJJ Crossover">MMA / BJJ Crossover</option>
            </select>
          </div>

          <Link
            href="/diagnosis/step-2"
            onClick={() => {
              localStorage.setItem("style", style);
            }}
            className="mt-10 block w-full max-w-xl rounded-full bg-teal-400 px-6 py-4 text-center text-lg font-black uppercase text-black shadow-[0_0_25px_rgba(45,212,191,0.5)]"
          >
            Continue
          </Link>
        </div>
      </div>
    </main>
  );
}