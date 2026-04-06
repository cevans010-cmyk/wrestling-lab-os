"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DiagnosisStep6Page() {
  const router = useRouter();

  const [archetype, setArchetype] = useState("Reactive scrambler");
  const [frustration, setFrustration] = useState(
    "I know what to do but can't execute"
  );
  const [customFrustration, setCustomFrustration] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedArchetype =
      localStorage.getItem("archetype") || "Reactive scrambler";
    const savedFrustration =
      localStorage.getItem("frustration") ||
      "I know what to do but can't execute";
    const savedCustomFrustration =
      localStorage.getItem("customFrustration") || "";

    setArchetype(savedArchetype);
    setFrustration(savedFrustration);
    setCustomFrustration(savedCustomFrustration);
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

      const finalFrustration =
        frustration === "Other" ? customFrustration : frustration;

      const { error } = await supabase
        .from("diagnoses")
        .update({
          archetype: archetype,
          frustration: finalFrustration,
          custom_frustration: customFrustration,
        })
        .eq("id", diagnosisId)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error updating Step 6:", error);
        alert(`Could not save Step 6: ${error.message}`);
        return;
      }

      localStorage.setItem("archetype", archetype);
      localStorage.setItem("frustration", frustration);
      localStorage.setItem("customFrustration", customFrustration);

      router.push("/diagnosis/results");
    } catch (err) {
      console.error("Step 6 crash:", err);
      alert("Something went wrong saving Step 6.");
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
            Identity & Pattern (6/7)
          </p>

          <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
            Identity & Pattern
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            This final section identifies your wrestling pattern and what is
            holding you back most.
          </p>

          <div className="mt-10 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              Which archetype best describes you?
            </label>

            <select
              value={archetype}
              onChange={(e) => setArchetype(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="Reactive scrambler">Reactive scrambler</option>
              <option value="Training room champion">
                Training room champion
              </option>
              <option value="Broken chain wrestler">
                Broken chain wrestler
              </option>
              <option value="Perfectionist">Perfectionist</option>
              <option value="Highlight hunter">Highlight hunter</option>
              <option value="All or nothing">All or nothing</option>
              <option value="Beginner learning foundation">
                Beginner learning foundation
              </option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mt-6 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              What frustrates you most about your wrestling?
            </label>

            <select
              value={frustration}
              onChange={(e) => setFrustration(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="I know what to do but can't execute">
                I know what to do but can't execute
              </option>
              <option value="I perform well in training but not competition">
                I perform well in training but not competition
              </option>
              <option value="I lose to worse opponents">
                I lose to worse opponents
              </option>
              <option value="I gas out too quickly">I gas out too quickly</option>
              <option value="I cannot finish attacks">
                I cannot finish attacks
              </option>
              <option value="I make bad decisions under pressure">
                I make bad decisions under pressure
              </option>
              <option value="Other">Other</option>
            </select>
          </div>

          {frustration === "Other" && (
            <div className="mt-6 w-full max-w-xl text-left">
              <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
                Please specify your frustration
              </label>

              <input
                type="text"
                value={customFrustration}
                onChange={(e) => setCustomFrustration(e.target.value)}
                placeholder="Type here"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none"
              />
            </div>
          )}

          <div className="mt-10 flex w-full max-w-xl gap-4">
            <Link
              href="/diagnosis/step-5"
              className="block w-1/2 rounded-full border border-teal-400 px-6 py-4 text-center text-lg font-black uppercase text-teal-400"
            >
              Back
            </Link>

            <button
              onClick={handleContinue}
              disabled={isSaving}
              className="block w-1/2 rounded-full bg-teal-400 px-6 py-4 text-center text-lg font-black uppercase text-black shadow-[0_0_25px_rgba(45,212,191,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Generate Diagnosis"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
