"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DiagnosisStep4Page() {
  const router = useRouter();

  const [chainBreakPoint, setChainBreakPoint] = useState(
    "Transition to next attack"
  );
  const [chainFrequency, setChainFrequency] = useState("Often");
  const [postAttackOutcome, setPostAttackOutcome] = useState(
    "I lose position after attacking"
  );
  const [stanceConfidence, setStanceConfidence] = useState("Medium");
  const [handFightConfidence, setHandFightConfidence] = useState("Medium");
  const [positionConfidence, setPositionConfidence] = useState("Medium");
  const [setupConfidence, setSetupConfidence] = useState("Medium");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedChainBreakPoint =
      localStorage.getItem("chainBreakPoint") || "Transition to next attack";
    const savedChainFrequency =
      localStorage.getItem("chainFrequency") || "Often";
    const savedPostAttackOutcome =
      localStorage.getItem("postAttackOutcome") ||
      "I lose position after attacking";
    const savedStanceConfidence =
      localStorage.getItem("stanceConfidence") || "Medium";
    const savedHandFightConfidence =
      localStorage.getItem("handFightConfidence") || "Medium";
    const savedPositionConfidence =
      localStorage.getItem("positionConfidence") || "Medium";
    const savedSetupConfidence =
      localStorage.getItem("setupConfidence") || "Medium";

    setChainBreakPoint(savedChainBreakPoint);
    setChainFrequency(savedChainFrequency);
    setPostAttackOutcome(savedPostAttackOutcome);
    setStanceConfidence(savedStanceConfidence);
    setHandFightConfidence(savedHandFightConfidence);
    setPositionConfidence(savedPositionConfidence);
    setSetupConfidence(savedSetupConfidence);
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
          chain_break_point: chainBreakPoint,
          chain_frequency: chainFrequency,
          post_attack_outcome: postAttackOutcome,
          stance_confidence: stanceConfidence,
          hand_fight_confidence: handFightConfidence,
          position_confidence: positionConfidence,
          setup_confidence: setupConfidence,
        })
        .eq("id", diagnosisId)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error updating Step 4:", error);
        alert(`Could not save Step 4: ${error.message}`);
        return;
      }

      localStorage.setItem("chainBreakPoint", chainBreakPoint);
      localStorage.setItem("chainFrequency", chainFrequency);
      localStorage.setItem("postAttackOutcome", postAttackOutcome);
      localStorage.setItem("stanceConfidence", stanceConfidence);
      localStorage.setItem("handFightConfidence", handFightConfidence);
      localStorage.setItem("positionConfidence", positionConfidence);
      localStorage.setItem("setupConfidence", setupConfidence);

      router.push("/diagnosis/step-5");
    } catch (err) {
      console.error("Step 4 crash:", err);
      alert("Something went wrong saving Step 4.");
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
            Chain Wrestling Audit (4/7)
          </p>

          <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
            Chain Wrestling Audit
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            This section identifies where your sequences break down and how
            stable your core technical positions are.
          </p>

          <div className="mt-10 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              Where does your chain wrestling usually break down?
            </label>

            <select
              value={chainBreakPoint}
              onChange={(e) => setChainBreakPoint(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="Before first contact">Before first contact</option>
              <option value="At first contact">At first contact</option>
              <option value="During setup">During setup</option>
              <option value="During attack entry">During attack entry</option>
              <option value="Transition to next attack">
                Transition to next attack
              </option>
              <option value="During finishing phase">
                During finishing phase
              </option>
              <option value="After the score">After the score</option>
            </select>
          </div>

          <div className="mt-6 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              How often does this breakdown happen?
            </label>

            <select
              value={chainFrequency}
              onChange={(e) => setChainFrequency(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="Rarely">Rarely</option>
              <option value="Sometimes">Sometimes</option>
              <option value="Often">Often</option>
              <option value="Almost every match">Almost every match</option>
            </select>
          </div>

          <div className="mt-6 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              What usually happens after you attack?
            </label>

            <select
              value={postAttackOutcome}
              onChange={(e) => setPostAttackOutcome(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="I lose position after attacking">
                I lose position after attacking
              </option>
              <option value="I end up in a scramble">
                I end up in a scramble
              </option>
              <option value="I pause instead of continuing">
                I pause instead of continuing
              </option>
              <option value="I can usually continue attacking">
                I can usually continue attacking
              </option>
              <option value="I score and stay in control">
                I score and stay in control
              </option>
            </select>
          </div>

          <div className="mt-6 grid w-full max-w-xl gap-6 text-left md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
                Stance confidence
              </label>
              <select
                value={stanceConfidence}
                onChange={(e) => setStanceConfidence(e.target.value)}
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
                Hand fight confidence
              </label>
              <select
                value={handFightConfidence}
                onChange={(e) => setHandFightConfidence(e.target.value)}
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
                Position confidence
              </label>
              <select
                value={positionConfidence}
                onChange={(e) => setPositionConfidence(e.target.value)}
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
                Setup confidence
              </label>
              <select
                value={setupConfidence}
                onChange={(e) => setSetupConfidence(e.target.value)}
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

          <div className="mt-10 flex w-full max-w-xl gap-4">
            <Link
              href="/diagnosis/step-3"
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
