"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DiagnosisStep3Page() {
  const router = useRouter();

  const [pressureResponse, setPressureResponse] = useState("I hesitate");
  const [unclearPositionResponse, setUnclearPositionResponse] = useState(
    "I freeze or pause"
  );
  const [decisionControl, setDecisionControl] = useState(
    "I know what to do but cannot execute consistently"
  );
  const [scoringPattern, setScoringPattern] = useState(
    "My scoring is inconsistent"
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedPressureResponse =
      localStorage.getItem("pressureResponse") || "I hesitate";
    const savedUnclearPositionResponse =
      localStorage.getItem("unclearPositionResponse") ||
      "I freeze or pause";
    const savedDecisionControl =
      localStorage.getItem("decisionControl") ||
      "I know what to do but cannot execute consistently";
    const savedScoringPattern =
      localStorage.getItem("scoringPattern") || "My scoring is inconsistent";

    setPressureResponse(savedPressureResponse);
    setUnclearPositionResponse(savedUnclearPositionResponse);
    setDecisionControl(savedDecisionControl);
    setScoringPattern(savedScoringPattern);
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
          pressure_response: pressureResponse,
          unclear_position_response: unclearPositionResponse,
          decision_control: decisionControl,
          scoring_pattern: scoringPattern,
        })
        .eq("id", diagnosisId)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error updating Step 3:", error);
        alert(`Could not save Step 3: ${error.message}`);
        return;
      }

      localStorage.setItem("pressureResponse", pressureResponse);
      localStorage.setItem(
        "unclearPositionResponse",
        unclearPositionResponse
      );
      localStorage.setItem("decisionControl", decisionControl);
      localStorage.setItem("scoringPattern", scoringPattern);

      router.push("/diagnosis/step-4");
    } catch (err) {
      console.error("Step 3 crash:", err);
      alert("Something went wrong saving Step 3.");
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
            Pressure & Decisions (3/7)
          </p>

          <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
            Pressure & Decisions
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            This section helps identify how you think and react when matches
            get chaotic.
          </p>

          <div className="mt-10 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              What happens when you feel pressure in a match?
            </label>

            <select
              value={pressureResponse}
              onChange={(e) => setPressureResponse(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="I hesitate">I hesitate</option>
              <option value="I force attacks">I force attacks</option>
              <option value="I become defensive">I become defensive</option>
              <option value="I stay composed">I stay composed</option>
              <option value="I have the presence of mind to stay composed">
                I have the presence of mind to stay composed
              </option>
            </select>
          </div>

          <div className="mt-6 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              What do you do when the position becomes unclear?
            </label>

            <select
              value={unclearPositionResponse}
              onChange={(e) => setUnclearPositionResponse(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="I freeze or pause">I freeze or pause</option>
              <option value="I scramble immediately">
                I scramble immediately
              </option>
              <option value="I force something risky">
                I force something risky
              </option>
              <option value="I try to recover position">
                I try to recover position
              </option>
              <option value="I reset and make a better decision">
                I reset and make a better decision
              </option>
            </select>
          </div>

          <div className="mt-6 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              Which statement best describes your decision making?
            </label>

            <select
              value={decisionControl}
              onChange={(e) => setDecisionControl(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="I know what to do but cannot execute consistently">
                I know what to do but cannot execute consistently
              </option>
              <option value="I often choose the wrong option under pressure">
                I often choose the wrong option under pressure
              </option>
              <option value="My decisions break down late in the match">
                My decisions break down late in the match
              </option>
              <option value="My decisions are usually solid">
                My decisions are usually solid
              </option>
            </select>
          </div>

          <div className="mt-6 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              Which scoring pattern sounds most like you?
            </label>

            <select
              value={scoringPattern}
              onChange={(e) => setScoringPattern(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="My scoring is inconsistent">
                My scoring is inconsistent
              </option>
              <option value="I create chances but do not convert enough">
                I create chances but do not convert enough
              </option>
              <option value="I score early but cannot maintain control">
                I score early but cannot maintain control
              </option>
              <option value="I struggle to create scoring chances">
                I struggle to create scoring chances
              </option>
              <option value="My scoring is usually reliable">
                My scoring is usually reliable
              </option>
            </select>
          </div>

          <div className="mt-10 flex w-full max-w-xl gap-4">
            <Link
              href="/diagnosis/step-2"
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