"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DiagnosisStep5Page() {
  const router = useRouter();

  const [finishConfidence, setFinishConfidence] = useState("Medium");
  const [reAttackConfidence, setReAttackConfidence] = useState("Medium");
  const [scrambleConfidence, setScrambleConfidence] = useState("Medium");
  const [tacticalConfidence, setTacticalConfidence] = useState("Medium");
  const [relianceType, setRelianceType] = useState("Structured setups");
  const [fatigueBreakdown, setFatigueBreakdown] = useState("Decisions");
  const [isSaving, setIsSaving] = useState(false);

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

  const handleContinue = async () => {
    try {
      setIsSaving(true);

      const diagnosisId = localStorage.getItem("currentDiagnosisId");

      if (!diagnosisId) {
        alert("No active diagnosis found. Please restart the diagnosis.");
        router.push("/diagnosis");
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth");
        return;
      }

      const { error } = await supabase
        .from("diagnoses")
        .update({
          finish_confidence: finishConfidence,
          re_attack_confidence: reAttackConfidence,
          scramble_confidence: scrambleConfidence,
          tactical_confidence: tacticalConfidence,
          reliance_type: relianceType,
          fatigue_breakdown: fatigueBreakdown,
        })
        .eq("id", diagnosisId)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error updating Step 5:", error);
        alert(`Could not save Step 5: ${error.message}`);
        return;
      }

      localStorage.setItem("finishConfidence", finishConfidence);
      localStorage.setItem("reAttackConfidence", reAttackConfidence);
      localStorage.setItem("scrambleConfidence", scrambleConfidence);
      localStorage.setItem("tacticalConfidence", tacticalConfidence);
      localStorage.setItem("relianceType", relianceType);
      localStorage.setItem("fatigueBreakdown", fatigueBreakdown);

      router.push("/diagnosis/step-6");
    } catch (err) {
      console.error("Step 5 crash:", err);
      alert("Something went wrong saving Step 5.");
    } finally {
      setIsSaving(false);
    }
  };

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
            This section helps identify your confidence in key technical areas
            and what tends to break first under fatigue.
          </p>

          <div className="mt-10 grid w-full max-w-xl gap-6 text-left md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
                Finish confidence
              </label>
              <select
                value={finishConfidence}
                onChange={(e) => setFinishConfidence(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
              >
                <option value="Very low">Very low</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Very high">Very high</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
                Re-attack confidence
              </label>
              <select
                value={reAttackConfidence}
                onChange={(e) => setReAttackConfidence(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
              >
                <option value="Very low">Very low</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Very high">Very high</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
                Scramble confidence
              </label>
              <select
                value={scrambleConfidence}
                onChange={(e) => setScrambleConfidence(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
              >
                <option value="Very low">Very low</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Very high">Very high</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
                Tactical confidence
              </label>
              <select
                value={tacticalConfidence}
                onChange={(e) => setTacticalConfidence(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
              >
                <option value="Very low">Very low</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Very high">Very high</option>
              </select>
            </div>
          </div>

          <div className="mt-6 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              What do you rely on most in matches?
            </label>

            <select
              value={relianceType}
              onChange={(e) => setRelianceType(e.target.value)}
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
              onChange={(e) => setFatigueBreakdown(e.target.value)}
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
              href="/diagnosis/step-4"
              className="block w-1/2 rounded-full border border-teal-400 px-6 py-4 text-center text-lg font-black uppercase text-teal-400"
            >
              Back
            </Link>

            <button
              onClick={handleContinue}
              disabled={isSaving}
              className="block w-1/2 rounded-full bg-teal-400 px-6 py-4 text-center text-lg font-black uppercase text-black shadow-[0_0_25px_rgba(45,212,191,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}