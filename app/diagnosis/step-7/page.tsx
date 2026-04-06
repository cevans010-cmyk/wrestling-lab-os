"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DiagnosisPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const [error, setError] = useState("");

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
          .select("id")
          .eq("user_id", user.id)
          .limit(1);

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          setIsBlocked(true);
        }
      } catch (err: any) {
        console.error(err);
        setError(err?.message || "Could not check diagnosis access.");
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, [router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-black uppercase">Loading</h1>
          <p className="mt-4 text-zinc-400">Checking your access.</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center max-w-xl">
          <h1 className="text-3xl font-black uppercase text-red-500">
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
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-teal-400">
            Wrestling Lab Diagnostic System
          </p>

          <h1 className="mt-6 text-4xl font-black uppercase text-white">
            Your free diagnosis has already been used
          </h1>

          <p className="mt-4 text-zinc-300">
            You have already completed your free performance breakdown.
            Book your consult to go deeper into your results and get a clear
            plan moving forward.
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
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-teal-400">
          Wrestling Lab Diagnostic System
        </p>

        <h1 className="mt-6 text-4xl font-black uppercase">
          Start Your Free Diagnosis
        </h1>

        <p className="mt-4 text-zinc-300">
          Answer a few questions and get your personalised performance breakdown.
        </p>

        <button
          onClick={() => router.push("/diagnosis/step-2")}
          className="mt-10 w-full rounded-full bg-teal-400 px-6 py-4 text-lg font-black uppercase text-black shadow-[0_0_25px_rgba(45,212,191,0.5)]"
        >
          Start Diagnosis
        </button>
      </div>
    </main>
  );
}