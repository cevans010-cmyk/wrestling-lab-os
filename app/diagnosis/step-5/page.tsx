"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DiagnosisStep5Page() {
  const [stanceConfidence, setStanceConfidence] = useState("Medium");
  const [handFightConfidence, setHandFightConfidence] = useState("Medium");
  const [positionConfidence, setPositionConfidence] = useState("Medium");
  const [setupConfidence, setSetupConfidence] = useState("Medium");

  useEffect(() => {
    const savedStanceConfidence =
      localStorage.getItem("stanceConfidence") || "Medium";
    const savedHandFightConfidence =
      localStorage.getItem("handFightConfidence") || "Medium";
    const savedPositionConfidence =
      localStorage.getItem("positionConfidence") || "Medium";
    const savedSetupConfidence =
      localStorage.getItem("setupConfidence") || "Medium";

    setStanceConfidence(savedStanceConfidence);
    setHandFightConfidence(savedHandFightConfidence);
    setPositionConfidence(savedPositionConfidence);
    setSetupConfidence(savedSetupConfidence);
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

        <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-teal-400">
            Technical Audit (5/7)
          </p>

          <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
            Technical Audit
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            Rate your confidence in these core wrestling areas.
          </p>

          <div className="mt-10 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              How confident are you in your stance and posture?
            </label>

            <select
              value={stanceConfidence}
              onChange={(e) => {
                setStanceConfidence(e.target.value);
                localStorage.setItem("stanceConfidence", e.target.value);
              }}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="Very low">Very low</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Very high">Very high</option>
            </select>
          </div>

          <div className="mt-6 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              How confident are you in your hand fighting?
            </label>

            <select
              value={handFightConfidence}
              onChange={(e) => {
                setHandFightConfidence(e.target.value);
                localStorage.setItem("handFightConfidence", e.target.value);
              }}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="Very low">Very low</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Very high">Very high</option>
            </select>
          </div>

          <div className="mt-6 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              How confident are you in controlling position?
            </label>

            <select
              value={positionConfidence}
              onChange={(e) => {
                setPositionConfidence(e.target.value);
                localStorage.setItem("positionConfidence", e.target.value);
              }}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="Very low">Very low</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Very high">Very high</option>
            </select>
          </div>

          <div className="mt-6 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              How confident are you in your setups?
            </label>

            <select
              value={setupConfidence}
              onChange={(e) => {
                setSetupConfidence(e.target.value);
                localStorage.setItem("setupConfidence", e.target.value);
              }}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="Very low">Very low</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Very high">Very high</option>
            </select>
          </div>

          <div className="mt-10 flex w-full max-w-xl gap-4">
            <Link
              href="/diagnosis/step-4"
              className="block w-1/2 rounded-full border border-teal-400 px-6 py-4 text-center text-lg font-black uppercase text-teal-400"
            >
              Back
            </Link>

            <Link
              href="/diagnosis/step-6"
              onClick={() => {
                localStorage.setItem("stanceConfidence", stanceConfidence);
                localStorage.setItem("handFightConfidence", handFightConfidence);
                localStorage.setItem("positionConfidence", positionConfidence);
                localStorage.setItem("setupConfidence", setupConfidence);
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