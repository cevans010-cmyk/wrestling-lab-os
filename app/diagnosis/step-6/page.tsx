"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DiagnosisStep6Page() {
  const [finishConfidence, setFinishConfidence] = useState("Medium");
  const [reAttackConfidence, setReAttackConfidence] = useState("Medium");
  const [scrambleConfidence, setScrambleConfidence] = useState("Medium");
  const [tacticalConfidence, setTacticalConfidence] = useState("Medium");
  const [relianceType, setRelianceType] = useState("Structured setups");
  const [fatigueBreakdown, setFatigueBreakdown] = useState("Decisions");

  useEffect(() => {
    const savedFinishConfidence =
      localStorage.getItem("finishConfidence") || "Medium";
    const savedReAttackConfidence =
      localStorage.getItem("reAttackConfidence") || "Medium";
    const savedScrambleConfidence =
      localStorage.getItem("scrambleConfidence") || "Medium";
    const savedTacticalConfidence =
      localStorage.getItem("tacticalConfidence") || "Medium";
    const savedRelianceType =
      localStorage.getItem("relianceType") || "Structured setups";
    const savedFatigueBreakdown =
      localStorage.getItem("fatigueBreakdown") || "Decisions";

    setFinishConfidence(savedFinishConfidence);
    setReAttackConfidence(savedReAttackConfidence);
    setScrambleConfidence(savedScrambleConfidence);
    setTacticalConfidence(savedTacticalConfidence);
    setRelianceType(savedRelianceType);
    setFatigueBreakdown(savedFatigueBreakdown);
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
            Technical Audit (6/7)
          </p>

          <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
            Technical Audit
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            Finish the audit so we can identify the strongest performance
            patterns in your wrestling.
          </p>

          <div className="mt-10 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              How confident are you in your finishes?
            </label>

            <select
              value={finishConfidence}
              onChange={(e) => {
                setFinishConfidence(e.target.value);
                localStorage.setItem("finishConfidence", e.target.value);
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
              How confident are you in your re-attacks?
            </label>

            <select
              value={reAttackConfidence}
              onChange={(e) => {
                setReAttackConfidence(e.target.value);
                localStorage.setItem("reAttackConfidence", e.target.value);
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
              How confident are you in scramble situations?
            </label>

            <select
              value={scrambleConfidence}
              onChange={(e) => {
                setScrambleConfidence(e.target.value);
                localStorage.setItem("scrambleConfidence", e.target.value);
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
              How confident are you in your tactical awareness?
            </label>

            <select
              value={tacticalConfidence}
              onChange={(e) => {
                setTacticalConfidence(e.target.value);
                localStorage.setItem("tacticalConfidence", e.target.value);
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
              What do you rely on most in matches?
            </label>

            <select
              value={relianceType}
              onChange={(e) => {
                setRelianceType(e.target.value);
                localStorage.setItem("relianceType", e.target.value);
              }}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="Speed">Speed</option>
              <option value="Strength">Strength</option>
              <option value="Scrambling">Scrambling</option>
              <option value="One main technique">One main technique</option>
              <option value="Defensive reactions">Defensive reactions</option>
              <option value="Structured setups">Structured setups</option>
              <option value="Experience">Experience</option>
            </select>
          </div>

          <div className="mt-6 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              What breaks down first when you get tired?
            </label>

            <select
              value={fatigueBreakdown}
              onChange={(e) => {
                setFatigueBreakdown(e.target.value);
                localStorage.setItem("fatigueBreakdown", e.target.value);
              }}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="Stance">Stance</option>
              <option value="Decisions">Decisions</option>
              <option value="Shot quality">Shot quality</option>
              <option value="Defense">Defense</option>
              <option value="Control">Control</option>
              <option value="Effort/output">Effort/output</option>
            </select>
          </div>

          <div className="mt-10 flex w-full max-w-xl gap-4">
            <Link
              href="/diagnosis/step-5"
              className="block w-1/2 rounded-full border border-teal-400 px-6 py-4 text-center text-lg font-black uppercase text-teal-400"
            >
              Back
            </Link>

            <Link
              href="/diagnosis/step-7"
              onClick={() => {
                localStorage.setItem("finishConfidence", finishConfidence);
                localStorage.setItem("reAttackConfidence", reAttackConfidence);
                localStorage.setItem("scrambleConfidence", scrambleConfidence);
                localStorage.setItem("tacticalConfidence", tacticalConfidence);
                localStorage.setItem("relianceType", relianceType);
                localStorage.setItem("fatigueBreakdown", fatigueBreakdown);
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