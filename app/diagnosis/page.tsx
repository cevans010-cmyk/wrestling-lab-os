"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type DiagnosisAccessRow = {
  id: string;
  completed: boolean | null;
};

export default function DiagnosisPage() {
  const router = useRouter();

  const [experienceLevel, setExperienceLevel] = useState("Beginner");
  const [style, setStyle] = useState("Freestyle wrestling");
  const [trainingDays, setTrainingDays] = useState("3-4");
  const [competitionLevel, setCompetitionLevel] = useState("Local");
  const [goal, setGoal] = useState("Improve fundamentals");
  const [customGoal, setCustomGoal] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const [error, setError] = useState("");
  const [isStarting, setIsStarting] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/auth");
          return;
        }

        const { data, error } = await supabase
          .from("diagnoses")
          .select("id, completed")
          .eq("user_id", user.id);

        if (error) {
          throw error;
        }

        const rows = (data as DiagnosisAccessRow[]) || [];
        const hasCompletedDiagnosis = rows.some((row) => row.completed === true);

        if (hasCompletedDiagnosis) {
          setIsBlocked(true);
        }

        const savedExperience = localStorage.getItem("experienceLevel");
        const savedStyle = localStorage.getItem("style");
        const savedTrainingDays = localStorage.getItem("trainingDays");
        const savedCompetitionLevel =
          localStorage.getItem("competitionLevel");
        const savedGoal = localStorage.getItem("goal");
        const savedCustomGoal = localStorage.getItem("customGoal");

        if (savedExperience) setExperienceLevel(savedExperience);
        if (savedStyle) setStyle(savedStyle);
        if (savedTrainingDays) setTrainingDays(savedTrainingDays);
        if (savedCompetitionLevel) setCompetitionLevel(savedCompetitionLevel);
        if (savedGoal) setGoal(savedGoal);
        if (savedCustomGoal) setCustomGoal(savedCustomGoal);
      } catch (err: any) {
        console.error(err);
        setError(err?.message || "Could not check diagnosis access.");
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, [router]);

  const handleContinue = async () => {
    try {
      setIsStarting(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth");
        return;
      }

      const finalGoal = goal === "Other" ? customGoal : goal;

      localStorage.setItem("experienceLevel", experienceLevel);
      localStorage.setItem("style", style);
      localStorage.setItem("trainingDays", trainingDays);
      localStorage.setItem("competitionLevel", competitionLevel);
      localStorage.setItem("goal", goal);
      localStorage.setItem("customGoal", customGoal);
      localStorage.setItem("finalGoal", finalGoal);

      const { data, error } = await supabase
        .from("diagnoses")
        .select("id, completed")
        .eq("user_id", user.id);

      if (error) {
        throw error;
      }

      const rows = (data as DiagnosisAccessRow[]) || [];

      const completedDiagnosis = rows.find((row) => row.completed === true);
      if (completedDiagnosis) {
        router.push("/diagnosis/locked");
        return;
      }

      const inProgressDiagnosis = rows.find((row) => row.completed !== true);

      if (inProgressDiagnosis) {
        localStorage.setItem("currentDiagnosisId", inProgressDiagnosis.id);
      } else {
        const { data: insertedDiagnosis, error: insertError } = await supabase
          .from("diagnoses")
          .insert({
            user_id: user.id,
            user_email: user.email,
            experience_level: experienceLevel,
            style,
            training_days: trainingDays,
            competition_level: competitionLevel,
            goal: finalGoal,
            completed: false,
          })
          .select("id")
          .single();

        if (insertError) {
          throw insertError;
        }

        localStorage.setItem("currentDiagnosisId", insertedDiagnosis.id);
      }

      router.push("/diagnosis/step-2");
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Could not start diagnosis.");
    } finally {
      setIsStarting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center max-w-xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-teal-400">
            Wrestling Lab Diagnostic System
          </p>
          <h1 className="mt-6 text-3xl font-black uppercase">Loading</h1>
          <p className="mt-4 text-zinc-400">Checking your access.</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center max-w-xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-teal-400">
            Wrestling Lab Diagnostic System
          </p>
          <h1 className="mt-6 text-3xl font-black uppercase text-red-500">
            Something went wrong
          </h1>
          <p className="mt-4 text-zinc-300">{error}</p>
        </div>
      </main>
    );
  }

  if (isBlocked) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <button
            onClick={handleLogout}
            className="absolute top-4 right-4 text-sm font-bold uppercase text-zinc-400 hover:text-white"
          >
            Logout
          </button>

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-teal-400">
            Wrestling Lab Diagnostic System
          </p>

          <h1 className="mt-6 text-4xl font-black uppercase text-white">
            Your free diagnosis has already been used
          </h1>

          <p className="mt-4 text-zinc-300">
            You have already completed your free performance breakdown. Book
            your consult to go deeper into your results and get a clear plan
            moving forward.
          </p>

          <div className="mt-8 space-y-4">
            <button
              onClick={() =>
                window.open("https://calendly.com/cevans010/30min", "_blank")
              }
              className="w-full rounded-full bg-teal-400 px-6 py-4 text-lg font-black uppercase text-black shadow-[0_0_25px_rgba(45,212,191,0.5)]"
            >
              Book Your Free Consult
            </button>

            <button
              onClick={() => router.push("/")}
              className="w-full rounded-full border border-teal-400 px-6 py-4 text-lg font-black uppercase text-teal-400"
            >
              Back To Home
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen text-white">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 z-20 text-sm font-bold uppercase text-zinc-400 hover:text-white"
      >
        Logout
      </button>

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
            Athlete Profile (1/7)
          </p>

          <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
            Start Your Free Diagnosis
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            This section helps tailor your diagnosis to your level and training
            context.
          </p>

          <div className="mt-10 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              What is your experience level?
            </label>

            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="mt-6 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              What style do you compete in?
            </label>

            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="Freestyle wrestling">Freestyle wrestling</option>
              <option value="MMA / BJJ crossover">MMA / BJJ crossover</option>
            </select>
          </div>

          <div className="mt-6 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              How many days per week do you train?
            </label>

            <select
              value={trainingDays}
              onChange={(e) => setTrainingDays(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="1-2">1–2</option>
              <option value="3-4">3–4</option>
              <option value="5+">5+</option>
            </select>
          </div>

          <div className="mt-6 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              What is your current competition level?
            </label>

            <select
              value={competitionLevel}
              onChange={(e) => setCompetitionLevel(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="I do not compete">I do not compete</option>
              <option value="Local">Local</option>
              <option value="State">State</option>
              <option value="National">National</option>
              <option value="International">International</option>
            </select>
          </div>

          <div className="mt-6 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              What is your primary goal right now?
            </label>

            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="Improve fundamentals">Improve fundamentals</option>
              <option value="Start winning matches">Start winning matches</option>
              <option value="Perform consistently">Perform consistently</option>
              <option value="Reach next competition level">
                Reach next competition level
              </option>
              <option value="Prepare for a specific event">
                Prepare for a specific event
              </option>
              <option value="Other">Other</option>
            </select>
          </div>

          {goal === "Other" && (
            <div className="mt-6 w-full max-w-xl text-left">
              <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
                Please specify your goal
              </label>

              <input
                type="text"
                value={customGoal}
                onChange={(e) => setCustomGoal(e.target.value)}
                placeholder="Type your goal here"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none"
              />
            </div>
          )}

          <button
            onClick={handleContinue}
            disabled={isStarting}
            className="mt-10 block w-full max-w-xl rounded-full bg-teal-400 px-6 py-4 text-center text-lg font-black uppercase text-black shadow-[0_0_25px_rgba(45,212,191,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isStarting ? "Starting..." : "Continue"}
          </button>
        </div>
      </div>
    </main>
  );
}