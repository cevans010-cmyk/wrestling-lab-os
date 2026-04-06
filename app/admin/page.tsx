"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const ADMIN_EMAIL = "cevans010@googlemail.com";

type DiagnosisRow = {
  id: string;
  user_id: string;
  user_email: string | null
  experience_level: string | null;
  style: string | null;
  training_days: string | null;
  competition_level: string | null;
  goal: string | null;
  match_breakdown: string | null;
  pressure_response: string | null;
  chain_break_point: string | null;
  reliance_type: string | null;
  fatigue_breakdown: string | null;
  archetype: string | null;
  frustration: string | null;
  primary_factor: string | null;
  secondary_factor: string | null;
  third_factor: string | null;
  ai_summary: string | null;
  first_fix: string | null;
  confidence: string | null;
  severity_score: number | null;
  priority_level: string | null;
  created_at: string | null;
};

export default function AdminPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [rows, setRows] = useState<DiagnosisRow[]>([]);
  const [selected, setSelected] = useState<DiagnosisRow | null>(null);

  useEffect(() => {
    const loadAdmin = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/auth");
          return;
        }

        if (user.email !== ADMIN_EMAIL) {
          router.push("/");
          return;
        }

        const { data, error } = await supabase
          .from("diagnoses")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setRows((data as DiagnosisRow[]) || []);
      } catch (err: any) {
        console.error(err);
        setError(err?.message || "Could not load admin page.");
      } finally {
        setIsLoading(false);
      }
    };

    loadAdmin();
  }, [router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-black uppercase">Loading Admin</h1>
          <p className="mt-4 text-zinc-400">Please wait.</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center max-w-xl">
          <h1 className="text-3xl font-black uppercase text-red-500">
            Admin Error
          </h1>
          <p className="mt-4 text-zinc-300">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-black uppercase text-white">
          Beta Admin Dashboard
        </h1>
        <p className="mt-3 text-zinc-400">
          Review athlete diagnoses before consults.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[420px_1fr]">
          <div className="rounded-3xl border border-teal-400/20 bg-black/40 p-4">
            <h2 className="text-lg font-black uppercase text-teal-400">
              Submissions
            </h2>

            <div className="mt-4 space-y-3">
              {rows.length === 0 && (
                <p className="text-zinc-400">No diagnoses yet.</p>
              )}

              {rows.map((row) => (
                <button
                  key={row.id}
                  onClick={() => setSelected(row)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    selected?.id === row.id
                      ? "border-teal-400 bg-teal-400/10"
                      : "border-zinc-800 bg-zinc-950/60 hover:border-teal-400/40"
                  }`}
                >
                  <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                    {row.created_at
                      ? new Date(row.created_at).toLocaleString()
                      : "No date"}
                  </p>

                  <p className="mt-2 text-sm text-zinc-300">
                     {row.user_email || row.user_id}
                  </p>                  
                  <p className="mt-2 text-lg font-black text-white">
                    {row.primary_factor || "No primary factor yet"}
                  </p>
                  <p className="mt-2 text-sm text-zinc-300">
                    Archetype: {row.archetype || "N/A"}
                  </p>
                  <p className="text-sm text-zinc-300">
                    Severity: {row.severity_score ?? "N/A"}/10
                  </p>
                  <p className="text-red-400 font-bold text-center mt-2">
                    This is the #1 thing holding them back right now.
                  </p>
                  <p className="text-sm text-zinc-300">
                    Priority: {row.priority_level || "N/A"}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-teal-400/20 bg-black/40 p-6">
            {!selected ? (
              <div className="flex h-full items-center justify-center text-center">
                <div>
                  <h2 className="text-2xl font-black uppercase text-white">
                    Select a submission
                  </h2>
                  <p className="mt-3 text-zinc-400">
                    Click a diagnosis on the left to view the full breakdown.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                    Submission details
                  </p>
                  <h2 className="mt-2 text-3xl font-black uppercase text-white">
                    {selected.primary_factor || "Diagnosis"}
                  </h2>
                  <p className="mt-2 text-zinc-300">
                     User: {selected.user_email || selected.user_id}
                 </p>
                  <p className="mt-2 text-zinc-300">
                    Created:{" "}
                    {selected.created_at
                      ? new Date(selected.created_at).toLocaleString()
                      : "N/A"}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-teal-400/20 bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                      Severity
                    </p>
                    <p className="mt-2 text-3xl font-black text-white">
                      {selected.severity_score ?? "N/A"}
                      <span className="text-lg text-zinc-500">/10</span>
                    </p>
                  </div>

                  <div className="rounded-2xl border border-teal-400/20 bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                      Priority
                    </p>
                    <p className="mt-2 text-3xl font-black text-white">
                      {selected.priority_level || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-teal-400/20 bg-black/30 p-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                    Summary
                  </p>
                  <p className="mt-3 text-zinc-200">
                    {selected.ai_summary || "No summary saved."}
                  </p>
                </div>

                <div className="mt-6 rounded-2xl border border-teal-400 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-teal-400">
                     Consult Snapshot
                    </p>

                    <button
                         onClick={() => {
                             const text = `
                    Primary: ${selected.primary_factor}
                    Summary: ${selected.ai_summary}
                    Fix: ${selected.first_fix}
                    `;
                             navigator.clipboard.writeText(text);
                         }}
                         className="mt-4 w-full rounded-full border border-teal-400 px-4 py-2 text-sm uppercase text-teal-400"
                    >
                         Copy Summary
                    </button>

                    <p className="mt-2 text-white font-bold">
                     Core issue:
                    </p>
                    <p className="text-zinc-300">
                     {selected.primary_factor}
                    </p>

                    <p className="mt-3 text-white font-bold">
                     What this is causing:
                    </p>
                    <p className="text-zinc-300">
                     {selected.ai_summary}
                    </p>

                    <p className="mt-3 text-white font-bold">
                     First coaching action:
                    </p>
                    <p className="text-zinc-300">
                     {selected.first_fix}
                    </p>
                </div>


                <div className="rounded-2xl border border-teal-400/20 bg-black/30 p-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                    First fix
                  </p>
                  <p className="mt-3 text-zinc-200">
                    {selected.first_fix || "No first fix saved."}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-teal-400/20 bg-black/30 p-4">
                    <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                      Athlete profile
                    </p>
                    <div className="mt-3 space-y-2 text-zinc-200">
                      <p>Experience: {selected.experience_level || "N/A"}</p>
                      <p>Style: {selected.style || "N/A"}</p>
                      <p>Training days: {selected.training_days || "N/A"}</p>
                      <p>
                        Competition level: {selected.competition_level || "N/A"}
                      </p>
                      <p>Goal: {selected.goal || "N/A"}</p>
                      <p>Archetype: {selected.archetype || "N/A"}</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-teal-400/20 bg-black/30 p-4">
                    <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                      Key signals
                    </p>
                    <div className="mt-3 space-y-2 text-zinc-200">
                      <p>Match breakdown: {selected.match_breakdown || "N/A"}</p>
                      <p>
                        Pressure response: {selected.pressure_response || "N/A"}
                      </p>
                      <p>
                        Chain break point: {selected.chain_break_point || "N/A"}
                      </p>
                      <p>Reliance type: {selected.reliance_type || "N/A"}</p>
                      <p>
                        Fatigue breakdown: {selected.fatigue_breakdown || "N/A"}
                      </p>
                      <p>Frustration: {selected.frustration || "N/A"}</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-teal-400/20 bg-black/30 p-4">
                    <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                      Primary
                    </p>
                    <p className="mt-3 text-zinc-100">
                      {selected.primary_factor || "N/A"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-teal-400/20 bg-black/30 p-4">
                    <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                      Secondary
                    </p>
                    <p className="mt-3 text-zinc-100">
                      {selected.secondary_factor || "N/A"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-teal-400/20 bg-black/30 p-4">
                    <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                      Third
                    </p>
                    <p className="mt-3 text-zinc-100">
                      {selected.third_factor || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-teal-400/20 bg-black/30 p-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                    Confidence
                  </p>
                  <p className="mt-3 text-zinc-100">
                    {selected.confidence || "N/A"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}