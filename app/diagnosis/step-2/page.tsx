"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DiagnosisStep2Page() {
  const router = useRouter();

  const [matchBreakdown, setMatchBreakdown] = useState("During attack entry");
  const [attackOutcome, setAttackOutcome] = useState(
    "I get in but cannot finish"
  );
  const [defenseResponse, setDefenseResponse] = useState(
    "I defend but lose position after"
  );
  const [postAttackReaction, setPostAttackReaction] = useState("I hesitate");
  const [isSaving, setIsSaving] = useState(false);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);

  useEffect(() => {
    const checkExistingDiagnosis = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/auth");
          return;
        }

        const diagnosisId = localStorage.getItem("currentDiagnosisId");

        const { data, error } = await supabase
          .from("diagnoses")
          .select("id, completed")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          console.error(error);
          return;
        }

        if (data?.completed) {
          router.push("/diagnosis/locked");
          return;
        }

        if (data?.id && diagnosisId && data.id !== diagnosisId) {
          router.push("/diagnosis/locked");
          return;
        }
      } finally {
        setIsCheckingAccess(false);
      }
    };

    checkExistingDiagnosis();
  }, [router]);

  useEffect(() => {
    const savedMatchBreakdown =
      localStorage.getItem("matchBreakdown") || "During attack entry";
    const savedAttackOutcome =
      localStorage.getItem("attackOutcome") || "I get in but cannot finish";
    const savedDefenseResponse =
      localStorage.getItem("defenseResponse") ||
      "I defend but lose position after";
    const savedPostAttackReaction =
      localStorage.getItem("postAttackReaction") || "I hesitate";

    setMatchBreakdown(savedMatchBreakdown);
    setAttackOutcome(savedAttackOutcome);
    setDefenseResponse(savedDefenseResponse);
    setPostAttackReaction(savedPostAttackReaction);
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
          match_breakdown: matchBreakdown,
          attack_outcome: attackOutcome,
          defense_response: defenseResponse,
          post_attack_reaction: postAttackReaction,
        })
        .eq("id", diagnosisId)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error updating diagnosis:", error);
        alert(`Could not save Step 2: ${error.message}`);
        return;
      }

      localStorage.setItem("matchBreakdown", matchBreakdown);
      localStorage.setItem("attackOutcome", attackOutcome);
      localStorage.setItem("defenseResponse", defenseResponse);
      localStorage.setItem("postAttackReaction", postAttackReaction);

      router.push("/diagnosis/step-3");
    } catch (err) {
      console.error("Step 2 crash:", err);
      alert("Something went wrong saving Step 2.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isCheckingAccess) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-black uppercase">Loading</h1>
          <p className="mt-4 text-zinc-400">Checking access.</p>
        </div>
      </main>
    );
  }

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
            Match Reality (2/7)
          </p>

          <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
            Match Reality
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            This section identifies where your matches are actually breaking
            down.
          </p>

          <div className="mt-10 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              Where do your matches break down most often?
            </label>

            <select
              value={matchBreakdown}
              onChange={(e) => setMatchBreakdown(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="Before contact (distance/timing)">
                Before contact (distance/timing)
              </option>
              <option value="During hand fighting">During hand fighting</option>
              <option value="During attack entry">During attack entry</option>
              <option value="During finishing phase">
                During finishing phase
              </option>
              <option value="In scramble situations">
                In scramble situations
              </option>
              <option value="In par terre positions">
                In par terre positions
              </option>
              <option value="In defensive situations">
                In defensive situations
              </option>
              <option value="After I get to a good position">
                After I get to a good position
              </option>
              <option value="Late in the match">Late in the match</option>
            </select>
          </div>

          <div className="mt-6 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              When you initiate an attack, what usually happens?
            </label>

            <select
              value={attackOutcome}
              onChange={(e) => setAttackOutcome(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="I rarely get to a clean attack">
                I rarely get to a clean attack
              </option>
              <option value="I get in but cannot finish">
                I get in but cannot finish
              </option>
              <option value="I finish sometimes but inconsistently">
                I finish sometimes but inconsistently
              </option>
              <option value="I score but lose position after">
                I score but lose position after
              </option>
              <option value="I score cleanly most of the time">
                I score cleanly most of the time
              </option>
            </select>
          </div>

          <div className="mt-6 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              When your opponent attacks, what usually happens?
            </label>

            <select
              value={defenseResponse}
              onChange={(e) => setDefenseResponse(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="I get scored on easily">
                I get scored on easily
              </option>
              <option value="I defend but lose position after">
                I defend but lose position after
              </option>
              <option value="I defend but end up scrambling">
                I defend but end up scrambling
              </option>
              <option value="I defend and reset">I defend and reset</option>
              <option value="I counter effectively">I counter effectively</option>
            </select>
          </div>

          <div className="mt-6 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              What happens after your first attack fails?
            </label>

            <select
              value={postAttackReaction}
              onChange={(e) => setPostAttackReaction(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="I stop attacking">I stop attacking</option>
              <option value="I hesitate">I hesitate</option>
              <option value="I force another attack">
                I force another attack
              </option>
              <option value="I scramble">I scramble</option>
              <option value="I reset and re-attack">
                I reset and re-attack
              </option>
            </select>
          </div>

          <div className="mt-10 flex w-full max-w-xl gap-4">
            <Link
              href="/diagnosis"
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