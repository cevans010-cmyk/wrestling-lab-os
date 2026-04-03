"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DiagnosisStep4Page() {
  const [chainBreakPoint, setChainBreakPoint] = useState("Setup phase");
  const [chainFrequency, setChainFrequency] = useState("Rarely");
  const [postAttackOutcome, setPostAttackOutcome] = useState("I stall");

  useEffect(() => {
    const savedChainBreakPoint =
      localStorage.getItem("chainBreakPoint") || "Setup phase";
    const savedChainFrequency =
      localStorage.getItem("chainFrequency") || "Rarely";
    const savedPostAttackOutcome =
      localStorage.getItem("postAttackOutcome") || "I stall";

    setChainBreakPoint(savedChainBreakPoint);
    setChainFrequency(savedChainFrequency);
    setPostAttackOutcome(savedPostAttackOutcome);
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
            Chain Wrestling (4/7)
          </p>

          <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
            Chain Wrestling
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            This section identifies where your attack sequences lose structure.
          </p>

          <div className="mt-10 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              Where does your sequence most often fail?
            </label>

            <select
              value={chainBreakPoint}
              onChange={(e) => {
                setChainBreakPoint(e.target.value);
                localStorage.setItem("chainBreakPoint", e.target.value);
              }}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="Stance / posture">Stance / posture</option>
              <option value="First contact">First contact</option>
              <option value="Hand fight">Hand fight</option>
              <option value="Setup phase">Setup phase</option>
              <option value="Entry timing">Entry timing</option>
              <option value="Finishing mechanics">Finishing mechanics</option>
              <option value="Transition to next attack">
                Transition to next attack
              </option>
              <option value="Maintaining control after scoring">
                Maintaining control after scoring
              </option>
            </select>
          </div>

          <div className="mt-6 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              How often do you successfully connect multiple attacks together?
            </label>

            <select
              value={chainFrequency}
              onChange={(e) => {
                setChainFrequency(e.target.value);
                localStorage.setItem("chainFrequency", e.target.value);
              }}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="Almost never">Almost never</option>
              <option value="Rarely">Rarely</option>
              <option value="Sometimes">Sometimes</option>
              <option value="Often">Often</option>
            </select>
          </div>

          <div className="mt-6 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              After your first attack, what usually happens?
            </label>

            <select
              value={postAttackOutcome}
              onChange={(e) => {
                setPostAttackOutcome(e.target.value);
                localStorage.setItem("postAttackOutcome", e.target.value);
              }}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="I lose position">I lose position</option>
              <option value="I stall">I stall</option>
              <option value="I scramble">I scramble</option>
              <option value="I reset">I reset</option>
              <option value="I continue attacking">I continue attacking</option>
            </select>
          </div>

          <div className="mt-10 flex w-full max-w-xl gap-4">
            <Link
              href="/diagnosis/step-3"
              className="block w-1/2 rounded-full border border-teal-400 px-6 py-4 text-center text-lg font-black uppercase text-teal-400"
            >
              Back
            </Link>

            <Link
              href="/diagnosis/step-5"
              onClick={() => {
                localStorage.setItem("chainBreakPoint", chainBreakPoint);
                localStorage.setItem("chainFrequency", chainFrequency);
                localStorage.setItem("postAttackOutcome", postAttackOutcome);
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